
import { User, BlogPost } from '../types';

const API_BASE = '/api';

const getHeaders = () => {
  const token = localStorage.getItem('cloudapex_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

export const api = {
  async signup(email: string, name: string): Promise<any> {
    const response = await fetch(`${API_BASE}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, password: 'password123' })
    });
    const data = await response.json();
    if (data.token) localStorage.setItem('cloudapex_token', data.token);
    return data;
  },

  async login(email: string): Promise<any> {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: 'password123' })
    });
    const data = await response.json();
    if (data.token) localStorage.setItem('cloudapex_token', data.token);
    return data;
  },

  async getSession(): Promise<User | null> {
    const token = localStorage.getItem('cloudapex_token');
    if (!token) return null;
    try {
      const response = await fetch(`${API_BASE}/auth/me`, { headers: getHeaders() });
      if (!response.ok) throw new Error();
      return await response.json();
    } catch {
      localStorage.removeItem('cloudapex_token');
      return null;
    }
  },

  async logout(): Promise<void> {
    localStorage.removeItem('cloudapex_token');
  },

  async updateUser(updatedData: Partial<User>): Promise<any> {
    const response = await fetch(`${API_BASE}/user/profile`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(updatedData)
    });
    return await response.json();
  },

  // Blog API
  async getBlogs(): Promise<BlogPost[]> {
    const response = await fetch(`${API_BASE}/blogs`);
    return await response.json();
  },

  async createBlog(blog: Partial<BlogPost>): Promise<BlogPost> {
    const response = await fetch(`${API_BASE}/blogs`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(blog)
    });
    if (!response.ok) throw new Error('Unauthorized or failed to create');
    return await response.json();
  },

  async deleteBlog(id: string): Promise<void> {
    const response = await fetch(`${API_BASE}/blogs/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    if (!response.ok) throw new Error('Failed to delete');
  }
};
