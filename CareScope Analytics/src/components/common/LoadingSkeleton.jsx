/**
 * @file LoadingSkeleton.jsx
 * @description Accessible pulsing placeholder skeletons for Suspense fallbacks.
 */

export function LoadingSkeleton({ variant = "card", count = 1, className = "" }) {
  const items = Array.from({ length: count }, (_, i) => i);

  if (variant === "page") {
    return (
      <div className="p-6 space-y-6 animate-pulse max-w-[1400px]" role="status" aria-label="Loading page content">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/4 mb-4" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="h-28 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
          <div className="h-28 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
          <div className="h-28 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
          <div className="h-28 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
        </div>
        <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
        <span className="sr-only">Loading content...</span>
      </div>
    );
  }

  return (
    <div className={`space-y-3 ${className}`} role="status" aria-label="Loading data">
      {items.map((i) => (
        <div
          key={i}
          className="h-16 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"
        />
      ))}
      <span className="sr-only">Loading data...</span>
    </div>
  );
}

export default LoadingSkeleton;
