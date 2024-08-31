import React from "react";
import { Skeleton } from "@mui/material";

function SkeletionArticle() {
  return (
    <div className="w-full grid place-items-center">
      <Skeleton variant="rectangular" width="100%" height="76vh" />
      <div className="flex gap-4 flex-col mt-8 max-w-screen-md">
        <Skeleton variant="rounded" width={800} height={40} />
        <div className="flex gap-2">
          <Skeleton variant="rounded" width={60} height={24} />
          <Skeleton variant="rounded" width={60} height={24} />
          <Skeleton variant="rounded" width={60} height={24} />
        </div>
      </div>
    </div>
  );
}

export default SkeletionArticle;
