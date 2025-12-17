import React, { useState, useEffect } from 'react';
import { Menu, X, CloudLightning, UserCircle, LogOut, Settings, LayoutDashboard } from 'lucide-react';
import { Button } from './Button';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onLoginClick: () => void;
  onProfileClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onLoginClick, onProfileClick }) => {
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Courses', href: '#courses' },
    { name: 'Path', href: '#timeline' },
    { name: 'Syllabus', href: '#syllabus' },
    { name: 'Experience', href: '#experience' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-slate-100 py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <div className="bg-indigo-600 p-2 rounded-lg">
              <CloudLightning className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">CloudApex</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
              >
                {link.name}
              </a>
            ))}
            
            {user ? (
              <div 
                className="relative"
                onMouseEnter={() => setIsProfileDropdownOpen(true)}
                onMouseLeave={() => setIsProfileDropdownOpen(false)}
              >
                <button 
                  onClick={onProfileClick}
                  className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full border border-slate-200 hover:border-indigo-200 hover:bg-indigo-50/50 transition-all"
                >
                  <span className="text-sm font-bold text-slate-700 ml-2">{user.name.split(' ')[0]}</span>
                  <div className="w-8 h-8 rounded-full bg-cover bg-center border border-indigo-200" style={{ backgroundImage: `url("${user.avatar}")` }}></div>
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute right-0 top-full pt-2 w-56 animate-fade-in-down">
                    <div className="bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden">
                      <div className="px-4 py-3 border-b border-slate-50 bg-slate-50/50">
                        <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                      </div>
                      <div className="p-1">
                        <button onClick={onProfileClick} className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors">
                          <LayoutDashboard className="w-4 h-4" />
                          Dashboard
                        </button>
                        <button onClick={onProfileClick} className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors">
                          <Settings className="w-4 h-4" />
                          Settings
                        </button>
                      </div>
                      <div className="border-t border-slate-50 p-1">
                        <button onClick={logout} className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={onLoginClick} className="!py-2 !px-4">
                  <UserCircle className="w-4 h-4 mr-2" />
                  Log In
                </Button>
                <Button variant="primary" size="sm" onClick={onLoginClick}>Get Started</Button>
              </>
            )}
          </div>

          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-indigo-600"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 p-4 shadow-lg animate-fade-in-down">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href}
                className="text-base font-medium text-slate-600 hover:text-indigo-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="border-t border-slate-100 pt-4 mt-2">
              {user ? (
                <>
                  <div className="flex items-center gap-3 mb-4 px-2">
                    <div className="w-10 h-10 rounded-full bg-cover bg-center" style={{ backgroundImage: `url("${user.avatar}")` }}></div>
                    <div>
                      <p className="font-bold text-slate-900">{user.name}</p>
                      <p className="text-xs text-slate-500">{user.email}</p>
                    </div>
                  </div>
                  <Button variant="primary" className="w-full mb-2" onClick={() => { onProfileClick(); setIsMobileMenuOpen(false); }}>
                    Dashboard
                  </Button>
                  <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300" onClick={() => { logout(); setIsMobileMenuOpen(false); }}>
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" className="w-full mb-2" onClick={() => { onLoginClick(); setIsMobileMenuOpen(false); }}>
                    Log In
                  </Button>
                  <Button variant="primary" className="w-full" onClick={() => { onLoginClick(); setIsMobileMenuOpen(false); }}>
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
