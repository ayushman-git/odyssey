"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Input } from "./ui/input";
import { Search, SortAsc, SortDesc } from "lucide-react";
import { Button } from "./ui/button";
import ArticleGrid from "./ArticleGrid";

export default function ArticleSearchAndFilter({ initialArticles = [], articleTypes = [] }) {
  const [filter, setFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");

  // Optimized filtering with early returns and simplified logic
  const filteredArticles = useMemo(() => {
    let filtered = initialArticles;
    
    // Early return if no filters applied
    if (filter === "All" && !searchTerm && sortOrder === "newest") {
      return filtered; // Articles are already sorted newest first from server
    }
    
    // Apply type filter
    if (filter !== "All") {
      filtered = filtered.filter(article => article.type === filter);
    }
    
    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(searchLower) ||
        article.type.toLowerCase().includes(searchLower) ||
        (article.introduction && article.introduction.toLowerCase().includes(searchLower))
      );
    }
    
    // Apply sorting only if needed (articles are pre-sorted newest first)
    if (sortOrder === "oldest") {
      filtered = [...filtered].reverse();
    }
    
    return filtered;
  }, [initialArticles, filter, sortOrder, searchTerm]);

  return (
    <div className="py-10">
      {/* Controls section */}
      <div className="mb-6 space-y-5">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:w-72">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-3 items-center">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setSortOrder(sortOrder === "newest" ? "oldest" : "newest")}
              className="h-9 gap-2"
            >
              {sortOrder === "newest" ? <SortDesc className="h-4 w-4" /> : <SortAsc className="h-4 w-4" />}
              {sortOrder === "newest" ? "Newest First" : "Oldest First"}
            </Button>
          </div>
        </div>
        
        {/* Article Type Filter */}
        {articleTypes.length > 1 && (
          <div className="flex flex-wrap gap-2">
            {articleTypes.map(type => (
              <Button
                key={type}
                variant={filter === type ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(type)}
                className="h-9"
              >
                {type}
              </Button>
            ))}
          </div>
        )}
      </div>
      
      {/* Results count - simplified */}
      <div className="mb-8 text-sm text-gray-600 dark:text-gray-400 flex flex-wrap">
        <span>
          Showing <strong>{filteredArticles.length}</strong> article{filteredArticles.length !== 1 ? 's' : ''}
        </span>
        
        {filter !== "All" && (
          <span>&nbsp;in <strong>{filter}</strong></span>
        )}
        
        {searchTerm && (
          <span>&nbsp;matching <strong>{searchTerm}</strong></span>
        )}
      </div>
      
      {/* Articles grid layout */}
      {filteredArticles.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <h3 className="text-3xl font-medium text-center">No articles found</h3>
          <p className="mt-3 text-gray-600 dark:text-gray-400 text-center max-w-md">
            We couldn't find any articles matching your current filters. Try adjusting your search term or category selection.
          </p>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => {
              setSearchTerm("");
              setFilter("All");
            }}
            className="mt-6"
          >
            Reset filters
          </Button>
        </div>
      ) : (
        <ArticleGrid articles={filteredArticles} />
      )}
    </div>
  );
}
