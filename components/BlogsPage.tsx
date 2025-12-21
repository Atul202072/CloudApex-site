
import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { BlogPost } from '../types';
import { Calendar, User, ArrowRight, Loader2 } from 'lucide-react';

interface BlogsPageProps {
  onReadMore?: (id: string) => void;
}

export const BlogsPage: React.FC<BlogsPageProps> = ({ onReadMore }) => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await api.getBlogs();
        setBlogs(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (isLoading) {
    return (
      <div className="py-24 text-center">
        <Loader2 className="animate-spin h-10 w-10 text-indigo-600 mx-auto" />
      </div>
    );
  }

  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {blogs.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
          <p className="text-slate-500">No blog posts available yet. Stay tuned!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map(blog => (
            <article 
              key={blog.id} 
              onClick={() => onReadMore?.(blog.id)}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col cursor-pointer"
            >
              <div className="h-52 w-full relative overflow-hidden">
                <img 
                  src={blog.image || `https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80&sig=${blog.id}`} 
                  alt={blog.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg shadow-indigo-500/20">
                    {blog.category}
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs text-slate-400 mb-4 font-bold uppercase tracking-widest">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {new Date(blog.date).toLocaleDateString()}</span>
                  <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {blog.author}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors leading-tight">
                  {blog.title}
                </h3>
                <p className="text-slate-600 text-sm mb-6 line-clamp-3 leading-relaxed">
                  {blog.content}
                </p>
                <button className="mt-auto text-indigo-600 font-bold text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
                  Read Article <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};
