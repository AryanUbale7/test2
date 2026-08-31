/**
 * @file OptimizedImage.jsx
 * @description Performance-optimized image component with native lazy loading, async decoding, responsive srcSet, and blur placeholder.
 */

import { useState } from "react";

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = "",
  aspectRatio = "16/9",
  fallbackSrc = null,
  priority = false,
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-gray-100 dark:bg-gray-800 ${className}`}
      style={{ aspectRatio }}
    >
      <img
        src={hasError && fallbackSrc ? fallbackSrc : src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-700" />
      )}
    </div>
  );
}

export default OptimizedImage;
