"use client";

import Image from "next/image";
import React from "react";

const ShareLinks = ({ movie }) => {
  const shareLinks = {
    facebook: (url) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: (url) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
    linkedin: (url) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`,
  };

  const handleShare = (platform) => {
    const url = `https://movie-db-ams.vercel.app/movie/${movie.id}`;
    const link = shareLinks[platform](url);
    window.open(link, "_blank");
  };
  return (
    <div className="mb-6">
      <h3 className="text-gray-400 mb-2">Share on social media</h3>
      <div className="flex flex-wrap gap-4 bg">
        <button
          className="text-center cursor-pointer"
          onClick={() => handleShare("facebook")}
        >
          <Image
            width={100}
            height={100}
            src="http://facebook.com/favicon.ico"
            alt="Facebook"
            className="w-8 h-8 rounded-full object-cover mb-2 mx-auto"
          />
          <p className="text-sm">Facebook</p>
        </button>

        <button
          className="text-center cursor-pointer"
          onClick={() => handleShare("twitter")}
        >
          <Image
            width={100}
            height={100}
            src="http://x.com/favicon.ico"
            alt="X"
            className="w-8 h-8 rounded-full object-cover mb-2 mx-auto"
          />
          <p className="text-sm">X</p>
        </button>

        <button
          className="text-center cursor-pointer"
          onClick={() => handleShare("linkedin")}
        >
          <Image
            width={100}
            height={100}
            src="http://linkedin.com/favicon.ico"
            alt="LinkedIn"
            className="w-8 h-8 rounded-full object-cover mb-2 mx-auto"
          />
          <p className="text-sm">LinkedIn</p>
        </button>
      </div>
    </div>
  );
};

export default ShareLinks;
