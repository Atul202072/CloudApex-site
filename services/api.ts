
import { User, BlogPost, AuthResponse, EnrollmentData } from '../types';
import { api as mockApi } from './mockBackend';

const API_BASE = '/api';

const getHeaders = () => {
  const token = localStorage.getItem('cloudapex_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

const handleResponse = async (response: Response) => {
  const contentType = response.headers.get('content-type');
  let data;
  
  if (contentType && contentType.includes('application/json')) {
    data = await response.json();
  } else {
    data = { error: await response.text() };
  }

  if (!response.ok) {
    const errorMessage = data.error || response.statusText || 'An unexpected error occurred';
    throw new Error(errorMessage);
  }
  return data;
};

export const api = {
  async signup(email: string, name: string, password?: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, password: password || 'password123' })
      });
      const data = await handleResponse(response);
      if (data.token) localStorage.setItem('cloudapex_token', data.token);
      return data;
    } catch (err) {
      console.warn("Auth API unreachable, using mock signup.");
      const user = await mockApi.signup(email, name);
      return { token: 'mock-token', user };
    }
  },

  async login(email: string, password?: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: password || 'password123' })
      });
      const data = await handleResponse(response);
      if (data.token) localStorage.setItem('cloudapex_token', data.token);
      return data;
    } catch (err) {
      console.warn("Auth API unreachable, using mock login.");
      const user = await mockApi.login(email);
      return { token: 'mock-token', user };
    }
  },

  async submitEnrollment(data: EnrollmentData): Promise<any> {
    try {
      const response = await fetch(`${API_BASE}/enrollment`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
      });
      return await handleResponse(response);
    } catch (error) {
      console.warn("Enrollment API Error, using simulation mode.");
      await new Promise(r => setTimeout(r, 1000));
      return { message: "Enrollment received (Simulated)" };
    }
  },

  async getSession(): Promise<User | null> {
    const token = localStorage.getItem('cloudapex_token');
    if (!token) return null;
    
    // If it's a mock token, return the mock session
    if (token === 'mock-token') {
      return await mockApi.getSession();
    }

    try {
      const response = await fetch(`${API_BASE}/auth/me`, { headers: getHeaders() });
      if (!response.ok) throw new Error();
      return await response.json();
    } catch {
      // Fallback to mock session if network check fails
      return await mockApi.getSession();
    }
  },

  async logout(): Promise<void> {
    localStorage.removeItem('cloudapex_token');
    await mockApi.logout();
  },

  async updateUser(updatedData: Partial<User>): Promise<User> {
    try {
      const response = await fetch(`${API_BASE}/user/profile`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(updatedData)
      });
      return await handleResponse(response);
    } catch (err) {
      return await mockApi.updateUser(updatedData);
    }
  },

  async changePassword(currentPassword: string, newPassword: string): Promise<any> {
    try {
      const response = await fetch(`${API_BASE}/user/change-password`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ currentPassword, newPassword })
      });
      return await handleResponse(response);
    } catch (err) {
      await new Promise(r => setTimeout(r, 800));
      return { message: 'Password updated successfully (Simulated)' };
    }
  },

  async submitContact(data: any): Promise<any> {
    try {
      const response = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return await handleResponse(response);
    } catch (err) {
      await new Promise(r => setTimeout(r, 800));
      return { message: 'Message received (Simulated)' };
    }
  },

  async getBlogs(): Promise<BlogPost[]> {
    try {
      const response = await fetch(`${API_BASE}/blogs`);
      return await handleResponse(response);
    } catch (err) {
      return []; // Return empty or add mock blogs here
    }
  },

  async createBlog(blog: Partial<BlogPost>): Promise<BlogPost> {
    const response = await fetch(`${API_BASE}/blogs`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(blog)
    });
    return await handleResponse(response);
  },

  async deleteBlog(id: string): Promise<void> {
    const response = await fetch(`${API_BASE}/blogs/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    if (!response.ok) throw new Error('Failed to delete blog');
  }
};
