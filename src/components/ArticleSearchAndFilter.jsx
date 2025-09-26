"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Input } from "./ui/input";
import { Search, SortAsc, SortDesc } from "lucide-react";
import { Button } from "./ui/button";
import ArticleGrid from "./ArticleGrid";

export default function ArticleSearchAndFilter({ initialArticles = [], articleTypes = [] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  // Initialize filter from URL parameter, fallback to "All"
  const [filter, setFilter] = useState(() => {
    const urlFilter = searchParams.get('filter');
    // Only use URL filter if it's a valid article type
    return urlFilter && articleTypes.includes(urlFilter) ? urlFilter : "All";
  });
  const [sortOrder, setSortOrder] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");

  // Update filter when URL changes
  useEffect(() => {
    const urlFilter = searchParams.get('filter');
    if (urlFilter && articleTypes.includes(urlFilter)) {
      setFilter(urlFilter);
    } else if (!urlFilter) {
      setFilter("All");
    }
  }, [searchParams, articleTypes]);

  // Update URL when filter changes (but not for "All")
  const updateFilterInUrl = (newFilter) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (newFilter === "All") {
      params.delete('filter');
    } else {
      params.set('filter', newFilter);
    }
    
    const query = params.toString();
    const url = query ? `${pathname}?${query}` : pathname;
    
    // Use replace to avoid cluttering browser history
    router.replace(url, { scroll: false });
  };

  // Custom setFilter that also updates URL
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    updateFilterInUrl(newFilter);
  };

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      className="max-w-6xl mx-auto px-0 md:px-8 py-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Search and Filter Controls */}
      <motion.div
        className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 md:gap-6 mb-8"
        variants={itemVariants}
      >
        {/* Search Section */}
        <div className="w-full md:w-96">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400 dark:text-gray-500 group-focus-within:text-black dark:group-focus-within:text-white transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search archives..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-12 pr-4 text-sm bg-transparent border border-gray-200 dark:border-gray-700 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-black dark:focus:border-white transition-colors duration-300"
            />
            <motion.div
              className="absolute bottom-0 left-0 h-px bg-black dark:bg-white origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: searchTerm ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          {/* Category Filters */}
          {articleTypes.length > 1 && (
            <div className="flex sm:inline-flex items-stretch border border-gray-200 dark:border-gray-700">
              {articleTypes.map((type, index) => (
                <motion.button
                  key={type}
                  onClick={() => handleFilterChange(type)}
                  className={`flex-1 sm:flex-initial px-3 py-2 text-xs font-medium tracking-[0.1em] uppercase transition-all duration-300 relative whitespace-nowrap ${
                    filter === type
                      ? 'bg-black dark:bg-white text-white dark:text-black'
                      : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
                  } ${index > 0 ? 'border-l border-gray-200 dark:border-gray-700' : ''}`}
                  whileHover={{ y: -1 }}
                  whileTap={{ y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {type}
                </motion.button>
              ))}
            </div>
          )}

          {/* Sort Control */}
          <motion.button
            onClick={() => setSortOrder(sortOrder === "newest" ? "oldest" : "newest")}
            className="inline-flex items-center justify-center gap-2 px-3 py-2 border border-gray-200 dark:border-gray-700 text-xs font-medium tracking-[0.1em] uppercase text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white transition-all duration-300 w-full sm:w-auto"
            whileHover={{ y: -1 }}
            whileTap={{ y: 0 }}
          >
            {sortOrder === "newest" ? (
              <SortDesc className="h-4 w-4" />
            ) : (
              <SortAsc className="h-4 w-4" />
            )}
            {sortOrder === "newest" ? "Newest" : "Oldest"}
          </motion.button>
        </div>
      </motion.div>

      {/* Results Info */}
      <motion.div 
        className="text-center mb-6"
        variants={itemVariants}
      >
        <div className="inline-flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 font-mono">
          <div className="h-px w-4 bg-current" />
          <span>
            {filteredArticles.length} ARTICLE{filteredArticles.length !== 1 ? 'S' : ''}
            {filter !== "All" && ` IN ${filter.toUpperCase()}`}
            {searchTerm && ` MATCHING "${searchTerm.toUpperCase()}"`}
          </span>
          <div className="h-px w-4 bg-current" />
        </div>
      </motion.div>
      
      {/* Articles grid layout */}
      {filteredArticles.length === 0 ? (
        <motion.div 
          className="text-center py-14"
          variants={itemVariants}
        >
          <div className="max-w-md mx-auto">
            <h3 className="text-3xl font-light text-black dark:text-white mb-4">
              No Results Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              The archives don't contain any articles matching your current search criteria.
            </p>
            <motion.button
              onClick={() => {
                setSearchTerm("");
                handleFilterChange("All");
              }}
              className="inline-flex items-center gap-3 px-8 py-3 border border-gray-200 dark:border-gray-700 text-sm font-medium tracking-[0.1em] uppercase text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              Clear All Filters
            </motion.button>
          </div>
        </motion.div>
      ) : (
        <ArticleGrid articles={filteredArticles} />
      )}
    </motion.section>
  );
}
