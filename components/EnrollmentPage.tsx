
import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, User, Mail, Phone, Rocket, ChevronRight, Loader2, Sparkles, BookOpen, AlertCircle } from 'lucide-react';
import { Button } from './Button';
import { api } from '../services/api';
import { EnrollmentData } from '../types';

interface EnrollmentPageProps {
  initialTrack?: string;
  onBack: () => void;
  onSuccess: () => void;
}

export const EnrollmentPage: React.FC<EnrollmentPageProps> = ({ initialTrack, onBack, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<EnrollmentData>({
    fullName: '',
    email: '',
    phone: '',
    track: initialTrack || 'cloud-arch',
    experience: 'Beginner',
    motivation: ''
  });

  const tracks = [
    { id: 'cloud-arch', name: 'Cloud Computing Architect' },
    { id: 'devops-eng', name: 'DevOps Engineering' },
    { id: 'data-analytics', name: 'Data Analytics Pro' }
  ];

  const handleNext = () => {
    setError(null);
    setStep(p => p + 1);
  }
  const handlePrev = () => {
    setError(null);
    setStep(p => p - 1);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      await api.submitEnrollment(formData);
      onSuccess();
    } catch (err: any) {
      console.error("Submission Error:", err);
      setError(err.message || "Unable to submit your application. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-12">
      {[1, 2, 3].map((s) => (
        <React.Fragment key={s}>
          <div className={`size-10 rounded-full flex items-center justify-center font-bold transition-all ${step >= s ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-slate-100 text-slate-400'}`}>
            {step > s ? <CheckCircle2 size={20} /> : s}
          </div>
          {s < 3 && <div className={`h-1 w-12 mx-2 rounded-full transition-all ${step > s ? 'bg-indigo-600' : 'bg-slate-100'}`} />}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <button onClick={onBack} className="flex items-center text-slate-500 font-bold mb-8 hover:text-indigo-600 transition-colors group">
          <ArrowLeft className="mr-2 w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Back
        </button>

        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 p-8 sm:p-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600 opacity-5 rounded-full -mr-16 -mt-16"></div>
          
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Join the Next Cohort</h2>
            <p className="text-slate-500">Fill out the details to reserve your spot and start your journey.</p>
          </div>

          <StepIndicator />

          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
              <AlertCircle className="shrink-0 mt-0.5" size={18} />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xl font-bold text-slate-900 border-b border-slate-50 pb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input label="Full Name" icon={<User size={16}/>} value={formData.fullName} onChange={v => setFormData({...formData, fullName: v})} placeholder="Alex Chen" required />
                  <Input label="Email Address" icon={<Mail size={16}/>} value={formData.email} onChange={v => setFormData({...formData, email: v})} placeholder="alex@company.com" required type="email" />
                </div>
                <Input label="Phone Number" icon={<Phone size={16}/>} value={formData.phone} onChange={v => setFormData({...formData, phone: v})} placeholder="+1 (555) 000-0000" required type="tel" />
                <div className="pt-4">
                  <Button type="button" onClick={handleNext} className="w-full !py-4">Continue to Track Selection <ChevronRight size={18} className="ml-2" /></Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xl font-bold text-slate-900 border-b border-slate-50 pb-4">Select Your Path</h3>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Career Track</label>
                  <div className="grid grid-cols-1 gap-3">
                    {tracks.map(t => (
                      <button 
                        key={t.id} 
                        type="button"
                        onClick={() => setFormData({...formData, track: t.id})}
                        className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${formData.track === t.id ? 'border-indigo-600 bg-indigo-50/50 ring-4 ring-indigo-500/10' : 'border-slate-100 bg-slate-50 hover:bg-white hover:border-indigo-200'}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`size-4 rounded-full border-2 flex items-center justify-center ${formData.track === t.id ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'}`}>
                            {formData.track === t.id && <div className="size-1.5 bg-white rounded-full"></div>}
                          </div>
                          <span className={`font-bold ${formData.track === t.id ? 'text-indigo-900' : 'text-slate-700'}`}>{t.name}</span>
                        </div>
                        <BookOpen size={18} className={formData.track === t.id ? 'text-indigo-600' : 'text-slate-300'} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Experience Level</label>
                  <div className="flex gap-4">
                    {['Beginner', 'Intermediate', 'Pro'].map(level => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setFormData({...formData, experience: level})}
                        className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all border ${formData.experience === level ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-50 text-slate-500 border-slate-100 hover:bg-white'}`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="button" variant="secondary" onClick={handlePrev} className="flex-1">Back</Button>
                  <Button type="button" onClick={handleNext} className="flex-[2]">Finalize Application</Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xl font-bold text-slate-900 border-b border-slate-50 pb-4">Motivation & Goals</h3>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Why do you want to join?</label>
                  <textarea 
                    required
                    rows={5}
                    value={formData.motivation}
                    onChange={e => setFormData({...formData, motivation: e.target.value})}
                    placeholder="Tell us about your career goals and what you hope to achieve..."
                    className="w-full bg-slate-50 border-none rounded-[2rem] p-6 text-sm focus:ring-4 focus:ring-indigo-600/5 transition-all outline-none text-slate-900 resize-none"
                  />
                </div>

                <div className="bg-indigo-50/50 rounded-2xl p-6 border border-indigo-100/50 flex items-start gap-4">
                   <div className="bg-white p-2 rounded-lg text-indigo-600 shadow-sm"><Sparkles size={18} /></div>
                   <div>
                     <p className="text-sm font-bold text-indigo-900 mb-1">Scholarship Priority</p>
                     <p className="text-xs text-indigo-700/70 leading-relaxed">Completing this form puts you in priority list for our partial scholarships (up to 40% off).</p>
                   </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="button" variant="secondary" onClick={handlePrev} disabled={isSubmitting} className="flex-1">Back</Button>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting || !formData.motivation.trim()}
                    className="flex-[2] !py-4 shadow-xl shadow-indigo-100 group relative overflow-hidden"
                  >
                    <span className={`flex items-center justify-center transition-all ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>
                      <Rocket size={18} className="mr-2 group-hover:-translate-y-1 transition-transform" />
                      Confirm My Enrollment
                    </span>
                    {isSubmitting && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="animate-spin h-6 w-6" />
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

const Input = ({ label, value, onChange, icon, placeholder, type = "text", required }: any) => (
  <div className="space-y-2">
    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{label}</label>
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <span className="text-slate-400 group-focus-within:text-indigo-600 transition-colors">{icon}</span>
      </div>
      <input 
        required={required}
        type={type}
        value={value} 
        onChange={e => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-slate-50 border-none rounded-2xl pl-11 pr-5 py-4 text-sm focus:ring-4 focus:ring-indigo-600/5 transition-all outline-none text-slate-900"
      />
    </div>
  </div>
);
