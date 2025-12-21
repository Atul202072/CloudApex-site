
import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { BlogPost } from '../types';
import { ArrowLeft, Calendar, User, Share2, Bookmark, MessageCircle, Loader2 } from 'lucide-react';

interface BlogDetailProps {
  blogId: string;
  onBack: () => void;
}

export const BlogDetail: React.FC<BlogDetailProps> = ({ blogId, onBack }) => {
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogs = await api.getBlogs();
        const found = blogs.find(b => b.id === blogId);
        setBlog(found || null);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlog();
  }, [blogId]);

  if (isLoading) {
    return (
      <div className="pt-40 text-center flex flex-col items-center gap-4">
        <Loader2 className="animate-spin text-indigo-600" size={40} />
        <p className="text-slate-500 font-medium">Loading article...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="pt-40 text-center">
        <h2 className="text-2xl font-bold">Article not found</h2>
        <button onClick={onBack} className="mt-4 text-indigo-600 font-bold hover:underline">Go back to blogs</button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-down pb-24">
      {/* Article Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12">
        <button onClick={onBack} className="flex items-center text-indigo-600 font-bold mb-8 hover:translate-x-[-4px] transition-transform">
          <ArrowLeft className="mr-2 w-5 h-5" /> Back to Insights
        </button>
        
        <div className="space-y-6">
          <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">{blog.category}</span>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight tracking-tight">{blog.title}</h1>
          
          <div className="flex flex-wrap items-center justify-between gap-6 pt-4 border-b border-slate-100 pb-8">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-full bg-slate-200 bg-cover bg-center" style={{ backgroundImage: `url('https://i.pravatar.cc/150?u=${blog.author}')` }}></div>
              <div>
                <p className="font-bold text-slate-900">{blog.author}</p>
                <div className="flex items-center gap-3 text-xs text-slate-400 font-medium mt-0.5">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(blog.date).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>8 min read</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2.5 rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors"><Bookmark size={18}/></button>
              <button className="p-2.5 rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors"><Share2 size={18}/></button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="h-[400px] md:h-[600px] rounded-[3rem] overflow-hidden shadow-2xl relative">
          <img src={blog.image || `https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80`} alt={blog.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-lg prose-indigo max-w-none text-slate-700 leading-relaxed space-y-8">
          {blog.content.split('\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* Tags / Interactions */}
        <div className="mt-16 pt-8 border-t border-slate-100 flex flex-wrap items-center justify-between gap-8">
           <div className="flex gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Tags:</span>
              {['Tech', 'Cloud', 'Insights'].map(t => (
                <span key={t} className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition-colors">#{t}</span>
              ))}
           </div>
           <button className="flex items-center gap-2 text-indigo-600 font-bold hover:bg-indigo-50 px-6 py-3 rounded-2xl transition-all">
              <MessageCircle size={20} /> Join Discussion
           </button>
        </div>
      </div>
    </div>
  );
};
