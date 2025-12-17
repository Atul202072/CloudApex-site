import React from 'react';
import { Clock, BarChart, Tag } from 'lucide-react';
import { Course } from '../types';
import { Button } from './Button';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="group bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:border-indigo-100 transition-all duration-300 flex flex-col h-full hover:-translate-y-1">
      <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
        {course.icon}
      </div>
      
      <h3 className="text-2xl font-bold text-slate-900 mb-3">{course.title}</h3>
      <p className="text-slate-600 mb-6 flex-grow leading-relaxed">{course.description}</p>
      
      <div className="space-y-4 mb-8">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Clock className="w-4 h-4" />
          <span>{course.duration}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <BarChart className="w-4 h-4" />
          <span>{course.level}</span>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          {course.tags.map(tag => (
            <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-600">
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </span>
          ))}
        </div>
      </div>

      <Button variant="outline" className="w-full">View Details</Button>
    </div>
  );
};