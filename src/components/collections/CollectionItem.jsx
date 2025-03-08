"use client";

import { useState } from "react";
import Image from "next/image";
import { getCategoryIcon } from "@/data/collectionsData";

export default function CollectionItem({ item, category }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  const categoryIcon = getCategoryIcon(category);

  return (
    <>
      <div 
        className="flex flex-col bg-white rounded-lg shadow-md hover:shadow-lg cursor-pointer transition-transform duration-200 hover:translate-y-[-3px] w-32 h-52 m-2 overflow-hidden"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="relative w-full h-36">
          {item.coverImage && !imageError ? (
            <Image
              src={item.coverImage}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100px, 140px"
              className="object-cover"
              onError={() => setImageError(true)}
              unoptimized
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-100 text-gray-500 text-4xl">
              {categoryIcon}
            </div>
          )}
        </div>
        <div className="p-2">
          <h3 className="text-sm font-semibold mb-1 truncate leading-tight">{item.title}</h3>
          <p className="text-xs text-gray-600 truncate">{item.creator}</p>
        </div>
      </div>

      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className={`bg-white rounded-lg w-full max-w-xl max-h-[80vh] overflow-auto relative ${
              category === "books" ? "max-w-2xl" : ""
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-2 right-3 text-3xl text-gray-700 hover:text-gray-900 border-none bg-transparent cursor-pointer"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>
            
            <div className="grid md:grid-cols-[auto_1fr] gap-5 p-5">
              <div className="flex justify-center">
                {item.coverImage && !imageError ? (
                  <Image
                    src={item.coverImage}
                    alt={item.title}
                    width={180}
                    height={270}
                    className="object-cover rounded shadow-md"
                    onError={() => setImageError(true)}
                    unoptimized
                  />
                ) : (
                  <div className="flex items-center justify-center w-[180px] h-[270px] bg-gray-100 text-gray-500 text-5xl rounded">
                    {categoryIcon}
                  </div>
                )}
              </div>
              
              <div>
                <h2 className="text-xl font-bold mb-3">{item.title}</h2>
                <div className="grid sm:grid-cols-2 gap-1 mb-4">
                  <p className="text-sm"><span className="font-semibold">Creator:</span> {item.creator}</p>
                  <p className="text-sm"><span className="font-semibold">Year:</span> {item.year}</p>
                  
                  {category === "books" && item.pages && (
                    <p className="text-sm"><span className="font-semibold">Pages:</span> {item.pages}</p>
                  )}
                  
                  {category === "books" && item.genre && (
                    <p className="text-sm"><span className="font-semibold">Genre:</span> {item.genre}</p>
                  )}
                  
                  {item.rating && (
                    <p className="text-sm"><span className="font-semibold">Rating:</span> {item.rating}/5</p>
                  )}
                </div>
                
                {item.description && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-sm text-gray-700 italic">{item.description}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
