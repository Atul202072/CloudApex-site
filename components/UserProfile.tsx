import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { User } from '../types';

interface UserProfileProps {
  onLogout: () => void;
}

type ViewType = 'home' | 'dashboard' | 'chat' | 'courses' | 'community' | 'resources' | 'learning' | 'certifications' | 'billing' | 'settings';

export const UserProfile: React.FC<UserProfileProps> = ({ onLogout }) => {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const { user, updateProfile, logout } = useAuth();

  if (!user) return null;

  const handleLogout = async () => {
    await logout();
    onLogout();
  };

  if (currentView === 'chat') {
    return <ChatView onNavigate={setCurrentView} onLogout={handleLogout} userData={user} />;
  }

  return (
    <MainLayout 
      currentView={currentView} 
      onNavigate={setCurrentView} 
      onLogout={handleLogout} 
      userData={user}
      onUpdateProfile={updateProfile}
    />
  );
};

// --- Main Layout Component ---
const MainLayout: React.FC<{ 
  currentView: ViewType; 
  onNavigate: (view: ViewType) => void; 
  onLogout: () => void;
  userData: User;
  onUpdateProfile: (data: Partial<User>) => void;
}> = ({ currentView, onNavigate, onLogout, userData, onUpdateProfile }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (currentView) {
      case 'home': return <HomeContent onNavigate={onNavigate} userData={userData} />;
      case 'dashboard': return <DashboardContent onNavigate={onNavigate} userData={userData} />;
      case 'courses': return <CoursesDemo />;
      case 'community': return <CommunityDemo />;
      case 'resources': return <ResourcesDemo />;
      case 'learning': return <MyLearningDemo />;
      case 'certifications': return <CertificationsDemo />;
      case 'billing': return <BillingDemo />;
      case 'settings': return <SettingsDemo userData={userData} onUpdateProfile={onUpdateProfile} />;
      default: return <HomeContent onNavigate={onNavigate} userData={userData} />;
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white overflow-x-hidden min-h-screen flex flex-col font-body transition-colors duration-300">
      {/* Top Navigation */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 lg:px-10 py-3 sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4 text-slate-900 dark:text-white cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="size-8 text-indigo-600">
              <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" fill="currentColor"></path>
              </svg>
            </div>
            <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] hidden sm:block">CloudApex Academy</h2>
          </div>
          <div className="hidden md:flex items-center gap-9">
            <button onClick={() => onNavigate('home')} className={`text-sm font-medium leading-normal transition-colors ${currentView === 'home' ? 'text-indigo-600' : 'text-slate-900 dark:text-white hover:text-indigo-600'}`}>Browse</button>
            <button onClick={() => onNavigate('courses')} className={`text-sm font-medium leading-normal transition-colors ${currentView === 'courses' ? 'text-indigo-600' : 'text-slate-900 dark:text-white hover:text-indigo-600'}`}>Paths</button>
            <button onClick={() => onNavigate('community')} className={`text-sm font-medium leading-normal transition-colors ${currentView === 'community' ? 'text-indigo-600' : 'text-slate-900 dark:text-white hover:text-indigo-600'}`}>Community</button>
            <button onClick={() => onNavigate('learning')} className={`text-sm font-medium leading-normal transition-colors ${currentView === 'learning' ? 'text-indigo-600' : 'text-slate-900 dark:text-white hover:text-indigo-600'}`}>My Learning</button>
          </div>
        </div>
        <div className="flex flex-1 justify-end gap-6 items-center">
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 mr-2 bg-indigo-600/10 px-3 py-1.5 rounded-full border border-indigo-600/20">
               <span className="material-symbols-outlined text-indigo-600 text-[18px]">local_fire_department</span>
               <span className="text-xs font-bold text-indigo-600">12 Day Streak</span>
            </div>
            <button className="flex items-center justify-center size-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <div className="relative" onMouseEnter={() => setIsProfileMenuOpen(true)} onMouseLeave={() => setIsProfileMenuOpen(false)}>
              <button onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-slate-200 dark:border-slate-700 cursor-pointer focus:outline-none transition-all duration-300 hover:ring-4 hover:ring-indigo-600/20" style={{ backgroundImage: `url("${userData.avatar}")` }}></button>
              {isProfileMenuOpen && (
                <div className="absolute right-0 top-full pt-2 w-56 z-50 animate-fade-in-down origin-top-right">
                  <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 py-2">
                    <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{userData.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{userData.email}</p>
                    </div>
                    <div className="py-1">
                      <button onClick={() => { setIsProfileMenuOpen(false); onNavigate('home'); }} className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600">
                         <span className="material-symbols-outlined text-[20px]">home</span>Home
                      </button>
                      <button onClick={() => { setIsProfileMenuOpen(false); onNavigate('dashboard'); }} className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600 transition-colors">
                         <span className="material-symbols-outlined text-[20px]">dashboard</span>Dashboard
                      </button>
                      <button onClick={() => { setIsProfileMenuOpen(false); onNavigate('chat'); }} className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600 transition-colors">
                         <span className="material-symbols-outlined text-[20px]">chat</span>Messages
                      </button>
                      <button onClick={() => { setIsProfileMenuOpen(false); onNavigate('settings'); }} className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600 transition-colors">
                         <span className="material-symbols-outlined text-[20px]">settings</span>Settings
                      </button>
                    </div>
                    <div className="border-t border-slate-200 dark:border-slate-700 mt-1 pt-1">
                      <button onClick={onLogout} className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
                         <span className="material-symbols-outlined text-[20px]">logout</span>Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1 h-full max-w-[1440px] w-full mx-auto">
        <aside className="hidden lg:flex w-72 flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sticky top-[73px] h-[calc(100vh-73px)] overflow-y-auto">
          <div className="flex flex-col gap-6">
            <div className="flex gap-3 items-center pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12" style={{ backgroundImage: `url("${userData.avatar}")` }}></div>
              <div className="flex flex-col">
                <h1 className="text-slate-900 dark:text-white text-base font-bold font-display leading-tight">{userData.name}</h1>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-normal">Level {userData.level} {userData.role}</p>
              </div>
            </div>
            <nav className="flex flex-col gap-2">
              <button onClick={() => onNavigate('home')} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg group transition-all w-full text-left ${currentView === 'home' ? 'bg-indigo-600/10 text-indigo-600' : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                <span className={`material-symbols-outlined ${currentView === 'home' ? '' : 'text-slate-500 dark:text-slate-400 group-hover:text-indigo-600'}`}>home</span>
                <p className="text-sm font-medium">Home</p>
              </button>
              <button onClick={() => onNavigate('dashboard')} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg group transition-all w-full text-left ${currentView === 'dashboard' ? 'bg-indigo-600/10 text-indigo-600' : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                <span className={`material-symbols-outlined ${currentView === 'dashboard' ? '' : 'text-slate-500 dark:text-slate-400 group-hover:text-indigo-600'}`}>dashboard</span>
                <p className="text-sm font-medium">Overview</p>
              </button>
              <button onClick={() => onNavigate('learning')} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg group transition-all w-full text-left ${currentView === 'learning' ? 'bg-indigo-600/10 text-indigo-600' : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                <span className={`material-symbols-outlined ${currentView === 'learning' ? '' : 'text-slate-500 dark:text-slate-400 group-hover:text-indigo-600'}`}>menu_book</span>
                <p className="text-sm font-medium">My Learning</p>
              </button>
              <button onClick={() => onNavigate('certifications')} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg group transition-all w-full text-left ${currentView === 'certifications' ? 'bg-indigo-600/10 text-indigo-600' : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                <span className={`material-symbols-outlined ${currentView === 'certifications' ? '' : 'text-slate-500 dark:text-slate-400 group-hover:text-indigo-600'}`}>verified</span>
                <p className="text-sm font-medium">Certifications</p>
              </button>
              <button onClick={() => onNavigate('billing')} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg group transition-all w-full text-left ${currentView === 'billing' ? 'bg-indigo-600/10 text-indigo-600' : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                <span className={`material-symbols-outlined ${currentView === 'billing' ? '' : 'text-slate-500 dark:text-slate-400 group-hover:text-indigo-600'}`}>credit_card</span>
                <p className="text-sm font-medium">Billing</p>
              </button>
              <button onClick={() => onNavigate('chat')} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg group transition-all w-full text-left ${currentView === 'chat' ? 'bg-indigo-600/10 text-indigo-600' : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                <span className={`material-symbols-outlined ${currentView === 'chat' ? '' : 'text-slate-500 dark:text-slate-400 group-hover:text-indigo-600'}`}>chat</span>
                <p className="text-sm font-medium">Messages</p>
              </button>
              <button onClick={() => onNavigate('settings')} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg group transition-all w-full text-left ${currentView === 'settings' ? 'bg-indigo-600/10 text-indigo-600' : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                <span className={`material-symbols-outlined ${currentView === 'settings' ? '' : 'text-slate-500 dark:text-slate-400 group-hover:text-indigo-600'}`}>settings</span>
                <p className="text-sm font-medium">Settings</p>
              </button>
            </nav>
            <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
              <button onClick={onLogout} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all w-full text-left text-slate-500">
                <span className="material-symbols-outlined text-[20px]">logout</span>
                <p className="text-sm font-medium">Log Out</p>
              </button>
            </div>
          </div>
        </aside>
        <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">{renderContent()}</main>
      </div>
    </div>
  );
};

// --- HOME CONTENT (Provided Design) ---
const HomeContent: React.FC<{ onNavigate: (view: ViewType) => void; userData: User }> = ({ onNavigate, userData }) => (
  <div className="w-full flex flex-col items-center px-4 md:px-10 pb-20 font-display animate-fade-in-down">
    <div className="w-full max-w-[1200px] flex flex-col gap-10">
      <section className="mt-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8 px-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-slate-900 dark:text-white tracking-tight text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">Welcome back, {userData.name.split(' ')[0]}</h1>
            <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg font-normal leading-normal">Ready to conquer Kubernetes today?</p>
          </div>
          <button onClick={() => onNavigate('dashboard')} className="flex items-center justify-center rounded-lg h-10 px-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-sm font-bold transition-colors shadow-sm">View Profile</button>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none text-indigo-600"><svg height="100%" preserveAspectRatio="none" viewBox="0 0 100 100" width="100%"><path d="M0 100 L100 0 L100 100 Z" fill="currentColor"></path></svg></div>
           <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 w-full">
                 <div className="flex items-center gap-3 mb-4">
                    <span className="bg-indigo-600/10 text-indigo-600 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">In Progress</span>
                    <span className="text-slate-500 dark:text-slate-400 text-xs flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">schedule</span> 2h 15m remaining</span>
                 </div>
                 <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">Docker for Beginners</h3>
                 <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-xl">Master the fundamentals of containerization. Build, ship, and run any app, anywhere.</p>
                 <div className="flex flex-col gap-2 mb-6 max-w-md">
                    <div className="flex justify-between text-sm mb-1"><span className="text-slate-900 dark:text-white font-medium">Progress</span><span className="text-indigo-600 font-bold">65%</span></div>
                    <div className="rounded-full bg-slate-100 dark:bg-slate-700 h-2.5 w-full overflow-hidden"><div className="h-full bg-indigo-600 rounded-full transition-all duration-500 ease-out shadow-glow" style={{ width: '65%' }}></div></div>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Up Next: <span className="text-slate-900 dark:text-white font-medium">Container Orchestration</span></p>
                 </div>
                 <div className="flex gap-3">
                    <button onClick={() => onNavigate('learning')} className="flex items-center justify-center rounded-lg h-11 px-6 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold transition-colors shadow-lg">Resume Learning</button>
                 </div>
              </div>
              <div className="hidden md:block w-1/3 aspect-video rounded-xl bg-slate-100 dark:bg-slate-700 overflow-hidden border border-slate-200 dark:border-slate-600 relative">
                 <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Docker" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXGXq_8pLiPBlpKrANYzpo2LnvCqQGdSZT7aF8Mm_8QO_y8Kf2TkT7XSG3LMVp6r7VYULCZBDMplQWdFjjtvtU_R1m11qyFJ9g8mQ5EAcbuCe9iveYEogcnwizivQobaeEgpVAVFlwxf3A6v8LD8m2Chu1JFSzAFdAm6CwWQyezWXTcfNRSJu_nelRiJfPFqL8rS-Ie2JidZoqRx0Vtpdufy7bBBtdhHhxdNcMuDNanUTrg-UzvskjNlzNUPYF_FjERMKXtBceCpB6"/>
                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
                 <div className="absolute bottom-3 left-3 bg-white/90 px-2 py-1 rounded text-xs font-mono text-indigo-600">Module 4/12</div>
              </div>
           </div>
        </div>
      </section>
      <section className="overflow-x-auto hide-scroll pb-2">
         <div className="flex gap-3 min-w-max px-1">
            {['AWS', 'Azure', 'Google Cloud', 'Kubernetes', 'Python', 'Linux', 'Terraform'].map((tech) => (
                <button key={tech} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 text-sm font-medium hover:text-indigo-600 transition-colors">
                    {tech}
                </button>
            ))}
         </div>
      </section>
      <section>
         <div className="flex items-center justify-between px-4 mb-6"><h2 className="text-slate-900 dark:text-white text-2xl font-bold">Featured Paths</h2></div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <PathCard title="AWS Certified Solutions Architect" desc="Pass SAA-C03 exam. Covers VPC, EC2, S3, RDS." tag="CAREER PATH" />
            <PathCard title="DevSecOps Engineering" desc="Integrate security into CI/CD. SonarQube, Vault." tag="SKILL PATH" color="bg-purple-500" />
            <PathCard title="Kubernetes Administrator (CKA)" desc="Master clusters, networking, and troubleshooting." tag="CERTIFICATION" color="bg-green-500" />
         </div>
      </section>
    </div>
  </div>
);

const PathCard = ({ title, desc, tag, color = "bg-indigo-600" }: any) => (
  <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 group cursor-pointer flex flex-col h-full shadow-sm overflow-hidden">
     <div className="h-40 w-full bg-slate-100 dark:bg-slate-700 relative">
        <div className={`absolute top-3 left-3 ${color} text-white text-xs font-bold px-2 py-1 rounded shadow-sm`}>{tag}</div>
     </div>
     <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 transition-colors">{title}</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-2">{desc}</p>
     </div>
  </div>
);

// --- DASHBOARD CONTENT (Restored to detailed version) ---
const DashboardContent: React.FC<{ onNavigate: (view: ViewType) => void; userData: User }> = ({ onNavigate, userData }) => (
  <div className="p-6 md:p-10 w-full max-w-[1000px] mx-auto flex flex-col gap-8 animate-fade-in-down">
    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
      <div className="flex gap-6 items-center">
        <div className="relative">
          <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-24 w-24 md:h-32 md:w-32 shadow-lg ring-4 ring-white dark:ring-slate-800" style={{ backgroundImage: `url("${userData.avatar}")` }}></div>
          <div className="absolute bottom-1 right-1 bg-green-500 border-4 border-white dark:border-slate-800 w-6 h-6 rounded-full" title="Online"></div>
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-slate-900 dark:text-white text-3xl font-bold font-display leading-tight">{userData.name}</h1>
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 flex-wrap">
            <span className="material-symbols-outlined text-[18px]">work</span>
            <span className="text-sm">{userData.role}</span>
            <span className="mx-1">•</span>
            <span className="material-symbols-outlined text-[18px]">location_on</span>
            <span className="text-sm">{userData.location}</span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 italic">{userData.bio}</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="px-2 py-0.5 rounded bg-indigo-600/10 text-indigo-600 text-xs font-bold uppercase tracking-wider">Level {userData.level}</div>
            <span className="text-slate-400 text-xs font-medium">{userData.xp} XP / {userData.totalXp} XP</span>
          </div>
        </div>
      </div>
      <button onClick={() => onNavigate('settings')} className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-600 hover:text-indigo-600 dark:hover:border-indigo-600 dark:hover:text-indigo-600 transition-all shadow-sm text-slate-900 dark:text-white text-sm font-bold tracking-[0.015em] shrink-0">
        <span className="material-symbols-outlined text-[18px]">edit</span>
        <span>Edit Profile</span>
      </button>
    </div>
    
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        { icon: 'schedule', value: '120', label: 'Hours Learned', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
        { icon: 'check_circle', value: '15', label: 'Courses Completed', color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20' },
        { icon: 'workspace_premium', value: '8', label: 'Certifications', color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
        { icon: 'local_fire_department', value: '24', label: 'Day Streak', color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/20' }
      ].map((stat, i) => (
        <div key={i} className="flex flex-col gap-1 rounded-xl bg-white dark:bg-slate-800 p-5 shadow-sm border border-slate-100 dark:border-slate-700/50">
          <div className={`size-10 rounded-lg ${stat.bg} flex items-center justify-center ${stat.color} mb-2`}>
            <span className="material-symbols-outlined">{stat.icon}</span>
          </div>
          <p className="text-slate-900 dark:text-white font-display text-2xl font-bold leading-tight">{stat.value}</p>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-normal">{stat.label}</p>
        </div>
      ))}
    </div>

    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight">In Progress</h2>
        <button onClick={() => onNavigate('learning')} className="text-indigo-600 text-sm font-semibold hover:underline">View All</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="group flex flex-col bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
          <div className="h-40 bg-cover bg-center relative" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBpAq_6UdO_M10s78FGfyQXCL73gD5OCeTji82V2fbkp-m4Ld5g-knIY82OnjEGoKqlzi9yL8um1amRZZqzrIO7qfOG_ctlKThncCHsQc5u1-e3EIyaDk88ejcHKF6Rm-CB2vSJPnQ63IJpqUSFhS2OsSonHK-IDFtYQd05eugfAKQ9HG_DJW7zb0dnf3ialedcMZMpbnNWebGGCcoKYjs7TFTdvl1kCnb3Juo3ncNWFSYU4ABdZAn-Jr6dVwrZb623CJhOdfAxHuY6")' }}>
            <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors"></div>
            <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 px-2 py-1 rounded text-xs font-bold text-slate-900 dark:text-white backdrop-blur-sm">CLOUD</div>
          </div>
          <div className="p-5 flex flex-col gap-4 flex-1">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display mb-1 line-clamp-1">AWS Solutions Architect Associate</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">Master the art of designing and deploying scalable systems on AWS.</p>
            </div>
            <div className="mt-auto flex flex-col gap-2">
              <div className="flex justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
                <span>65% Complete</span>
                <span>2h remaining</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2">
                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <button onClick={() => onNavigate('learning')} className="mt-2 w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-bold transition-colors">Resume Course</button>
            </div>
          </div>
        </div>
        <div className="group flex flex-col bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
          <div className="h-40 bg-cover bg-center relative" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAsSWXr_0JUf-XulykkTx8HELSZEyNvvbhWUQ3h-PTLU7QJSFlC2Bn7Pn-5NkImjbqzsAXDkajzx04e9swIdjvOb3TgTUP_xlblYDgDenheCbVA-dt-suGSLCDLFRKSHqULrEEzDUCGhPQJWmtRQgflJog4R05hYiuu-RaLWmbNt794qkFcC7lVWSKp0pgWHvA9BBlEgHdKNPvJ1-vbACeemtPUWH5GihIOH3oqN3eUI849sg8XlJe5ZJTRq934ddEbyX_uNBGi_AE1")' }}>
            <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors"></div>
            <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 px-2 py-1 rounded text-xs font-bold text-slate-900 dark:text-white backdrop-blur-sm">DEVOPS</div>
          </div>
          <div className="p-5 flex flex-col gap-4 flex-1">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display mb-1 line-clamp-1">Docker Mastery: From Zero to Hero</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">Build, ship, and run any app, anywhere with containers.</p>
            </div>
            <div className="mt-auto flex flex-col gap-2">
              <div className="flex justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
                <span>32% Complete</span>
                <span>5h remaining</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2">
                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '32%' }}></div>
              </div>
              <button onClick={() => onNavigate('learning')} className="mt-2 w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-bold transition-colors">Resume Course</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div className="flex flex-col gap-4 mb-10">
      <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight">Certifications & Badges</h2>
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-6">
        <div className="flex flex-wrap gap-8 justify-center md:justify-start">
          {[
            { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCigFLjDSU1SQ5TpaZXA1rTylQDE3G3mgjEvurbDpVv55O5LccbVr-g1bDsT2VBP-eP2o48cSijJotKWfGdK2G0ip9ojB5URf_w7qoyCOnyBxKC_zqm_pX2S8W0D7r_NppUmbmD85VYMqRl3YNlaTbu7Yov1U8F7OIFgFPaSDuSAbk0woamFZO3bCGNP67eSPNyr4b0TfpVxECGC5NBDRvqo_Ncm_-VHCtUt9hwOld4tID2laCqXpRf5JEct07D_d8rkQyHEs5BWppj', title: 'Python Basics', date: 'Oct 2023' },
            { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXeFjdLebUZOHCelbVlspzQ1psjN9NYnReRXzj4JXjeDSH-WnIF1KE-3AjdqaU1AIksdc-suZLeKx74MEwvl7mVHeHEhubh6riHu816P98_qIakylYugJqaNIXNoULj0YIrlaDNTEGXVl-Cc2VcMSgnDwe7-9uofW-u6nwiuBOHfdHXTs36w2EhXgUkU-qe5XE_v5lbjYETmmASL78kTLJvvTVF7vySwX6KIMSAZMnqqBxH3GqErt86jtOOjg40-FhGTeWiMu9MTsp', title: 'Node.js API', date: 'Sep 2023' },
            { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-UyHr2kNVoL6N7DVoLYc4gRpbYdslQF4BGT6mBe6n5o_2Sxtznd7TWRxK1BH51UnCh77ecv-Ev0Zd27jlhIzZc12z9UqLzBhxAe4OCj8GPBnGBGSehEv-vxo758_XEtqN0erlPTRZgdt18tFF7JCP14p8Yzadt1RXHAVP9uSjZqRk6RHBGVHNAPITMi9gxxjaVq_djRhp0_bNXHu-u9P4ZXFOMDsTO4VIZKsofOEDa_LtbkbvJK1g96UyUhGu2KtVs2oFIF020Ye7', title: 'C++ Core', date: 'Aug 2023' }
          ].map((badge, i) => (
            <div key={i} className="flex flex-col items-center gap-3 w-32 group cursor-pointer">
              <div className="size-24 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4 border border-slate-200 dark:border-slate-700 group-hover:border-indigo-600 transition-colors">
                <img alt={`${badge.title} badge`} className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity" src={badge.img}/>
              </div>
              <div className="text-center">
                <p className="font-bold text-sm text-slate-900 dark:text-white">{badge.title}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{badge.date}</p>
              </div>
            </div>
          ))}
          <div className="flex flex-col items-center justify-center gap-3 w-32 group cursor-pointer border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-4 hover:border-slate-400 transition-colors">
            <span className="material-symbols-outlined text-slate-400 text-3xl">add</span>
            <p className="text-xs text-center text-slate-500 font-medium">Add External Cert</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// --- MY LEARNING ---
const MyLearningDemo: React.FC = () => {
  const [expandedCourseId, setExpandedCourseId] = useState<number | null>(1);
  const [openModuleIndices, setOpenModuleIndices] = useState<Record<number, number | null>>({});

  const myCourses = [
    { 
      id: 1,
      title: 'AWS Solutions Architect', 
      progress: 65, 
      color: 'bg-indigo-600',
      lastAccessed: '2 days ago',
      modules: [
        { title: 'Introduction to Cloud Computing', topics: ['Cloud Service Models', 'AWS Global Infrastructure', 'IAM Basics'] },
        { title: 'EC2 & Virtualization', topics: ['Instance Types', 'Security Groups', 'Elastic IP', 'Launch Templates'] },
        { title: 'Storage Solutions', topics: ['S3 Buckets', 'EBS Volumes', 'EFS', 'Storage Gateway'] }
      ]
    },
    { 
      id: 2,
      title: 'Docker Mastery', 
      progress: 32, 
      color: 'bg-orange-500',
      lastAccessed: '5 hours ago',
      modules: [
        { title: 'Docker Fundamentals', topics: ['Images vs Containers', 'Docker CLI', 'Docker Hub'] },
        { title: 'Docker Compose', topics: ['YAML Syntax', 'Multi-container Apps', 'Networking'] }
      ]
    }
  ];

  const toggleCourse = (id: number) => {
    setExpandedCourseId(expandedCourseId === id ? null : id);
  };

  const toggleModule = (courseId: number, moduleIndex: number) => {
    setOpenModuleIndices(prev => ({
      ...prev,
      [courseId]: prev[courseId] === moduleIndex ? null : moduleIndex
    }));
  };

  return (
    <div className="p-10 max-w-4xl mx-auto animate-fade-in-down">
       <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">My Learning</h1>
       <div className="space-y-6">
         {myCourses.map((course) => (
           <div key={course.id} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden transition-all duration-300">
              <div className="p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50" onClick={() => toggleCourse(course.id)}>
                <div className="flex justify-between items-center mb-4">
                   <div>
                     <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                       {course.title}
                       <span className="material-symbols-outlined text-slate-400">{expandedCourseId === course.id ? 'expand_less' : 'expand_more'}</span>
                     </h3>
                     <p className="text-sm text-slate-500 dark:text-slate-400">Last accessed: {course.lastAccessed}</p>
                   </div>
                   <button className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-white text-sm font-bold rounded-lg">Continue</button>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                   <div className={`h-full ${course.color}`} style={{ width: `${course.progress}%` }}></div>
                </div>
                <p className="text-xs text-slate-500 mt-2 text-right">{course.progress}% Complete</p>
              </div>

              {expandedCourseId === course.id && (
                <div className="border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-6">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Course Syllabus</h4>
                  <div className="space-y-3">
                    {course.modules.map((module, mIndex) => (
                      <div key={mIndex} className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                        <button onClick={() => toggleModule(course.id, mIndex)} className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-700/50">
                          <span className="font-medium text-slate-700 dark:text-slate-200 text-sm">Module {mIndex + 1}: {module.title}</span>
                          <span className="material-symbols-outlined text-slate-400 text-[20px]">{openModuleIndices[course.id] === mIndex ? 'remove' : 'add'}</span>
                        </button>
                        {openModuleIndices[course.id] === mIndex && (
                           <ul className="p-4 pt-0 pl-8 space-y-2">
                             {module.topics.map((topic, tIndex) => (
                               <li key={tIndex} className="text-sm text-slate-500 dark:text-slate-400 list-disc ml-4">{topic}</li>
                             ))}
                           </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
           </div>
         ))}
       </div>
    </div>
  );
};

// --- CHAT VIEW (Restored detailed version) ---
const ChatView: React.FC<{ onNavigate: (view: ViewType) => void; onLogout: () => void; userData: User }> = ({ onNavigate, onLogout, userData }) => {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-text-main dark:text-white h-screen flex flex-col overflow-hidden transition-colors duration-200">
      <header className="flex items-center justify-between border-b border-solid border-border-light dark:border-border-dark px-6 py-3 bg-white dark:bg-sidebar-dark z-20 shrink-0">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4 text-text-main dark:text-white cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="size-8 text-indigo-600">
              <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z" fill="currentColor"></path>
              </svg>
            </div>
            <h2 className="text-xl font-bold leading-tight">CloudApex Academy</h2>
          </div>
        </div>
        <div className="flex flex-1 justify-end gap-6 items-center">
          <div className="relative">
             <button className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-slate-200 dark:border-slate-700" style={{ backgroundImage: `url("${userData.avatar}")` }} onClick={() => onNavigate('settings')}></button>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden md:flex flex-col w-64 bg-sidebar-light dark:bg-sidebar-dark border-r border-border-light dark:border-border-dark shrink-0">
          <div className="p-4"><button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"><span>Compose</span></button></div>
          <div className="flex-1 overflow-y-auto px-3 py-2 space-y-6">
            <div className="flex flex-col gap-1">
              <h3 className="px-3 text-xs font-bold text-slate-500 uppercase mb-2">Inbox</h3>
              <a className="flex items-center gap-3 px-3 py-2 rounded-lg bg-indigo-600/10 text-indigo-600 font-medium" href="#"><span className="material-symbols-outlined text-[22px]">inbox</span>All Messages</a>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="px-3 text-xs font-bold text-slate-500 uppercase mb-2">Channels</h3>
              <a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-background-light dark:hover:bg-background-dark text-slate-600 dark:text-gray-300" href="#"><span className="material-symbols-outlined text-[20px]">tag</span>aws-fundamentals</a>
              <a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-background-light dark:hover:bg-background-dark text-slate-600 dark:text-gray-300" href="#"><span className="material-symbols-outlined text-[20px]">tag</span>kubernetes-deep-dive</a>
            </div>
          </div>
        </aside>

        <div className="flex flex-col w-full md:w-96 bg-white dark:bg-background-dark border-r border-border-light dark:border-border-dark shrink-0">
          <div className="p-4 border-b border-border-light dark:border-border-dark bg-white dark:bg-background-dark">
            <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Inbox</h1>
            <div className="relative mb-4"><span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span><input className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg py-2.5 pl-10 pr-4 text-sm" placeholder="Filter messages..."/></div>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="flex gap-3 p-4 cursor-pointer bg-indigo-600/5 dark:bg-indigo-600/10 border-l-4 border-indigo-600">
              <div className="shrink-0"><div className="bg-center bg-cover rounded-full size-12" style={{ backgroundImage: 'url("https://i.pravatar.cc/150?img=32")' }}></div></div>
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1"><h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">Sarah Jenkins</h4><span className="text-xs text-indigo-600 font-medium">2m</span></div>
                <p className="text-xs font-medium text-slate-800 dark:text-gray-300 mb-1">Re: Help with Kubernetes Pod...</p>
                <p className="text-xs text-slate-500 truncate">Here is the YAML config you asked for. Let me know if...</p>
              </div>
            </div>
          </div>
        </div>
        
        <main className="flex flex-col flex-1 bg-background-light dark:bg-background-dark min-w-0">
          <div className="h-16 px-6 border-b border-border-light dark:border-border-dark flex items-center justify-between bg-white dark:bg-sidebar-dark shrink-0">
            <div className="flex items-center gap-3">
              <div className="bg-center bg-cover rounded-full size-10" style={{ backgroundImage: 'url("https://i.pravatar.cc/150?img=32")' }}></div>
              <div><h2 className="font-bold text-slate-900 dark:text-white leading-tight">Sarah Jenkins</h2><span className="text-xs text-green-500 font-medium">Online • Instructor</span></div>
            </div>
            <div className="flex items-center gap-4 text-slate-400"><span className="material-symbols-outlined cursor-pointer">search</span><span className="material-symbols-outlined cursor-pointer">more_vert</span></div>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="flex gap-4 max-w-3xl">
              <div className="shrink-0"><div className="bg-center bg-cover rounded-full size-10" style={{ backgroundImage: 'url("https://i.pravatar.cc/150?img=32")' }}></div></div>
              <div className="flex flex-col gap-1">
                <div className="flex items-baseline gap-2"><span className="font-bold text-sm text-slate-900 dark:text-white">Sarah Jenkins</span><span className="text-xs text-slate-400">9:41 AM</span></div>
                <div className="p-4 bg-white dark:bg-slate-800 rounded-xl rounded-tl-none shadow-sm border border-slate-200 dark:border-slate-700 text-sm leading-relaxed text-slate-700 dark:text-gray-200">
                  <p>Hi! I saw your question about the pod crash loop. Can you share the deployment config you're using? It's likely a misconfiguration in the liveness probe.</p>
                </div>
              </div>
            </div>
            <div className="flex flex-row-reverse gap-4 max-w-3xl ml-auto">
              <div className="shrink-0"><div className="bg-center bg-cover rounded-full size-10" style={{ backgroundImage: `url("${userData.avatar}")` }}></div></div>
              <div className="flex flex-col gap-1 items-end">
                <div className="flex items-baseline gap-2"><span className="text-xs text-slate-400">9:45 AM</span><span className="font-bold text-sm text-slate-900 dark:text-white">You</span></div>
                <div className="p-4 bg-indigo-600 text-white rounded-xl rounded-tr-none shadow-sm text-sm leading-relaxed">
                  <p>Hey Sarah, thanks for getting back to me quickly! Here is the YAML file I'm trying to apply:</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 bg-white dark:bg-sidebar-dark border-t border-border-light dark:border-border-dark shrink-0">
            <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus-within:ring-1 focus-within:ring-indigo-600">
              <textarea className="w-full bg-transparent border-none p-0 focus:ring-0 text-sm resize-none focus:outline-none dark:text-white" placeholder="Reply to Sarah..." rows={1}></textarea>
              <button className="p-2 rounded-lg bg-indigo-600 text-white shadow-md transition-colors"><span className="material-symbols-outlined text-[20px]">send</span></button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// --- CERTIFICATIONS (Restored detailed version) ---
const CertificationsDemo: React.FC = () => (
  <div className="p-10 max-w-5xl mx-auto animate-fade-in-down">
    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">My Certifications</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[1, 2].map((i) => (
        <div key={i} className="bg-white dark:bg-slate-800 p-8 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col items-center text-center relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4"><span className="material-symbols-outlined text-slate-300 text-6xl opacity-20">workspace_premium</span></div>
           <div className="size-24 bg-indigo-600/10 rounded-full flex items-center justify-center text-indigo-600 mb-4"><span className="material-symbols-outlined text-4xl">verified</span></div>
           <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-2">Cloud Architecture Professional</h3>
           <p className="text-sm text-slate-500 mb-6">Issued on Oct 12, 2023 • Expires Oct 12, 2026</p>
           <button className="text-indigo-600 font-bold text-sm hover:underline flex items-center gap-1">Download Certificate <span className="material-symbols-outlined text-sm">download</span></button>
        </div>
      ))}
    </div>
  </div>
);

// --- BILLING (Restored detailed version) ---
const BillingDemo: React.FC = () => (
  <div className="p-10 max-w-4xl mx-auto animate-fade-in-down">
    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Billing & Plans</h1>
    <div className="bg-white dark:bg-slate-800 p-8 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm mb-8">
       <div className="flex justify-between items-start mb-6">
          <div><p className="text-sm text-slate-500 uppercase font-bold mb-1">Current Plan</p><h2 className="text-2xl font-bold text-slate-900 dark:text-white">Pro Annual</h2><p className="text-sm text-slate-500">$199.00 / year</p></div>
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Active</span>
       </div>
       <div className="flex gap-4">
          <button className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors">Manage Subscription</button>
          <button className="px-4 py-2 border border-slate-200 text-slate-700 dark:text-slate-300 font-bold rounded-lg">View Invoices</button>
       </div>
    </div>
  </div>
);

// --- SETTINGS (Restored detailed version) ---
const SettingsDemo: React.FC<{ userData: User, onUpdateProfile: (data: Partial<User>) => void }> = ({ userData, onUpdateProfile }) => {
  const [formData, setFormData] = useState(userData);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData(prev => ({ ...prev, avatar: reader.result as string }));
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      onUpdateProfile(formData);
      setIsSaving(false);
      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }, 500);
  };

  return (
    <div className="p-10 max-w-3xl mx-auto animate-fade-in-down">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Edit Profile</h1>
      {successMessage && <div className="mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 px-4 py-3 rounded-xl flex items-center gap-2"><span className="material-symbols-outlined">check_circle</span>{successMessage}</div>}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-6 mb-8">
            <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              <div className="size-24 rounded-full bg-cover bg-center ring-4 ring-slate-100 dark:ring-slate-700 group-hover:ring-indigo-600 transition-all" style={{ backgroundImage: `url("${formData.avatar}")` }}></div>
              <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
            </div>
            <div><h4 className="font-bold text-slate-900 dark:text-white">Profile Photo</h4><button type="button" onClick={() => fileInputRef.current?.click()} className="text-sm text-indigo-600 font-bold hover:underline">Change Photo</button></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label><input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full rounded-lg border-slate-300 dark:border-slate-600 dark:bg-slate-900 dark:text-white px-3 py-2 text-sm focus:ring-indigo-600" /></div>
            <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label><input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full rounded-lg border-slate-300 dark:border-slate-600 dark:bg-slate-900 dark:text-white px-3 py-2 text-sm focus:ring-indigo-600" /></div>
          </div>
          <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Bio</label><textarea name="bio" value={formData.bio} onChange={handleChange} rows={3} className="w-full rounded-lg border-slate-300 dark:border-slate-600 dark:bg-slate-900 dark:text-white px-3 py-2 text-sm focus:ring-indigo-600 resize-none" /></div>
        </div>
        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 flex justify-end gap-3">
          <button type="submit" disabled={isSaving} className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-70">{isSaving ? 'Saving...' : 'Save Changes'}</button>
        </div>
      </form>
    </div>
  );
};

// --- OTHER DEMOS ---
const CoursesDemo: React.FC = () => <div className="p-10"><h1 className="text-3xl font-bold mb-4">Course Paths</h1><p className="text-slate-500">Explore structured DevOps & Cloud curriculum.</p></div>;
const CommunityDemo: React.FC = () => <div className="p-10"><h1 className="text-3xl font-bold mb-4">Community</h1><p className="text-slate-500">Collaborate with peers and mentors.</p></div>;
const ResourcesDemo: React.FC = () => <div className="p-10"><h1 className="text-3xl font-bold mb-4">Resources</h1><p className="text-slate-500">Access documentation, labs, and tools.</p></div>;
