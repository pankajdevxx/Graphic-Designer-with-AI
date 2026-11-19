import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles, Clock, User, ArrowRight, Eye } from 'lucide-react';
import contentService from '../services/contentService';
import LoadingSpinner from '../components/common/LoadingSpinner';
import GradientText from '../components/ui/GradientText';

export const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'UI/UX Design', 'Branding Systems', 'Engineering & Growth', 'Social Media Creatives'];

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const cat = selectedCategory === 'All' ? '' : selectedCategory;
        const res = await contentService.getBlogPosts(cat);
        setPosts(res.posts || []);
      } catch (err) {
        console.error('Failed to load blog posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-[#05020c] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-950/60 border border-violet-500/30 text-violet-300 text-xs font-mono font-semibold">
            <Sparkles size={13} />
            <span>CREATIVE EDITORIAL</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
            Creative <GradientText variant="purple-fuchsia">Insights</GradientText> & Trends
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Design principles, generative workflows, branding architecture, and spatial glass UI deep-dives from our studio experts.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'bg-violet-600 text-white font-bold shadow-lg shadow-purple-950/50'
                    : 'bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-4 text-slate-400">
            <LoadingSpinner size="lg" />
            <span className="text-xs font-mono">Loading insights...</span>
          </div>
        ) : posts.length === 0 ? (
          <div className="py-20 text-center text-slate-500 text-sm font-mono">
            No articles found in this category. Check back soon for new design essays.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post, idx) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="rounded-3xl bg-[#0b051c]/80 border border-white/[0.08] hover:border-violet-500/40 backdrop-blur-xl overflow-hidden group shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/9] w-full overflow-hidden bg-black/40 relative">
                    {post.featured_image_url ? (
                      <img
                        src={post.featured_image_url}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-600 font-mono text-xs">
                        PixelGen Studio Article
                      </div>
                    )}
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-violet-300 text-[10px] font-mono font-bold uppercase">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6 sm:p-8 space-y-3">
                    <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <Clock size={13} />
                        {post.read_time_minutes} min read
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Eye size={13} />
                        {post.views_count} views
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-purple-200 transition-colors leading-snug">
                      <Link to={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-300/80 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 sm:p-8 pt-0 flex items-center justify-between border-t border-white/[0.06] mt-4 pt-4">
                  <span className="text-xs font-mono text-slate-400">By {post.author_name}</span>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="flex items-center gap-1.5 text-xs font-mono text-violet-400 group-hover:text-violet-300 font-bold transition-colors"
                  >
                    <span>Read Essay</span>
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
