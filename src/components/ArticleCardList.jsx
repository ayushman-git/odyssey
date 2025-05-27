"use client";

import { useState, useMemo, useEffect } from "react";
import ArticleCard from "./ArticleCard";
import { motion } from "framer-motion";
import { Input } from "./ui/input";
import { Search, SortAsc, SortDesc } from "lucide-react";
import { Button } from "./ui/button";

export default function ArticleCardList({ initialArticles = [] }) {
  const [articles, setArticles] = useState(initialArticles);
  const [loading, setLoading] = useState(initialArticles.length === 0);
  const [filter, setFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    // If we already have articles passed as props, don't fetch
    if (initialArticles.length > 0) {
      setArticles(initialArticles);
      setLoading(false);
      return;
    }
    
    // Otherwise fetch from API
    async function fetchArticles() {
      try {
        setLoading(true);
        const response = await fetch('/api/articles');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error('Error loading articles:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchArticles();
  }, [initialArticles]);

  // Get unique article types for filter options
  const articleTypes = useMemo(() => {
    const types = ["All", ...new Set(articles.map(article => article.type))];
    return types;
  }, [articles]);

  // Filter and sort articles
  const filteredArticles = useMemo(() => {
    let filtered = articles;
    
    // Apply type filter
    if (filter !== "All") {
      filtered = filtered.filter(article => article.type === filter);
    }
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (article.introduction && article.introduction.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Apply sorting
    return filtered.sort((a, b) => {
      const prevDate = a.date.split("-");
      const nextDate = b.date.split("-");
      
      const prevDateObj = new Date(prevDate[2], prevDate[1] - 1, prevDate[0]);
      const nextDateObj = new Date(nextDate[2], nextDate[1] - 1, nextDate[0]);
      
      if (sortOrder === "newest") {
        return nextDateObj - prevDateObj;
      } else {
        return prevDateObj - nextDateObj;
      }
    });
  }, [articles, filter, sortOrder, searchTerm]);

  if (loading) {
    return (
      <div className="py-12 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
        </div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading articles...</p>
      </div>
    );
  }

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
            {/* Sort Order Toggle Button */}
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
        
        {/* Article Type Filter using Button group */}
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
      
      {/* Results count */}
      <div className="mb-8 text-sm text-gray-600 dark:text-gray-400 flex flex-wrap">
        <motion.span
          key={`count-${filteredArticles.length}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          Showing <strong>{filteredArticles.length}</strong> article{filteredArticles.length !== 1 ? 's' : ''}
        </motion.span>
        
        {filter !== "All" && (
          <motion.span
            key={`filter-${filter}`}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            &nbsp;in <strong>{filter}</strong>
          </motion.span>
        )}
        
        {searchTerm && (
          <motion.span
            key={`search-${searchTerm}`}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            &nbsp;matching <strong>{searchTerm}</strong>
          </motion.span>
        )}
      </div>
      
      {/* Articles grid layout */}
      {filteredArticles.length === 0 ? (
        <motion.div 
          className="flex flex-col items-center justify-center py-16 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h3 
            className="text-3xl font-medium text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            No articles found
          </motion.h3>
          <motion.p 
            className="mt-3 text-gray-600 dark:text-gray-400 text-center max-w-md"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            We couldn't find any articles matching your current filters. Try adjusting your search term or category selection.
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
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
          </motion.div>
        </motion.div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 pb-10">
          {filteredArticles.map((article, index) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="h-full"
            >
              <ArticleCard details={article} />
            </motion.div>
          ))}
        </section>
      )}
    </div>
  );
}
