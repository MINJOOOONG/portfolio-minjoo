"use client";

import { useState, useCallback } from "react";
import Image, { type ImageProps } from "next/image";

export function SafeImage(props: ImageProps & { fallbackText?: string }) {
  const { fallbackText, alt, ...rest } = props;
  const [failed, setFailed] = useState(false);
  const onError = useCallback(() => setFailed(true), []);

  if (failed) {
    return (
      <div className="pj-image-fallback" aria-label={alt || "이미지를 불러올 수 없습니다"}>
        <span className="pj-image-fallback__icon">🖼</span>
        <span className="pj-image-fallback__text">{fallbackText || "이미지를 불러올 수 없습니다"}</span>
      </div>
    );
  }

  return <Image {...rest} alt={alt || ""} onError={onError} />;
}
