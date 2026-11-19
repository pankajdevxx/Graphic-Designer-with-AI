import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Eye, User, Calendar, Share2, Sparkles } from 'lucide-react';
import contentService from '../services/contentService';
import LoadingSpinner from '../components/common/LoadingSpinner';
import PrimaryButton from '../components/ui/PrimaryButton';

export const BlogDetailPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await contentService.getBlogPostDetail(slug);
        setPost(data);
      } catch (err) {
        setError(err?.message || 'Article could not be found.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 text-slate-400">
        <LoadingSpinner size="lg" />
        <span className="text-xs font-mono">Retrieving design essay...</span>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 space-y-4">
        <h1 className="text-2xl font-bold text-white">Article Not Found</h1>
        <p className="text-sm text-slate-400">{error || 'This creative insight is unavailable.'}</p>
        <Link to="/blog">
          <PrimaryButton size="md">
            <ArrowLeft size={14} /> Back to Blog
          </PrimaryButton>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05020c] py-16 px-4 sm:px-6 lg:px-8">
      <article className="max-w-4xl mx-auto space-y-8">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={14} /> Back to All Articles
        </Link>

        {/* Title & Metadata */}
        <div className="space-y-4">
          <span className="px-3 py-1 rounded-full bg-violet-950/80 border border-violet-500/30 text-violet-300 text-xs font-mono uppercase font-bold">
            {post.category}
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-slate-400 pt-2 border-b border-white/[0.08] pb-4">
            <span className="flex items-center gap-1.5 text-slate-300 font-semibold">
              <User size={14} className="text-violet-400" /> {post.author_name}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} /> {post.read_time_minutes} min read
            </span>
            <span className="flex items-center gap-1.5">
              <Eye size={14} /> {post.views_count} views
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} /> {new Date(post.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Featured Banner Image */}
        {post.featured_image_url && (
          <div className="aspect-[16/9] w-full rounded-3xl overflow-hidden border border-white/[0.08] shadow-2xl bg-black/40">
            <img src={post.featured_image_url} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Article Content */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0b051c]/80 border border-white/[0.08] backdrop-blur-2xl shadow-xl prose prose-invert max-w-none text-slate-200 leading-relaxed font-sans text-base space-y-6">
          <div className="whitespace-pre-line text-slate-200">
            {post.content}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-violet-950/40 via-purple-950/40 to-fuchsia-950/40 border border-violet-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-white">Ready to elevate your digital designs?</h3>
            <p className="text-xs text-slate-300 mt-1">Explore our verified marketplace kits with full commercial licensing.</p>
          </div>
          <Link to="/marketplace">
            <PrimaryButton size="md" className="shrink-0">
              <Sparkles size={14} /> Explore Marketplace
            </PrimaryButton>
          </Link>
        </div>
      </article>
    </div>
  );
};

export default BlogDetailPage;
