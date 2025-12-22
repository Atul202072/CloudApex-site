
import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, Star, Clock, Globe, ShieldCheck, Users, PlayCircle, BookOpen, Download, Loader2 } from 'lucide-react';
import { Course } from '../types';
import { Button } from './Button';

interface CourseDetailProps {
  course: Course;
  onBack: () => void;
  onEnroll: (trackId: string) => void;
}

export const CourseDetail: React.FC<CourseDetailProps> = ({ course, onBack, onEnroll }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadBrochure = () => {
    setIsDownloading(true);
    
    // Simulate generation of a brochure file
    const brochureContent = `
CLOUD APEX LEARNING - PROGRAM BROCHURE
=======================================
Course: ${course.title}
Track ID: ${course.id}
Duration: ${course.duration}
Level: ${course.level}

CURRICULUM HIGHLIGHTS:
- Cloud Architecture Foundations
- High Availability & Security
- Scalable Systems Design
- Enterprise Project Work

PRICING: $499.00 Total
Includes: Lifetime access, Certification, Job Support.

Visit hello@cloudapex.com for support.
    `;

    // Trigger local download
    const blob = new Blob([brochureContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CloudApex_Brochure_${course.id}.txt`;
    
    // Slight delay for UX
    setTimeout(() => {
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      setIsDownloading(false);
    }, 1200);
  };

  return (
    <div className="animate-fade-in-down pb-24">
      <div className="bg-slate-900 pt-32 pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-600 opacity-10 blur-[100px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <button onClick={onBack} className="flex items-center text-indigo-400 font-bold mb-8 hover:text-white transition-colors group">
            <ArrowLeft className="mr-2 w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Back to Courses
          </button>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div className="flex flex-wrap gap-4">
                <span className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-widest border border-indigo-500/30">Top Rated</span>
                <span className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-widest border border-emerald-500/30">Job Guaranteed</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">{course.title}</h1>
              <p className="text-slate-400 text-xl leading-relaxed max-w-xl">{course.description}</p>
              
              <div className="flex items-center gap-8 text-white/80">
                <div className="flex items-center gap-2">
                  <Star className="text-amber-400 fill-amber-400" size={20} />
                  <span className="font-bold">4.9/5.0</span>
                  <span className="text-slate-500 text-sm">(1.2k Reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="text-indigo-400" size={20} />
                  <span className="font-bold">5,000+ Students</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button onClick={() => onEnroll(course.id)} size="lg" className="px-10 shadow-xl shadow-indigo-600/20">Enroll Now</Button>
                <Button 
                  onClick={handleDownloadBrochure} 
                  variant="secondary" 
                  size="lg"
                  disabled={isDownloading}
                  className="flex items-center gap-2"
                >
                  {isDownloading ? <Loader2 className="animate-spin" size={20} /> : <Download size={20} />}
                  {isDownloading ? 'Generating...' : 'Download Brochure'}
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-2xl">
                 <h3 className="text-xl font-bold text-white mb-6">Program Highlights</h3>
                 <div className="space-y-6">
                    <HighlightItem icon={<Clock />} title="Flexible Learning" desc="Attend live or watch recorded sessions at your own pace." />
                    <HighlightItem icon={<Globe />} title="Hiring Partners" desc="Direct access to 50+ tech giants for internship and placement." />
                    <HighlightItem icon={<ShieldCheck />} title="Verified Certificate" desc="Get a global standard certification from CloudApex." />
                 </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-indigo-600 text-white p-6 rounded-2xl shadow-xl hidden md:block">
                 <p className="text-3xl font-bold">$499 <span className="text-sm font-normal text-indigo-200">/ Total</span></p>
                 <p className="text-xs uppercase font-bold tracking-widest mt-1">Limited Time Offer</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">What you will learn</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {['Cloud Security Principles', 'High Availability Design', 'Microservices Architecture', 'DevOps & CI/CD Pipelines', 'Advanced Infrastructure as Code', 'Serverless Computing'].map(item => (
                 <div key={item} className="flex gap-3 items-center p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                    <CheckCircle2 className="text-emerald-500 shrink-0" size={20} />
                    <span className="text-slate-700 font-medium">{item}</span>
                 </div>
               ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Curriculum Roadmap</h2>
            <div className="space-y-4">
               <ModuleItem num="01" title="Cloud Foundations & Operating Systems" lessons="12 Lessons" />
               <ModuleItem num="02" title="Compute, Storage & Networking" lessons="15 Lessons" />
               <ModuleItem num="03" title="Databases & Application Services" lessons="10 Lessons" />
               <ModuleItem num="04" title="Final Capstone Project & Portfolio" lessons="8 Lessons" />
            </div>
          </div>
        </div>

        <div className="space-y-8">
           <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-lg shadow-slate-100/50">
              <h3 className="font-bold text-xl text-slate-900 mb-6">Prerequisites</h3>
              <ul className="space-y-4">
                 <li className="flex gap-3 text-slate-600 text-sm">
                    <div className="mt-1 size-1.5 rounded-full bg-indigo-500 shrink-0"></div>
                    Basic understanding of computer systems
                 </li>
                 <li className="flex gap-3 text-slate-600 text-sm">
                    <div className="mt-1 size-1.5 rounded-full bg-indigo-500 shrink-0"></div>
                    Curiosity to build and solve problems
                 </li>
                 <li className="flex gap-3 text-slate-600 text-sm">
                    <div className="mt-1 size-1.5 rounded-full bg-indigo-500 shrink-0"></div>
                    Consistent 5-7 hours per week
                 </li>
              </ul>
           </div>

           <div className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100">
              <h3 className="font-bold text-xl text-indigo-900 mb-4">Instructor</h3>
              <div className="flex items-center gap-4 mb-4">
                 <div className="size-16 rounded-2xl bg-cover bg-center" style={{ backgroundImage: `url('https://i.pravatar.cc/150?img=11')` }}></div>
                 <div>
                    <p className="font-bold text-slate-900">Dr. Sarah Jenkins</p>
                    <p className="text-xs text-indigo-600 font-bold uppercase tracking-wider">Lead Cloud Architect</p>
                 </div>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ex-Google Cloud Engineer with 15+ years of experience in distributed systems and automation.
              </p>
           </div>
        </div>
      </section>
    </div>
  );
};

const HighlightItem = ({ icon, title, desc }: any) => (
  <div className="flex gap-4 items-start">
    <div className="bg-indigo-500/20 text-indigo-400 p-3 rounded-xl">{icon}</div>
    <div>
      <h4 className="font-bold text-white text-sm">{title}</h4>
      <p className="text-slate-500 text-xs mt-1 leading-relaxed">{desc}</p>
    </div>
  </div>
);

const ModuleItem = ({ num, title, lessons }: any) => (
  <div className="flex items-center justify-between p-6 bg-white rounded-2xl border border-slate-100 hover:border-indigo-200 transition-all cursor-pointer group">
    <div className="flex items-center gap-6">
      <span className="text-2xl font-bold text-slate-200 group-hover:text-indigo-600 transition-colors">{num}</span>
      <div>
        <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{title}</h4>
        <div className="flex items-center gap-2 text-xs text-slate-400 mt-1 font-medium">
          <PlayCircle size={14} /> {lessons}
        </div>
      </div>
    </div>
    <BookOpen className="text-slate-200 group-hover:text-indigo-600 transition-colors" />
  </div>
);
