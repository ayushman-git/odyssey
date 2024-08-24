import Image from "next/image";
import React from "react";

function Grid({ img, vid, gridArea }) {
  return (
    <div
      className="w-full relative h-full rounded-3xl overflow-hidden"
      style={{
        gridArea: gridArea,
      }}
    >
      {img && (
        <Image src={img} layout="fill" objectFit="cover" alt="Cover Image" />
      )}
      {vid && (
        <video
          autoPlay
          loop
          preload="none"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        >
          <source
            src={
              "https://videos.pexels.com/video-files/20728739/20728739-hd_1080_1920_25fps.mp4"
            }
            type="video/mp4"
          />
        </video>
      )}
    </div>
  );
}

export default Grid;
