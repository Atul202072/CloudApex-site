import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, Database, Cloud } from 'lucide-react';
import { SyllabusModule } from '../types';

const syllabusData: Record<string, SyllabusModule[]> = {
  cloud: [
    { title: 'Introduction to Cloud Computing', topics: ['Cloud Service Models (IaaS, PaaS, SaaS)', 'AWS Global Infrastructure', 'Identity & Access Management (IAM)', 'EC2 & Virtualization'] },
    { title: 'Advanced Cloud Networking', topics: ['VPC, Subnets & Route Tables', 'Load Balancing & Auto Scaling', 'Route53 & DNS', 'CloudFront CDN'] },
    { title: 'Serverless & Containers', topics: ['AWS Lambda', 'API Gateway', 'Docker Fundamentals', 'ECS & EKS Basics'] }
  ],
  devops: [
    { title: 'Linux & Git Mastery', topics: ['Shell Scripting', 'User Management & Permissions', 'Git Workflows', 'Branching Strategies'] },
    { title: 'CI/CD Pipelines', topics: ['Jenkins Architecture', 'GitHub Actions', 'Pipeline as Code', 'Automated Testing Integration'] },
    { title: 'Infrastructure as Code', topics: ['Terraform State & Modules', 'Ansible Playbooks', 'Kubernetes Architecture', 'Helm Charts'] }
  ],
  data: [
    { title: 'Python & SQL Fundamentals', topics: ['Python Syntax & Data Structures', 'Pandas & NumPy', 'SQL Joins & Aggregations', 'Database Normalization'] },
    { title: 'Data Visualization', topics: ['Tableau Dashboarding', 'PowerBI Fundamentals', 'Matplotlib & Seaborn', 'Storytelling with Data'] },
    { title: 'Intro to Machine Learning', topics: ['Supervised vs Unsupervised Learning', 'Scikit-Learn', 'Regression & Classification', 'Model Evaluation'] }
  ]
};

export const Syllabus: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cloud' | 'devops' | 'data'>('cloud');
  const [openModuleIndex, setOpenModuleIndex] = useState<number | null>(0);

  const toggleModule = (index: number) => {
    setOpenModuleIndex(openModuleIndex === index ? null : index);
  };

  return (
    <section id="syllabus" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Comprehensive Syllabus</h2>
          <p className="text-lg text-slate-600">Curriculum designed by industry experts to meet current market demands.</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            { id: 'cloud', label: 'Cloud Computing', icon: <Cloud className="w-5 h-5"/> },
            { id: 'devops', label: 'DevOps', icon: <BookOpen className="w-5 h-5"/> },
            { id: 'data', label: 'Data Analytics', icon: <Database className="w-5 h-5"/> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id as any); setOpenModuleIndex(0); }}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                activeTab === tab.id 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {syllabusData[activeTab].map((module, index) => (
            <div 
              key={index} 
              className={`border rounded-2xl transition-all duration-300 ${
                openModuleIndex === index 
                  ? 'border-indigo-200 bg-indigo-50/30' 
                  : 'border-slate-100 hover:border-indigo-100 bg-white'
              }`}
            >
              <button
                onClick={() => toggleModule(index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <div className="flex items-center gap-4">
                  <span className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                    openModuleIndex === index ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {index + 1}
                  </span>
                  <span className={`text-lg font-semibold ${openModuleIndex === index ? 'text-indigo-900' : 'text-slate-900'}`}>
                    {module.title}
                  </span>
                </div>
                {openModuleIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-indigo-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openModuleIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="p-6 pt-0 pl-20">
                  <ul className="space-y-3">
                    {module.topics.map((topic, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};