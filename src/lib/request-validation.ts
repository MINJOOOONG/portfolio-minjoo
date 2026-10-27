export class RequestError extends Error {
  constructor(message: string, public status = 400) { super(message); }
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export async function readJson(request: Request, maxBytes = 200_000): Promise<unknown> {
  const reader = request.body?.getReader();
  if (!reader) throw new RequestError("요청 내용을 입력해주세요.");
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBytes) {
        await reader.cancel();
        throw new RequestError("요청 내용이 너무 큽니다.", 413);
      }
      chunks.push(value);
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
    return JSON.parse(new TextDecoder().decode(bytes));
  } catch (error) {
    if (error instanceof RequestError) throw error;
    throw new RequestError("올바른 JSON 요청이 필요합니다.");
  } finally { reader.releaseLock(); }
}
