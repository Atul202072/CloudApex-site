import React from 'react';
import { Briefcase, Award, Code2, CheckCircle } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-24 bg-slate-900 text-white relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-900/20 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-blue-900/20 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-sm font-medium mb-4 border border-indigo-500/30">
                <Briefcase className="w-4 h-4" />
                Real-World Experience
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                Not Just Theory.<br/> 
                <span className="text-indigo-400">Build Actual Products.</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                We believe in learning by doing. Our curriculum integrates live projects that simulate real corporate environments. You won't just learn concepts; you'll implement them.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 hover:border-indigo-500/50 transition-colors">
                    <Code2 className="w-8 h-8 text-emerald-400 mb-4" />
                    <h4 className="text-xl font-bold mb-2">Live Projects</h4>
                    <p className="text-slate-400 text-sm">Deploy scalable apps on AWS, build CI/CD pipelines, and analyze real market data.</p>
                </div>
                <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 hover:border-indigo-500/50 transition-colors">
                    <Award className="w-8 h-8 text-amber-400 mb-4" />
                    <h4 className="text-xl font-bold mb-2">Certification</h4>
                    <p className="text-slate-400 text-sm">Earn industry-recognized certificates upon completion to validate your skills.</p>
                </div>
            </div>

            <div className="flex flex-col gap-4">
               <div className="flex items-start gap-4">
                    <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                        <Briefcase className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="text-lg font-bold">Guaranteed Internship Opportunity</h4>
                        <p className="text-slate-400 text-sm mt-1">
                            Top performers get a direct internship placement with our partner tech firms. Bridge the gap between learning and earning.
                        </p>
                    </div>
               </div>
            </div>
          </div>

          <div className="relative">
             <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-3xl transform rotate-3 opacity-20"></div>
             <div className="relative bg-slate-800 border border-slate-700 rounded-3xl p-8 overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between mb-8 border-b border-slate-700 pb-4">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                        <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                    </div>
                    <span className="text-xs text-slate-500 font-mono">project_deploy.sh</span>
                </div>
                <div className="font-mono text-sm space-y-4">
                    <div className="flex gap-4">
                        <span className="text-slate-500">1</span>
                        <p className="text-emerald-400">$ terraform init</p>
                    </div>
                    <div className="flex gap-4">
                        <span className="text-slate-500">2</span>
                        <p className="text-slate-300">Initializing the backend...</p>
                    </div>
                    <div className="flex gap-4">
                        <span className="text-slate-500">3</span>
                        <p className="text-emerald-400">$ docker build -t cloud-app .</p>
                    </div>
                    <div className="flex gap-4">
                        <span className="text-slate-500">4</span>
                        <p className="text-slate-300">[+] Building 14.2s (8/8) FINISHED</p>
                    </div>
                    <div className="flex gap-4">
                        <span className="text-slate-500">5</span>
                        <p className="text-emerald-400">$ kubectl apply -f deployment.yaml</p>
                    </div>
                    <div className="flex gap-4">
                        <span className="text-slate-500">6</span>
                        <p className="text-indigo-400">deployment.apps/cloud-apex-web created</p>
                    </div>
                    <div className="mt-8 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                        <span className="text-emerald-200">Deployment Successful</span>
                    </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};