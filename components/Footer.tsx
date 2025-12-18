
import React from 'react';
import { CloudLightning, Github, Twitter, Linkedin, Mail } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4 cursor-pointer" onClick={() => onNavigate('home')}>
              <div className="bg-indigo-600 p-1.5 rounded-lg">
                <CloudLightning className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">CloudApex</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Empowering the next generation of cloud engineers and data analysts with industry-ready skills.
            </p>
            <div className="flex gap-4">
                <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors"><Github className="w-5 h-5" /></a>
                <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-4">Programs</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><button onClick={() => onNavigate('courses')} className="hover:text-indigo-600">Cloud Computing</button></li>
              <li><button onClick={() => onNavigate('courses')} className="hover:text-indigo-600">DevOps Engineering</button></li>
              <li><button onClick={() => onNavigate('courses')} className="hover:text-indigo-600">Data Analytics</button></li>
              <li><button onClick={() => onNavigate('courses')} className="hover:text-indigo-600">Full Stack Web</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><button onClick={() => onNavigate('home')} className="hover:text-indigo-600">About Us</button></li>
              <li><button onClick={() => onNavigate('experience')} className="hover:text-indigo-600">Success Stories</button></li>
              <li><button onClick={() => onNavigate('path')} className="hover:text-indigo-600">Mentors</button></li>
              <li><button onClick={() => onNavigate('syllabus')} className="hover:text-indigo-600">Syllabus</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-4">Contact</h4>
            <ul className="space-y-4 text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400" />
                hello@cloudapex.com
              </li>
              <li>
                123 Innovation Drive,<br/>
                Tech City, TC 90210
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">© 2024 CloudApex Learning. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-indigo-600">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-600">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
