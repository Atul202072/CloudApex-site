
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CourseCard } from './components/CourseCard';
import { Timeline } from './components/Timeline';
import { Syllabus } from './components/Syllabus';
import { ExperienceSection } from './components/ExperienceSection';
import { Footer } from './components/Footer';
import { UserProfile } from './components/UserProfile';
import { Login } from './components/Login';
import { BlogsPage } from './components/BlogsPage';
import { BlogDetail } from './components/BlogDetail';
import { ContactPage } from './components/ContactPage';
import { CourseDetail } from './components/CourseDetail';
import { EnrollmentPage } from './components/EnrollmentPage';
import { Course, TimelineStep, BlogPost } from './types';
import { Cloud, Server, Database, BookOpen, UserCheck, Rocket, ChevronRight, CheckCircle2 } from 'lucide-react';
import { AuthProvider, useAuth } from './context/AuthContext';

export const courses: Course[] = [
  {
    id: 'cloud-arch',
    title: 'Cloud Computing Architect',
    description: 'Master AWS and Azure cloud platforms. Learn to design, deploy, and manage scalable and secure cloud infrastructure.',
    icon: <Cloud className="w-6 h-6" />,
    duration: '4 Months',
    level: 'Beginner to Advanced',
    tags: ['AWS', 'Azure', 'Security']
  },
  {
    id: 'devops-eng',
    title: 'DevOps Engineering',
    description: 'Bridge the gap between development and operations. Master Docker, Kubernetes, Jenkins, and Terraform.',
    icon: <Server className="w-6 h-6" />,
    duration: '5 Months',
    level: 'Intermediate',
    tags: ['Docker', 'K8s', 'CI/CD']
  },
  {
    id: 'data-analytics',
    title: 'Data Analytics Pro',
    description: 'Transform raw data into actionable insights. Learn Python, SQL, Tableau, and Machine Learning fundamentals.',
    icon: <Database className="w-6 h-6" />,
    duration: '4 Months',
    level: 'Beginner Friendly',
    tags: ['Python', 'SQL', 'Tableau']
  }
];

const timelineSteps: TimelineStep[] = [
  {
    title: 'Foundation & Basics',
    description: 'Master the core concepts. Linux fundamentals, Networking basics, and Programming logic (Python/Go).',
    month: 'Month 1',
    icon: <BookOpen className="w-5 h-5" />
  },
  {
    title: 'Advanced Technologies',
    description: 'Deep dive into specialized tools. AWS Services, Docker containerization, or Advanced SQL depending on your track.',
    month: 'Month 2-3',
    icon: <Server className="w-5 h-5" />
  },
  {
    title: 'Real-time Projects',
    description: 'Collaborate on industry-standard projects. Build a scalable microservices app or a predictive data model.',
    month: 'Month 4-5',
    icon: <Rocket className="w-5 h-5" />
  },
  {
    title: 'Internship & Placement',
    description: 'Mock interviews, resume building, and direct internship opportunities with our hiring partners.',
    month: 'Month 6',
    icon: <UserCheck className="w-5 h-5" />
  }
];

export type AppView = 'home' | 'courses' | 'course-detail' | 'path' | 'syllabus' | 'experience' | 'blogs' | 'blog-detail' | 'login' | 'profile' | 'contact' | 'enrollment';

function AppContent() {
  const { user, isLoading } = useAuth();
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);
  const [activeBlogId, setActiveBlogId] = useState<string | null>(null);
  const [enrollmentSuccess, setEnrollmentSuccess] = useState(false);

  useEffect(() => {
    if (user && currentView === 'login') {
      setCurrentView('profile');
    }
  }, [user, currentView]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (enrollmentSuccess && currentView !== 'enrollment') {
      setEnrollmentSuccess(false);
    }
  }, [currentView, activeCourseId, activeBlogId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const navigateToCourse = (id: string) => {
    setActiveCourseId(id);
    setCurrentView('course-detail');
  };

  const navigateToBlog = (id: string) => {
    setActiveBlogId(id);
    setCurrentView('blog-detail');
  };

  const handleEnrollClick = (trackId?: string) => {
    if (trackId) setActiveCourseId(trackId);
    setCurrentView('enrollment');
  };

  const renderView = () => {
    if (currentView === 'login') {
      return (
        <Login 
          onLoginSuccess={() => setCurrentView('profile')} 
          onBack={() => setCurrentView('home')} 
        />
      );
    }

    if (currentView === 'enrollment') {
      if (enrollmentSuccess) {
        return (
          <div className="min-h-screen flex items-center justify-center px-4 pt-20">
             <div className="bg-white p-12 rounded-[3rem] shadow-2xl text-center max-w-md border border-slate-100 animate-in zoom-in duration-300">
                <div className="size-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                  <CheckCircle2 size={48} />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Application Sent!</h2>
                <p className="text-slate-500 mb-10 leading-relaxed">We've received your enrollment request. Our counselor will contact you within 24 hours to finalize your registration.</p>
                <div className="space-y-3">
                  <button onClick={() => setCurrentView('home')} className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100">Back to Home</button>
                  <button onClick={() => { setEnrollmentSuccess(false); setCurrentView('enrollment'); }} className="w-full text-indigo-600 font-bold py-3 hover:underline">Apply for another track</button>
                </div>
             </div>
          </div>
        );
      }
      return <EnrollmentPage 
        initialTrack={activeCourseId || undefined} 
        onBack={() => setCurrentView('courses')} 
        onSuccess={() => setEnrollmentSuccess(true)}
      />;
    }

    switch (currentView) {
      case 'profile':
        return user ? (
          <div className="pt-20">
            <UserProfile onLogout={() => setCurrentView('home')} />
          </div>
        ) : <Login onLoginSuccess={() => setCurrentView('profile')} onBack={() => setCurrentView('home')} />;
      case 'courses':
        return (
          <div className="animate-fade-in-down">
            <PageHeader title="Career Tracks" description="Choose a specialized path designed to transform you into a world-class engineer." />
            <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map(course => (
                  <CourseCard key={course.id} course={course} onClick={() => navigateToCourse(course.id)} />
                ))}
              </div>
            </section>
          </div>
        );
      case 'course-detail':
        const selectedCourse = courses.find(c => c.id === activeCourseId);
        return selectedCourse ? <CourseDetail course={selectedCourse} onBack={() => setCurrentView('courses')} onEnroll={handleEnrollClick} /> : <div className="pt-40 text-center">Course not found.</div>;
      case 'blogs':
        return (
          <div className="animate-fade-in-down">
            <PageHeader title="Latest Insights" description="Stay updated with the latest trends in Cloud, DevOps, and Data Science." />
            <BlogsPage onReadMore={navigateToBlog} />
          </div>
        );
      case 'blog-detail':
        return <BlogDetail blogId={activeBlogId!} onBack={() => setCurrentView('blogs')} />;
      case 'contact':
        return (
          <div className="animate-fade-in-down">
            <PageHeader title="Get in Touch" description="Have questions about our programs or career assistance? Our team is here to support you." />
            <ContactPage />
          </div>
        );
      case 'path':
        return (
          <div className="animate-fade-in-down">
            <PageHeader title="Learning Path" description="Our 6-month curriculum is structured to build your confidence from the ground up." />
            <Timeline steps={timelineSteps} />
          </div>
        );
      case 'syllabus':
        return (
          <div className="animate-fade-in-down">
            <PageHeader title="Detailed Syllabus" description="Explore the exact modules and topics you will master during the program." />
            <div className="py-12">
              <Syllabus />
            </div>
          </div>
        );
      case 'experience':
        return (
          <div className="animate-fade-in-down">
            <PageHeader title="Hands-on Experience" description="Apply your knowledge to real corporate scenarios and build a portfolio that stands out." />
            <ExperienceSection />
          </div>
        );
      default:
        return (
          <div className="animate-fade-in-down">
            <Hero onExploreCourses={() => setCurrentView('courses')} />
            
            <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Explore Our Premium Tracks</h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Curriculum designed by top engineers to ensure you learn exactly what the industry needs today.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map(course => (
                  <CourseCard key={course.id} course={course} onClick={() => navigateToCourse(course.id)} />
                ))}
              </div>
            </section>

            <div className="bg-slate-50 border-y border-slate-100">
              <Timeline steps={timelineSteps} />
            </div>
            
            <Syllabus />
            
            <ExperienceSection />
            
            <section className="py-24 bg-indigo-600 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white opacity-5 rounded-full -mr-20 -mt-20"></div>
               <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white opacity-5 rounded-full -ml-20 -mb-20"></div>
               <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                 <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to start your career?</h2>
                 <p className="text-indigo-100 text-lg mb-10 max-w-2xl mx-auto">
                   Join 5,000+ students who have successfully transitioned into high-paying tech careers.
                 </p>
                 <button 
                  onClick={handleEnrollClick}
                  className="bg-white text-indigo-600 font-bold py-4 px-10 rounded-xl shadow-xl hover:bg-indigo-50 hover:scale-105 transition-all duration-300"
                >
                   {user ? 'Go to Enrollment' : 'Apply Now for Free'}
                 </button>
               </div>
            </section>
          </div>
        );
    }
  };

  const PageHeader = ({ title, description }: { title: string; description: string }) => (
    <div className="bg-slate-900 pt-32 pb-16 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-600 opacity-10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <nav className="flex items-center gap-2 text-indigo-300 text-sm mb-4">
          <button onClick={() => setCurrentView('home')} className="hover:text-white transition-colors">Home</button>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white font-medium">{title}</span>
        </nav>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{title}</h1>
        <p className="text-slate-400 text-lg max-w-2xl">{description}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {currentView !== 'login' && (
        <Navbar 
          onNavigate={setCurrentView}
          activeView={currentView}
          onLoginClick={() => setCurrentView('login')} 
          onProfileClick={() => setCurrentView('profile')}
        />
      )}
      <main>{renderView()}</main>
      {currentView !== 'profile' && currentView !== 'login' && <Footer onNavigate={setCurrentView} />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
