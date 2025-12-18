
import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from './Button';

interface HeroProps {
  onExploreCourses: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCourses }) => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-indigo-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            New Cohort Starting Soon
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight mb-6 leading-tight">
            Launch your career in <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Cloud & Data Science</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Master the skills that top tech companies are hiring for. 
            Join our immersive bootcamp with real-time projects, internship opportunities, and industry-recognized certifications.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" size="lg" className="w-full sm:w-auto group" onClick={onExploreCourses}>
              Explore Courses 
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              View Syllabus
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm font-medium text-slate-500">
            {['100% Job Assistance', 'Live Mentorship', 'Real-world Projects'].map((feature) => (
              <div key={feature} className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                {feature}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
