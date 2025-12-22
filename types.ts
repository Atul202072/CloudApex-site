
import React from 'react';

export interface Course {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  duration: string;
  level: string;
  tags: string[];
}

export interface SyllabusModule {
  title: string;
  topics: string[];
}

export interface TimelineStep {
  title: string;
  description: string;
  month: string;
  icon: React.ReactNode;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  location: string;
  avatar: string;
  level: number;
  xp: number;
  totalXp: number;
  bio: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}

export interface EnrollmentData {
  fullName: string;
  email: string;
  phone: string;
  track: string;
  experience: string;
  motivation: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
