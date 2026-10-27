"""Protect direct AI routes. Deploy one worker or use the shared Next.js limit.

When RAG_API_TOKEN is configured, only the Next.js proxy can call these routes.
A bounded per-peer limiter also protects an unconfigured development instance.
"""
from __future__ import annotations

import hmac
import os
import time
from dataclasses import dataclass

from fastapi import Request
from fastapi.responses import JSONResponse


@dataclass
class Bucket:
    count: int
    reset_at: float


class PeerLimiter:
    def __init__(self, limit: int = 60, window: float = 60, capacity: int = 10_000):
        self.limit, self.window, self.capacity = limit, window, capacity
        self.buckets: dict[str, Bucket] = {}

    def consume(self, peer: str, now: float | None = None) -> int:
        now = time.monotonic() if now is None else now
        self.buckets = {key: bucket for key, bucket in self.buckets.items() if bucket.reset_at > now}
        bucket = self.buckets.get(peer)
        if bucket is None:
            if len(self.buckets) >= self.capacity:
                return max(1, int(self.window))
            bucket = self.buckets[peer] = Bucket(0, now + self.window)
        bucket.count += 1
        return max(1, int(bucket.reset_at - now + 0.999)) if bucket.count > self.limit else 0


peer_limiter = PeerLimiter()


async def protect_ai_routes(request: Request, call_next):
    if request.method != "POST" or request.url.path not in {"/ask", "/agent/chat"}:
        return await call_next(request)
    expected = os.getenv("RAG_API_TOKEN", "")
    if expected and not hmac.compare_digest(
        request.headers.get("authorization", "").encode(), f"Bearer {expected}".encode(),
    ):
        return JSONResponse({"error": "Unauthorized"}, status_code=401)
    # Do not trust client-supplied forwarded IP headers on a publicly reachable API.
    peer = request.client.host if request.client else "unknown"
    retry_after = peer_limiter.consume(peer)
    if retry_after:
        return JSONResponse({"error": "Too many requests"}, status_code=429, headers={"Retry-After": str(retry_after)})
    return await call_next(request)
