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

export interface Feature {
  title: string;
  description: string;
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