
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { User } from '../types';
import { AdminBlogs } from './AdminBlogs';
import { GoogleGenAI } from "@google/genai";
import { 
  Send, Bot, LayoutDashboard, Settings, BookOpen, Award, CreditCard, 
  LogOut, Bell, Search, ChevronRight, Zap, Target, History,
  CheckCircle2, PlayCircle, Clock, Calendar, Camera, MapPin, 
  Briefcase, Mail, Save, Loader2, ArrowLeft, User as UserIcon,
  MessageSquare, Lock
} from 'lucide-react';

interface UserProfileProps {
  onLogout: () => void;
}

type ViewType = 'dashboard' | 'chat' | 'learning' | 'certifications' | 'billing' | 'settings' | 'admin';

export const UserProfile: React.FC<UserProfileProps> = ({ onLogout }) => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const { user, updateProfile, logout } = useAuth();

  if (!user) return null;

  const handleLogout = async () => {
    await logout();
    onLogout();
  };

  return (
    <div className="flex h-[calc(100vh-80px)] bg-slate-50 overflow-hidden font-body">
      {/* Dashboard Sidebar - Internal Navigation */}
      <aside className="w-64 flex-shrink-0 bg-white border-r border-slate-200 flex flex-col z-20">
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Internal</p>
          <NavItem active={currentView === 'dashboard'} onClick={() => setCurrentView('dashboard')} icon={<LayoutDashboard size={18} />} label="Overview" />
          <NavItem active={currentView === 'chat'} onClick={() => setCurrentView('chat')} icon={<Bot size={18} />} label="AI Tutor" />
          <NavItem active={currentView === 'learning'} onClick={() => setCurrentView('learning')} icon={<BookOpen size={18} />} label="My Learning" />
          
          <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-6 mb-2">Student Records</p>
          <NavItem active={currentView === 'certifications'} onClick={() => setCurrentView('certifications')} icon={<Award size={18} />} label="Certificates" />
          <NavItem active={currentView === 'billing'} onClick={() => setCurrentView('billing')} icon={<CreditCard size={18} />} label="Billing" />
          <NavItem active={currentView === 'settings'} onClick={() => setCurrentView('settings')} icon={<Settings size={18} />} label="Edit Profile" />
          
          {user.role === 'Admin' && (
            <>
              <p className="px-4 text-[10px] font-bold text-amber-500 uppercase tracking-widest mt-6 mb-2">Admin</p>
              <NavItem active={currentView === 'admin'} onClick={() => setCurrentView('admin')} icon={<History size={18} />} label="Manage Blogs" variant="amber" />
            </>
          )}
        </nav>
        <div className="p-4 border-t border-slate-100">
           <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 rounded-xl transition-all">
              <LogOut size={18} /> Sign Out
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-slate-50/50 p-8 relative">
        <div className="max-w-5xl mx-auto">
          {renderContent(currentView, user, updateProfile, setCurrentView)}
        </div>
      </main>
    </div>
  );
};

const NavItem: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string; variant?: 'indigo' | 'amber' }> = ({ active, onClick, icon, label, variant = 'indigo' }) => {
  const activeClass = variant === 'indigo' ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100" : "bg-amber-500 text-white shadow-lg shadow-amber-100";
  const hoverClass = variant === 'indigo' ? "hover:bg-indigo-50 hover:text-indigo-600" : "hover:bg-amber-50 hover:text-amber-600";
  
  return (
    <button onClick={onClick} className={`flex items-center gap-3 w-full px-4 py-3 text-sm font-semibold rounded-xl transition-all ${active ? activeClass : `text-slate-500 ${hoverClass}`}`}>
      {icon} {label}
    </button>
  );
};

const renderContent = (view: ViewType, user: User, updateProfile: any, setView: any) => {
  switch (view) {
    case 'dashboard': return <DashboardView user={user} setView={setView} />;
    case 'chat': return <ChatView userData={user} />;
    case 'learning': return <LearningView />;
    case 'certifications': return <CertificationsView />;
    case 'billing': return <BillingView />;
    case 'settings': return <SettingsView userData={user} onUpdateProfile={updateProfile} />;
    case 'admin': return <AdminBlogs />;
    default: return <DashboardView user={user} setView={setView} />;
  }
};

const DashboardView = ({ user, setView }: any) => (
  <div className="space-y-8 animate-fade-in-down">
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Student Dashboard</h2>
        <p className="text-slate-500 mt-1">Ready for your next lesson, {user.name.split(' ')[0]}?</p>
      </div>
      <button onClick={() => setView('chat')} className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100">
        <Bot size={20} /> Ask AI Mentor
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard icon={<Zap className="text-amber-500" />} label="Total XP" value={user.xp.toString()} progress={Math.round((user.xp/user.totalXp)*100)} color="amber" />
      <StatCard icon={<Target className="text-indigo-500" />} label="Curriculum Level" value={user.level.toString()} progress={user.level * 8} color="indigo" />
      <StatCard icon={<Award className="text-emerald-500" />} label="Certificates" value="3" progress={100} color="emerald" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
         <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 tracking-tight"><BookOpen className="text-indigo-600" /> Continue Learning</h3>
            <button onClick={() => setView('learning')} className="text-sm font-bold text-indigo-600 hover:underline">View Progress</button>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CourseProgCard title="AWS Solutions Architect" instructor="Michael Chen" progress={45} img="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80" />
            <CourseProgCard title="Docker for DevOps" instructor="Sarah Johnson" progress={82} img="https://images.unsplash.com/photo-1605745341112-85968b193ef5?w=400&q=80" />
         </div>
      </div>
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
         <h3 className="text-xl font-bold text-slate-900 tracking-tight">Academic Deadlines</h3>
         <div className="space-y-4">
            <EventSmall title="Cloud Migration Project" date="Oct 24, 11:59 PM" type="Assignment" />
            <EventSmall title="Kubernetes Live Lab" date="Oct 26, 10:00 AM" type="Live Session" />
            <EventSmall title="CI/CD Pipeline Quiz" date="Oct 28, 02:00 PM" type="Test" />
         </div>
      </div>
    </div>
  </div>
);

const LearningView = () => (
  <div className="space-y-8 animate-fade-in-down">
    <div className="flex items-center justify-between">
      <h2 className="text-3xl font-bold text-slate-900 tracking-tight">My Course Tracks</h2>
      <div className="flex gap-2">
        <button className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl">In Progress</button>
        <button className="px-4 py-2 bg-slate-100 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-200">Completed</button>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <CourseTile title="Cloud Computing Fundamentals" cat="Cloud" progress={100} lessons="12/12" img="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&q=80" completed />
      <CourseTile title="Python for Data Science" cat="Data Analytics" progress={45} lessons="8/18" img="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&q=80" />
      <CourseTile title="Docker & Kubernetes Mastery" cat="DevOps" progress={65} lessons="14/22" img="https://images.unsplash.com/photo-1667372333374-9d427885f6c0?w=400&q=80" />
      <CourseTile title="Advanced Jenkins Pipelines" cat="DevOps" progress={10} lessons="1/10" img="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&q=80" />
    </div>
  </div>
);

const CertificationsView = () => (
  <div className="space-y-8 animate-fade-in-down">
    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Verified Certifications</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <CertCard title="Cloud Infrastructure Architect" id="CA-AWS-10992" date="Sept 15, 2024" img="https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&q=80" />
      <CertCard title="Professional DevOps Engineer" id="CA-DEVOPS-4421" date="Oct 01, 2024" img="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&q=80" />
    </div>
    <div className="bg-indigo-50 border border-indigo-100 p-8 rounded-3xl text-center">
       <h3 className="font-bold text-indigo-900 mb-2">Micro-credentials Earned</h3>
       <div className="flex flex-wrap justify-center gap-8 mt-6">
          <Badge icon="🚀" label="Fast Learner" />
          <Badge icon="💻" label="Code Warrior" />
          <Badge icon="☁️" label="Cloud Native" />
          <Badge icon="🧠" label="Quiz Ninja" />
       </div>
    </div>
  </div>
);

const BillingView = () => (
  <div className="space-y-8 animate-fade-in-down">
    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Subscription & Billing</h2>
    <div className="bg-indigo-600 rounded-[2rem] p-8 text-white flex flex-col md:flex-row items-center justify-between shadow-2xl shadow-indigo-100 relative overflow-hidden">
       <div className="absolute top-0 right-0 p-8">
          <CreditCard size={120} className="opacity-10 -rotate-12" />
       </div>
       <div className="relative z-10 text-center md:text-left mb-6 md:mb-0">
          <p className="text-indigo-100 uppercase tracking-widest text-[10px] font-bold mb-1">Active Plan</p>
          <h3 className="text-3xl font-bold mb-4">Premium Career Track</h3>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
             <span className="bg-white/20 px-3 py-1 rounded-lg text-xs font-medium">Next: Nov 12, 2024</span>
             <span className="bg-white/20 px-3 py-1 rounded-lg text-xs font-medium">$49.00 / Month</span>
          </div>
       </div>
       <button className="relative z-10 bg-white text-indigo-600 px-8 py-3 rounded-2xl font-bold hover:bg-indigo-50 transition-all shadow-xl">Manage Plan</button>
    </div>

    <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
      <div className="p-6 border-b border-slate-50">
         <h4 className="font-bold text-slate-900">Transaction History</h4>
      </div>
      <table className="w-full text-left">
        <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
          <tr>
            <th className="px-8 py-4">Description</th>
            <th className="px-8 py-4">Amount</th>
            <th className="px-8 py-4 text-right">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
           <BillRow desc="Subscription October 2024" date="Oct 12, 2024" amt="$49.00" status="Paid" />
           <BillRow desc="Subscription September 2024" date="Sep 12, 2024" amt="$49.00" status="Paid" />
           <BillRow desc="Career Consultation Fee" date="Aug 28, 2024" amt="$25.00" status="Paid" />
        </tbody>
      </table>
    </div>
  </div>
);

const SettingsView: React.FC<{ userData: User; onUpdateProfile: (d: Partial<User>) => Promise<void> }> = ({ userData, onUpdateProfile }) => {
  const [formData, setFormData] = useState({ ...userData });
  const [passwordData, setPasswordData] = useState({ current: '', new: '', confirm: '' });
  const [isSaving, setIsSaving] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onUpdateProfile(formData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingPassword(true);
    // In a real app, call your API here
    await new Promise(resolve => setTimeout(resolve, 1000));
    setPasswordSuccess(true);
    setPasswordData({ current: '', new: '', confirm: '' });
    setTimeout(() => setPasswordSuccess(false), 3000);
    setIsUpdatingPassword(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-down pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Profile Settings</h2>
           <p className="text-slate-500 mt-1">Update your professional profile and credentials.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-indigo-600 text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-indigo-100 disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
          {isSaving ? 'Updating...' : 'Save Changes'}
        </button>
      </div>

      {success && (
        <div className="bg-emerald-50 text-emerald-600 p-4 rounded-2xl border border-emerald-100 text-sm font-bold flex items-center gap-2 animate-in fade-in duration-300">
          <CheckCircle2 size={18} /> Your profile has been updated successfully!
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Avatar & Stats */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm text-center space-y-6">
            <div className="relative inline-block group">
              <div 
                className="size-40 rounded-[2.5rem] bg-cover bg-center shadow-2xl ring-8 ring-slate-50 transition-all duration-500 group-hover:scale-105" 
                style={{ backgroundImage: `url("${formData.avatar}")` }}
              >
                <div onClick={() => fileInputRef.current?.click()} className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem] flex flex-col items-center justify-center cursor-pointer text-white gap-2">
                  <Camera size={32} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Change Photo</span>
                </div>
              </div>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-2 -right-2 bg-indigo-600 text-white p-3 rounded-2xl shadow-xl hover:bg-indigo-700 transition-all border-4 border-white"
              >
                 <Camera size={20} />
              </button>
            </div>
            <div>
              <h3 className="font-bold text-2xl text-slate-900 leading-tight">{formData.name}</h3>
              <p className="text-indigo-600 font-bold text-sm tracking-wide uppercase mt-1">{formData.role}</p>
            </div>
            <div className="pt-6 flex justify-center gap-8 border-t border-slate-50">
               <div className="text-center">
                  <p className="text-2xl font-bold text-slate-900">{formData.level}</p>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Level</p>
               </div>
               <div className="text-center">
                  <p className="text-2xl font-bold text-slate-900">{formData.xp}</p>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">XP</p>
               </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
             <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Account Security</h4>
             <p className="text-xs text-slate-500 leading-relaxed mb-4">Ensure your account stays secure with a strong password and location verification.</p>
             <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-xs font-semibold text-slate-600">Password Health</span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg uppercase tracking-wider">Strong</span>
             </div>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Input label="Display Name" icon={<UserIcon size={16}/>} value={formData.name} onChange={v => setFormData({...formData, name: v})} placeholder="e.g. Alex Chen" />
              <Input label="Email Address" icon={<Mail size={16}/>} value={formData.email} disabled />
              <Input label="Current Role" icon={<Briefcase size={16}/>} value={formData.role} onChange={v => setFormData({...formData, role: v})} placeholder="e.g. Senior DevOps Engineer" />
              <Input label="Location" icon={<MapPin size={16}/>} value={formData.location} onChange={v => setFormData({...formData, location: v})} placeholder="e.g. San Francisco, CA" />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <MessageSquare size={14} className="text-indigo-600" /> Professional Bio
              </label>
              <textarea 
                value={formData.bio} 
                onChange={e => setFormData({...formData, bio: e.target.value})}
                rows={5}
                className="w-full bg-slate-50 border-none rounded-3xl p-5 text-sm focus:ring-4 focus:ring-indigo-600/5 transition-all outline-none text-slate-900 resize-none"
                placeholder="Share your technical background and goals..."
              />
              <p className="text-[10px] text-slate-400 text-right font-medium">Characters: {formData.bio.length} / 500</p>
            </div>
          </div>

          {/* Password Section */}
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
               <h3 className="font-bold text-xl text-slate-900 tracking-tight flex items-center gap-2">
                 <Lock size={20} className="text-indigo-600" /> Security & Password
               </h3>
               {passwordSuccess && (
                 <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 animate-pulse">
                   <CheckCircle2 size={14} /> Password Updated
                 </span>
               )}
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">Change your password regularly to keep your account safe from unauthorized access.</p>
            
            <form onSubmit={handleUpdatePassword} className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input 
                    label="Current Password" 
                    type="password"
                    icon={<Lock size={16}/>} 
                    value={passwordData.current} 
                    onChange={v => setPasswordData({...passwordData, current: v})} 
                    placeholder="••••••••" 
                  />
                  <div className="hidden md:block"></div> {/* Spacer */}
                  <Input 
                    label="New Password" 
                    type="password"
                    icon={<Lock size={16}/>} 
                    value={passwordData.new} 
                    onChange={v => setPasswordData({...passwordData, new: v})} 
                    placeholder="••••••••" 
                  />
                  <Input 
                    label="Confirm New Password" 
                    type="password"
                    icon={<Lock size={16}/>} 
                    value={passwordData.confirm} 
                    onChange={v => setPasswordData({...passwordData, confirm: v})} 
                    placeholder="••••••••" 
                  />
               </div>
               <div className="flex justify-end pt-2">
                  <button 
                    type="submit"
                    disabled={isUpdatingPassword || !passwordData.new}
                    className="bg-white border border-slate-200 text-indigo-600 px-6 py-3 rounded-2xl font-bold hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all shadow-sm flex items-center gap-2 disabled:opacity-50"
                  >
                    {isUpdatingPassword ? <Loader2 size={18} className="animate-spin" /> : <Settings size={18} />}
                    Update Password
                  </button>
               </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Helper Components ---

/**
 * A very simple Markdown-to-JSX renderer to handle AI Tutor responses
 */
const MarkdownText: React.FC<{ text: string }> = ({ text }) => {
  const lines = text.split('\n');
  return (
    <div className="space-y-4">
      {lines.map((line, idx) => {
        // Headers ###
        if (line.startsWith('### ')) {
          return <h3 key={idx} className="text-lg font-bold text-indigo-900 mt-6 mb-2">{line.replace('### ', '')}</h3>;
        }
        // Bold **text**
        const parts = line.split(/(\*\*.*?\*\*)/);
        const renderedLine = parts.map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i} className="text-indigo-700 font-bold">{part.slice(2, -2)}</strong>;
          }
          return part;
        });

        // Lists * or -
        if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
          return (
            <div key={idx} className="flex gap-3 pl-2">
              <span className="text-indigo-500 font-bold">•</span>
              <p className="flex-1">{renderedLine.join('').replace(/^[* -]\s/, '')}</p>
            </div>
          );
        }

        if (!line.trim()) return <div key={idx} className="h-1" />;

        return <p key={idx}>{renderedLine}</p>;
      })}
    </div>
  );
};

const Input = ({ label, value, onChange, disabled, icon, placeholder, type = "text" }: any) => (
  <div className="space-y-2">
    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">{icon} {label}</label>
    <input 
      type={type}
      value={value} 
      onChange={e => onChange?.(e.target.value)}
      disabled={disabled}
      placeholder={placeholder}
      className={`w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm focus:ring-4 focus:ring-indigo-600/5 transition-all outline-none text-slate-900 ${disabled ? 'opacity-50 cursor-not-allowed bg-slate-100/50' : ''}`}
    />
  </div>
);

const StatCard = ({ icon, label, value, progress, color }: any) => (
  <div className="bg-white p-7 rounded-3xl border border-slate-100 shadow-sm group hover:border-indigo-100 transition-all">
    <div className="flex items-center gap-4 mb-5">
      <div className="p-4 bg-slate-50 rounded-2xl group-hover:bg-indigo-50 transition-colors">{icon}</div>
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
        <p className="text-3xl font-bold text-slate-900 leading-none">{value}</p>
      </div>
    </div>
    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
      <div className={`h-full ${color === 'indigo' ? 'bg-indigo-600' : color === 'amber' ? 'bg-amber-500' : 'bg-emerald-500'} rounded-full transition-all duration-700`} style={{ width: `${progress}%` }}></div>
    </div>
  </div>
);

const CourseProgCard = ({ title, instructor, progress, img }: any) => (
  <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden group hover:shadow-xl hover:shadow-indigo-50/50 transition-all">
    <div className="h-32 bg-cover bg-center relative" style={{ backgroundImage: `url("${img}")` }}>
       <div className="absolute inset-0 bg-slate-900/20 group-hover:opacity-0 transition-opacity"></div>
    </div>
    <div className="p-6">
      <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors text-lg leading-tight">{title}</h4>
      <p className="text-xs text-slate-500 mt-1 mb-5">{instructor}</p>
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
          <div className="h-full bg-indigo-600 rounded-full transition-all duration-700" style={{ width: `${progress}%` }}></div>
        </div>
        <span className="text-xs font-bold text-slate-900">{progress}%</span>
      </div>
    </div>
  </div>
);

const CourseTile = ({ title, cat, progress, lessons, img, completed }: any) => (
  <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col h-full">
    <div className="h-44 bg-cover bg-center relative" style={{ backgroundImage: `url("${img}")` }}>
       {completed && <div className="absolute top-4 right-4 bg-emerald-500 text-white p-2 rounded-xl shadow-lg"><CheckCircle2 size={16}/></div>}
    </div>
    <div className="p-6 flex flex-col flex-1">
      <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-1">{cat}</p>
      <h3 className="font-bold text-slate-900 mb-6 text-lg line-clamp-2 leading-snug">{title}</h3>
      <div className="mt-auto space-y-4">
        <div className="flex justify-between text-xs font-bold">
          <span className="text-slate-400">{completed ? 'Course Completed' : 'Progress'}</span>
          <span className="text-slate-900">{progress}%</span>
        </div>
        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div className={`h-full ${completed ? 'bg-emerald-500' : 'bg-indigo-600'} rounded-full`} style={{ width: `${progress}%` }}></div>
        </div>
        <div className="flex items-center justify-between pt-2">
           <span className="text-xs text-slate-400 flex items-center gap-1.5 font-medium"><PlayCircle size={14}/> {lessons} Lessons</span>
           <button className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${completed ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100'}`}>
              {completed ? 'Review' : 'Continue'}
           </button>
        </div>
      </div>
    </div>
  </div>
);

const CertCard = ({ title, id, date, img }: any) => (
  <div className="bg-white rounded-3xl border border-slate-100 p-6 flex flex-col sm:flex-row gap-6 hover:shadow-xl transition-all group relative">
    <div className="size-24 bg-cover bg-center rounded-2xl shrink-0 shadow-xl shadow-slate-200 group-hover:scale-105 transition-transform" style={{ backgroundImage: `url("${img}")` }}></div>
    <div className="flex-1 flex flex-col justify-between">
      <div>
        <h3 className="font-bold text-slate-900 text-lg leading-tight">{title}</h3>
        <p className="text-xs text-slate-400 mt-1 flex items-center gap-1"><Clock size={12}/> Issued: {date}</p>
      </div>
      <div className="flex items-center justify-between mt-4">
         <span className="text-[10px] font-mono bg-slate-50 px-2 py-1 rounded-lg text-slate-500 border border-slate-100">VERIFY: {id}</span>
         <button className="text-indigo-600 text-sm font-bold hover:underline">Download PDF</button>
      </div>
    </div>
  </div>
);

const Badge = ({ icon, label }: any) => (
  <div className="flex flex-col items-center gap-2 group">
    <div className="size-20 bg-white rounded-[1.5rem] flex items-center justify-center text-4xl group-hover:scale-110 group-hover:-rotate-6 transition-all shadow-lg shadow-indigo-100/50">
      {icon}
    </div>
    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</span>
  </div>
);

const EventSmall = ({ title, date, type }: any) => (
  <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-all cursor-pointer group border border-transparent hover:border-slate-100">
    <div className="size-12 bg-indigo-50 text-indigo-600 rounded-xl flex flex-col items-center justify-center font-bold text-[10px] leading-none group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
       <Calendar size={20}/>
    </div>
    <div className="flex-1 min-w-0">
      <h4 className="text-sm font-bold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">{title}</h4>
      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">{type} • {date}</p>
    </div>
    <ChevronRight size={14} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
  </div>
);

const BillRow = ({ desc, date, amt, status }: any) => (
  <tr className="hover:bg-slate-50 transition-colors">
    <td className="px-8 py-5">
       <p className="text-sm font-bold text-slate-900">{desc}</p>
       <p className="text-xs text-slate-400">{date}</p>
    </td>
    <td className="px-8 py-5 text-sm text-slate-900 font-bold">{amt}</td>
    <td className="px-8 py-5 text-right">
       <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">{status}</span>
    </td>
  </tr>
);

const ChatView: React.FC<{ userData: User }> = ({ userData }) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(p => [...p, { role: 'user', text: userMsg }]);
    setIsLoading(true);
    try {
      /* Create a new GoogleGenAI instance right before making an API call */
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: { 
          systemInstruction: `You are a world-class technical mentor at CloudApex AI. Your mission is to provide high-impact, structured advice to student ${userData.name}. 
          IMPORTANT RULES:
          1. Always use clear bullet points (pointers) for key takeaways.
          2. Use bold text (**keyword**) for emphasis on important technical terms.
          3. Use structured headings (### Section Title) to separate distinct parts of your advice.
          4. Avoid long paragraphs. Aim for scannability and high information density.
          5. Keep the tone encouraging but professional.`
        },
        history: messages.map(m => ({ role: m.role, parts: [{ text: m.text }] }))
      });
      const res = await chat.sendMessage({ message: userMsg });
      setMessages(p => [...p, { role: 'model', text: res.text || "Failed to respond." }]);
    } catch {
      setMessages(p => [...p, { role: 'model', text: "Error connecting to AI." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-2xl shadow-slate-200/50">
      <header className="h-20 flex items-center justify-between px-8 bg-white border-b border-slate-100">
        <div className="flex items-center gap-4">
          <div className="size-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-100">
             <Bot size={28} />
          </div>
          <div>
             <h2 className="font-bold text-slate-900 leading-tight text-lg">AI Tutor</h2>
             <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest flex items-center gap-1.5">
                <span className="size-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span> AI Systems Online
             </p>
          </div>
        </div>
        <button onClick={() => setMessages([])} className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors">Reset Session</button>
      </header>
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
            <div className="size-24 bg-indigo-50 rounded-[3rem] flex items-center justify-center text-indigo-600 shadow-inner">
               <Bot size={48} />
            </div>
            <div className="max-w-xs space-y-2">
               <h3 className="font-bold text-xl text-slate-900">Hello, {userData.name}!</h3>
               <p className="text-slate-500 text-sm leading-relaxed">I'm your dedicated tech mentor. Ask me anything about Cloud, DevOps, or Data Science!</p>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
               {['Cloud vs DevOps?', 'AWS roadmap?', 'Career advice?'].map(q => (
                 <button key={q} onClick={() => setInput(q)} className="px-4 py-2 bg-white border border-slate-100 rounded-xl text-xs font-bold text-slate-600 hover:border-indigo-600 hover:text-indigo-600 transition-all shadow-sm">{q}</button>
               ))}
            </div>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}>
            <div className={`max-w-[85%] p-6 rounded-[2rem] text-sm leading-relaxed shadow-sm ${m.role === 'user' ? 'bg-indigo-600 text-white shadow-indigo-100 rounded-tr-none' : 'bg-white border border-slate-100 text-slate-800 rounded-tl-none'}`}>
              {m.role === 'model' ? <MarkdownText text={m.text} /> : m.text}
            </div>
          </div>
        ))}
        {isLoading && <div className="flex justify-start"><div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm animate-pulse text-xs font-bold text-slate-400 flex items-center gap-2"><Loader2 size={16} className="animate-spin text-indigo-600" /> Mentor is analyzing...</div></div>}
      </div>
      <div className="p-8 bg-white border-t border-slate-100">
        <form onSubmit={handleSend} className="flex gap-4 max-w-4xl mx-auto">
          <input 
            value={input} 
            onChange={e => setInput(e.target.value)} 
            placeholder="Describe your technical query..." 
            className="flex-1 bg-slate-50 border-none rounded-2xl px-6 py-5 text-sm focus:ring-4 focus:ring-indigo-600/5 shadow-inner outline-none" 
          />
          <button type="submit" disabled={isLoading || !input.trim()} className="bg-indigo-600 text-white p-5 rounded-2xl shadow-xl hover:bg-indigo-700 transition-all disabled:opacity-50 group">
            <Send size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </form>
      </div>
    </div>
  );
};
