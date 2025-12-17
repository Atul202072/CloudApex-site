import { User } from '../types';

const USERS_KEY = 'cloud_apex_users';
const SESSION_KEY = 'cloud_apex_session';

// Default demo user to populate if no users exist
const DEMO_USER: User = {
  id: '1',
  name: "Alex Chen",
  email: "alex.chen@cloudapex.com",
  role: "DevOps Engineer",
  location: "San Francisco, CA",
  avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA58jPLFvQUNRFzRSoePNnqQDUoKZ7kEXzqK-9P9rVrzcK6jGng705aD_SrDJ-Ixj-sltOJKREeyj-E7MGbWNT9zt5-D1PBcYJq86W9bxBdEHxrM21nK6UEZYCvlPlfOhrroZMyTqQ_ync2fjskoiqlJmIZsPUze7ERbdmVKAVaugPFXoZC9ctBBVhwB6GUvNypcCiDSXA1ix_AgEFwPHhlApbRglfJA6RE5yCLOnKnmd4LGIkOXuuyTQOarq76_BvrbL55zUxl3geH",
  level: 12,
  xp: 4500,
  totalXp: 5000,
  bio: "Passionate about cloud architecture and automation. Currently mastering Kubernetes and Terraform."
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class MockBackendService {
  constructor() {
    this.init();
  }

  private init() {
    const users = localStorage.getItem(USERS_KEY);
    if (!users) {
      // Initialize with demo user if empty
      localStorage.setItem(USERS_KEY, JSON.stringify([DEMO_USER]));
    }
  }

  private getUsers(): User[] {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  }

  private saveUsers(users: User[]) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  async login(email: string): Promise<User> {
    await delay(800); // Simulate network latency
    const users = this.getUsers();
    // For this mock, we skip password check, but in real app verify password hash
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (user) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(user));
      return user;
    }
    throw new Error('Invalid credentials');
  }

  async logout(): Promise<void> {
    await delay(300);
    localStorage.removeItem(SESSION_KEY);
  }

  async getSession(): Promise<User | null> {
    await delay(200); // Fast session check
    const session = localStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
  }

  async updateUser(updatedData: Partial<User>): Promise<User> {
    await delay(600);
    const session = localStorage.getItem(SESSION_KEY);
    if (!session) throw new Error('No active session');

    const currentUser = JSON.parse(session) as User;
    const users = this.getUsers();
    
    const newUserData = { ...currentUser, ...updatedData };
    
    // Update in users array
    const newUsers = users.map(u => u.id === currentUser.id ? newUserData : u);
    this.saveUsers(newUsers);
    
    // Update session
    localStorage.setItem(SESSION_KEY, JSON.stringify(newUserData));
    
    return newUserData;
  }
  
  async signup(email: string, name: string): Promise<User> {
      await delay(1000);
      const users = this.getUsers();
      if (users.find(u => u.email === email)) {
          throw new Error("User already exists");
      }
      
      const newUser: User = {
          ...DEMO_USER, // Inherit default stats for demo purposes
          id: Math.random().toString(36).substr(2, 9),
          email,
          name,
          role: "Student",
          location: "Remote",
          bio: "Ready to learn!",
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`
      };
      
      users.push(newUser);
      this.saveUsers(users);
      localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
      return newUser;
  }
}

export const api = new MockBackendService();
