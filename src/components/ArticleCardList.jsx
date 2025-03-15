"use client";

import { useState, useMemo, useEffect } from "react";
import ArticleCard from "./ArticleCard";
import { motion } from "framer-motion";

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
    <div className="py-12">
      {/* Controls section */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
            />
          </div>
          <div className="flex gap-2">
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
            >
              {articleTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <select 
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Results count */}
      <p className="mb-6 text-gray-600 dark:text-gray-400">
        Showing {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''}
        {filter !== "All" ? ` in "${filter}"` : ''}
        {searchTerm ? ` matching "${searchTerm}"` : ''}
      </p>
      
      {/* Articles grid layout - changed from flex column to grid */}
      {filteredArticles.length === 0 ? (
        <div className="text-center py-20">
          <h3 className="text-2xl font-medium">No articles found</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Try adjusting your filters or search term</p>
        </div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 py-12">
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
