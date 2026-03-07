import React from "react";

const Skeleton = ({ className = "", style = {} }) => (
  <div
    className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`}
    style={style}
  />
);

function SkeletonArticle() {
  return (
    <section className="pt-0 relative w-full bg-white dark:bg-black">
      {/* Breadcrumb Navigation Skeleton */}
      <div className="max-w-4xl mx-auto px-8 pt-6 pb-2">
        <div className="flex items-center gap-2 text-sm">
          <Skeleton style={{ width: 60, height: 20 }} />
          <Skeleton style={{ width: 12, height: 12 }} />
          <Skeleton style={{ width: 80, height: 20 }} />
          <Skeleton style={{ width: 12, height: 12 }} />
          <Skeleton style={{ width: 200, height: 20 }} />
        </div>
      </div>

      {/* Magazine-style Header Skeleton */}
      <div className="max-w-4xl mx-auto px-8 pt-12 pb-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-4">
            <div className="h-px w-8 bg-gray-200 dark:bg-gray-700" />
            <Skeleton style={{ width: 120, height: 16 }} />
            <div className="h-px w-8 bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>

        <div className="text-center mb-6">
          <Skeleton className="mx-auto" style={{ width: 100, height: 20 }} />
        </div>

        <div className="text-center mb-8">
          <Skeleton className="mx-auto mb-4" style={{ width: "90%", height: 60 }} />
          <Skeleton className="mx-auto" style={{ width: "70%", height: 60 }} />
        </div>

        <div className="text-center space-y-4 mb-12">
          <div className="flex items-center justify-center gap-6">
            <div className="h-px w-12 bg-gray-200 dark:bg-gray-700" />
            <div className="space-y-2">
              <Skeleton style={{ width: 80, height: 16 }} />
              <Skeleton style={{ width: 100, height: 28 }} />
            </div>
            <div className="h-px w-12 bg-gray-200 dark:bg-gray-700" />
          </div>
          <Skeleton className="mx-auto" style={{ width: 120, height: 20 }} />
        </div>
      </div>

      {/* Hero Image Skeleton */}
      <div className="max-w-5xl mx-auto px-8 mb-16">
        <Skeleton
          className="rounded-lg shadow-2xl"
          style={{ width: "100%", height: "50vh", minHeight: 300 }}
        />
      </div>

      {/* Article Content Skeleton */}
      <div className="max-w-4xl mx-auto px-8 pb-20">
        <div className="space-y-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton style={{ width: "100%", height: 24 }} />
              <Skeleton style={{ width: "95%", height: 24 }} />
              <Skeleton style={{ width: "88%", height: 24 }} />
              {i === 2 && <Skeleton className="mt-8 mb-4" style={{ width: "60%", height: 32 }} />}
              {i === 5 && (
                <div className="my-8">
                  <Skeleton className="rounded-lg" style={{ width: "100%", height: 200 }} />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
            <div className="flex items-center gap-4">
              <Skeleton className="rounded-full" style={{ width: 8, height: 8 }} />
              <Skeleton style={{ width: 80, height: 20 }} />
              <div className="w-px h-4 bg-gray-200 dark:bg-gray-700"></div>
              <Skeleton style={{ width: 100, height: 20 }} />
            </div>
            <Skeleton style={{ width: 140, height: 20 }} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default SkeletonArticle;
