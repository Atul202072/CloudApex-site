
import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { BlogPost } from '../types';
import { Plus, Trash2, Layout, FileText, ImageIcon } from 'lucide-react';

export const AdminBlogs: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '', category: 'Tech', image: '' });
  const [isLoading, setIsLoading] = useState(false);

  const fetchBlogs = async () => {
    const data = await api.getBlogs();
    setBlogs(data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await api.createBlog(formData);
      setIsAdding(false);
      setFormData({ title: '', content: '', category: 'Tech', image: '' });
      fetchBlogs();
    } catch (err) {
      alert('Failed to create blog. Check console.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    try {
      await api.deleteBlog(id);
      fetchBlogs();
    } catch (err) {
      alert('Failed to delete.');
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-down">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Blog Management</h2>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
        >
          {isAdding ? 'Cancel' : <><Plus className="w-4 h-4" /> New Post</>}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleCreate} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <Layout className="w-4 h-4" /> Title
              </label>
              <input 
                required
                className="w-full bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-lg py-2 px-3 text-sm focus:ring-indigo-600"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                placeholder="Latest in Cloud Native..."
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <ImageIcon className="w-4 h-4" /> Image URL (Optional)
              </label>
              <input 
                className="w-full bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-lg py-2 px-3 text-sm focus:ring-indigo-600"
                value={formData.image}
                onChange={e => setFormData({...formData, image: e.target.value})}
                placeholder="https://images.unsplash.com/..."
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
              <FileText className="w-4 h-4" /> Content
            </label>
            <textarea 
              required
              rows={4}
              className="w-full bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-lg py-2 px-3 text-sm focus:ring-indigo-600 resize-none"
              value={formData.content}
              onChange={e => setFormData({...formData, content: e.target.value})}
              placeholder="Tell your story..."
            />
          </div>
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Posting...' : 'Publish Blog Post'}
          </button>
        </form>
      )}

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Blog Title</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Category</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Date</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {blogs.length === 0 ? (
              <tr><td colSpan={4} className="px-6 py-10 text-center text-slate-400">No blog posts found.</td></tr>
            ) : (
              blogs.map(blog => (
                <tr key={blog.id} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-900 dark:text-white line-clamp-1">{blog.title}</p>
                    <p className="text-xs text-slate-500">ID: {blog.id}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs px-2 py-0.5 rounded uppercase font-bold">
                      {blog.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{blog.date}</td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleDelete(blog.id)}
                      className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
