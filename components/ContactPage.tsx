
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, Loader2, MessageSquare } from 'lucide-react';
import { Button } from './Button';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    // Reset success message after 5 seconds
    setTimeout(() => setIsSuccess(false), 5000);
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6 text-indigo-600" />,
      title: "Email Us",
      details: "hello@cloudapex.com",
      subtext: "Support available 24/7"
    },
    {
      icon: <Phone className="w-6 h-6 text-indigo-600" />,
      title: "Call Us",
      details: "+1 (555) 123-4567",
      subtext: "Mon-Fri from 9am to 6pm"
    },
    {
      icon: <MapPin className="w-6 h-6 text-indigo-600" />,
      title: "Office Location",
      details: "123 Innovation Drive, Tech City",
      subtext: "Silicon Valley, CA 94043"
    },
    {
      icon: <Clock className="w-6 h-6 text-indigo-600" />,
      title: "Live Chat",
      details: "Available via Dashboard",
      subtext: "Instant responses for students"
    }
  ];

  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Contact Info Column */}
        <div className="space-y-12 animate-in slide-in-from-left duration-700">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-slate-900 font-display">Let's Discuss Your Future</h2>
            <p className="text-slate-600 text-lg max-w-md leading-relaxed">
              Whether you're looking to transition into Cloud Engineering or need help with course selection, our counselors are ready to help.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {contactInfo.map((info, idx) => (
              <div key={idx} className="group p-6 bg-white rounded-3xl border border-slate-100 hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-50/50 transition-all duration-300">
                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {info.icon}
                </div>
                <h3 className="font-bold text-slate-900 mb-1">{info.title}</h3>
                <p className="text-indigo-600 font-bold text-sm mb-1">{info.details}</p>
                <p className="text-slate-400 text-xs">{info.subtext}</p>
              </div>
            ))}
          </div>

          <div className="p-8 bg-slate-900 rounded-[2rem] text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-10">
                <MessageSquare size={120} />
             </div>
             <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2">Corporate Inquiries?</h3>
                <p className="text-slate-400 text-sm mb-6">Looking for enterprise training or talent hiring partnerships?</p>
                <button className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors flex items-center gap-2 group">
                  Contact Partners Team <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
             </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="animate-in slide-in-from-right duration-700">
          <div className="bg-white p-8 sm:p-12 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 relative">
            {isSuccess && (
              <div className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-[2.5rem] z-20 flex flex-col items-center justify-center text-center p-8 animate-in fade-in zoom-in duration-300">
                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mb-6">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                <p className="text-slate-500 mb-8 max-w-xs">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="text-indigo-600 font-bold hover:underline"
                >
                  Send another message
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                  <input 
                    required
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter your name"
                    className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm focus:ring-4 focus:ring-indigo-600/5 transition-all outline-none text-slate-900"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                  <input 
                    required
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    placeholder="name@email.com"
                    className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm focus:ring-4 focus:ring-indigo-600/5 transition-all outline-none text-slate-900"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Subject</label>
                <select 
                  required
                  value={formData.subject}
                  onChange={e => setFormData({...formData, subject: e.target.value})}
                  className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm focus:ring-4 focus:ring-indigo-600/5 transition-all outline-none text-slate-900 appearance-none"
                >
                  <option value="">Select a reason</option>
                  <option value="Admission">Course Admission</option>
                  <option value="Placement">Career & Placement</option>
                  <option value="Corporate">Corporate Training</option>
                  <option value="Other">General Inquiry</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Your Message</label>
                <textarea 
                  required
                  rows={5}
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  placeholder="How can we help you?"
                  className="w-full bg-slate-50 border-none rounded-[2rem] p-6 text-sm focus:ring-4 focus:ring-indigo-600/5 transition-all outline-none text-slate-900 resize-none"
                />
              </div>

              <div className="pt-4">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full !py-5 !rounded-2xl !text-base group"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="animate-spin" size={20} /> Processing...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Send Message <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const ArrowRight = ({ className, size = 18 }: { className?: string, size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
  </svg>
);
