import React from "react";
import { Skeleton } from "@mui/material";

function SkeletonArticle() {
  return (
    <section className="pt-0 relative w-full bg-white dark:bg-black">
      {/* Breadcrumb Navigation Skeleton */}
      <div className="max-w-4xl mx-auto px-8 pt-6 pb-2">
        <div className="flex items-center gap-2 text-sm">
          <Skeleton variant="text" width={60} height={20} />
          <Skeleton variant="text" width={12} height={12} />
          <Skeleton variant="text" width={80} height={20} />
          <Skeleton variant="text" width={12} height={12} />
          <Skeleton variant="text" width={200} height={20} />
        </div>
      </div>

      {/* Magazine-style Header Skeleton */}
      <div className="max-w-4xl mx-auto px-8 pt-12 pb-8">
        {/* Issue/Date Line */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-4">
            <div className="h-px w-8 bg-gray-200 dark:bg-gray-700" />
            <Skeleton variant="text" width={120} height={16} />
            <div className="h-px w-8 bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>

        {/* Article Type */}
        <div className="text-center mb-6">
          <Skeleton variant="text" width={100} height={20} className="mx-auto" />
        </div>

        {/* Main Title */}
        <div className="text-center mb-8">
          <Skeleton variant="text" width="90%" height={60} className="mx-auto mb-4" />
          <Skeleton variant="text" width="70%" height={60} className="mx-auto" />
        </div>

        {/* Author & Date */}
        <div className="text-center space-y-4 mb-12">
          <div className="flex items-center justify-center gap-6">
            <div className="h-px w-12 bg-gray-200 dark:bg-gray-700" />
            <div className="space-y-2">
              <Skeleton variant="text" width={80} height={16} />
              <Skeleton variant="text" width={100} height={28} />
            </div>
            <div className="h-px w-12 bg-gray-200 dark:bg-gray-700" />
          </div>
          <Skeleton variant="text" width={120} height={20} className="mx-auto" />
        </div>
      </div>

      {/* Hero Image Skeleton */}
      <div className="max-w-5xl mx-auto px-8 mb-16">
        <Skeleton 
          variant="rectangular" 
          width="100%" 
          height="50vh"
          className="rounded-lg shadow-2xl"
          sx={{ 
            minHeight: { xs: '300px', md: '400px' },
            borderRadius: '8px'
          }}
        />
      </div>

      {/* Article Content Skeleton */}
      <div className="max-w-4xl mx-auto px-8 pb-20">
        <div className="space-y-6">
          {/* Paragraph skeletons */}
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton variant="text" width="100%" height={24} />
              <Skeleton variant="text" width="95%" height={24} />
              <Skeleton variant="text" width="88%" height={24} />
              {i === 2 && <Skeleton variant="text" width="60%" height={32} className="mt-8 mb-4" />}
              {i === 5 && (
                <div className="my-8">
                  <Skeleton variant="rectangular" width="100%" height={200} className="rounded-lg" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Article Footer Skeleton */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
            <div className="flex items-center gap-4">
              <Skeleton variant="circular" width={8} height={8} />
              <Skeleton variant="text" width={80} height={20} />
              <div className="w-px h-4 bg-gray-200 dark:bg-gray-700"></div>
              <Skeleton variant="text" width={100} height={20} />
            </div>
            <Skeleton variant="text" width={140} height={20} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default SkeletonArticle;
