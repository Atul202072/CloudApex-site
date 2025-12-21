
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 80;
const SECRET_KEY = process.env.JWT_SECRET || 'cloudapex_production_secret_2024';

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, '.')));

const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) console.error('DB Connection Error:', err.message);
  else console.log('Connected to SQLite database.');
});

db.serialize(() => {
  // Users Table
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT DEFAULT 'Student',
    location TEXT DEFAULT 'Remote',
    avatar TEXT,
    level INTEGER DEFAULT 1,
    xp INTEGER DEFAULT 0,
    totalXp INTEGER DEFAULT 1000,
    bio TEXT
  )`);

  // Blogs Table
  db.run(`CREATE TABLE IF NOT EXISTS blogs (
    id TEXT PRIMARY KEY,
    title TEXT,
    content TEXT,
    author TEXT,
    date TEXT,
    category TEXT,
    image TEXT
  )`);

  // Contact Inquiries Table
  db.run(`CREATE TABLE IF NOT EXISTS contact_inquiries (
    id TEXT PRIMARY KEY,
    name TEXT,
    email TEXT,
    subject TEXT,
    message TEXT,
    date TEXT
  )`);
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Authentication required' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: 'Session expired. Please login again.' });
    req.user = user;
    next();
  });
};

const isAdmin = (req, res, next) => {
  db.get(`SELECT role FROM users WHERE id = ?`, [req.user.id], (err, user) => {
    if (user && user.role === 'Admin') next();
    else res.status(403).json({ error: 'Admin access required' });
  });
};

// --- AUTH ROUTES ---
app.post('/api/auth/signup', async (req, res) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email and password are required' });
  }

  const id = Math.random().toString(36).substr(2, 9);
  const hashedPassword = await bcrypt.hash(password, 10);
  const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;
  const role = (email === 'admin@cloudapex.com') ? 'Admin' : 'Student';

  const sql = `INSERT INTO users (id, name, email, password, avatar, role, level, xp, totalXp, bio, location) 
               VALUES (?, ?, ?, ?, ?, ?, 1, 0, 1000, 'Welcome to CloudApex!', 'Remote')`;
  
  db.run(sql, [id, name, email, hashedPassword, avatar, role], function(err) {
    if (err) {
      console.error(err);
      return res.status(400).json({ error: 'An account with this email already exists' });
    }
    const token = jwt.sign({ id, email }, SECRET_KEY);
    res.json({ 
      token, 
      user: { id, name, email, avatar, role, level: 1, xp: 0, totalXp: 1000, bio: 'Welcome to CloudApex!', location: 'Remote' } 
    });
  });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
    if (err || !user) return res.status(400).json({ error: 'Account not found. Please sign up first.' });
    
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ error: 'Invalid password. Please try again.' });
    
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY);
    delete user.password;
    res.json({ token, user });
  });
});

app.get('/api/auth/me', authenticateToken, (req, res) => {
  db.get(`SELECT id, name, email, role, location, avatar, level, xp, totalXp, bio FROM users WHERE id = ?`, [req.user.id], (err, user) => {
    if (err || !user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  });
});

// --- USER PROFILE ROUTES ---
app.put('/api/user/profile', authenticateToken, (req, res) => {
  const { name, role, location, bio, avatar } = req.body;
  const sql = `UPDATE users SET name = ?, role = ?, location = ?, bio = ?, avatar = ? WHERE id = ?`;
  db.run(sql, [name, role, location, bio, avatar, req.user.id], function(err) {
    if (err) return res.status(500).json({ error: 'Failed to update profile' });
    db.get(`SELECT id, name, email, role, location, avatar, level, xp, totalXp, bio FROM users WHERE id = ?`, [req.user.id], (err, user) => {
      res.json(user);
    });
  });
});

app.post('/api/user/change-password', authenticateToken, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  db.get(`SELECT password FROM users WHERE id = ?`, [req.user.id], async (err, user) => {
    if (err || !user) return res.status(404).json({ error: 'User not found' });
    const valid = await bcrypt.compare(currentPassword, user.password);
    if (!valid) return res.status(400).json({ error: 'Current password incorrect' });
    
    const hashed = await bcrypt.hash(newPassword, 10);
    db.run(`UPDATE users SET password = ? WHERE id = ?`, [hashed, req.user.id], (err) => {
      if (err) return res.status(500).json({ error: 'Update failed' });
      res.json({ message: 'Password updated successfully' });
    });
  });
});

// --- CONTACT INQUIRY ROUTES ---
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  const id = Math.random().toString(36).substr(2, 9);
  const date = new Date().toISOString();
  db.run(`INSERT INTO contact_inquiries (id, name, email, subject, message, date) VALUES (?, ?, ?, ?, ?, ?)`,
    [id, name, email, subject, message, date],
    (err) => {
      if (err) return res.status(500).json({ error: 'Failed to save inquiry' });
      res.json({ message: 'Message received' });
    }
  );
});

// --- BLOG ROUTES ---
app.get('/api/blogs', (req, res) => {
  db.all(`SELECT * FROM blogs ORDER BY date DESC`, [], (err, rows) => {
    res.json(rows || []);
  });
});

app.post('/api/blogs', authenticateToken, isAdmin, (req, res) => {
  const { title, content, category, image } = req.body;
  const id = Math.random().toString(36).substr(2, 9);
  const date = new Date().toISOString().split('T')[0];
  const author = 'CloudApex Admin'; 

  db.run(`INSERT INTO blogs (id, title, content, author, date, category, image) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [id, title, content, author, date, category || 'Insights', image],
    function(err) {
      if (err) return res.status(500).json({ error: 'Failed to create blog' });
      res.json({ id, title, content, author, date, category: category || 'Insights', image });
    }
  );
});

app.delete('/api/blogs/:id', authenticateToken, isAdmin, (req, res) => {
  db.run(`DELETE FROM blogs WHERE id = ?`, [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: 'Delete failed' });
    res.json({ message: 'Blog deleted' });
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`CloudApex Backend running on port ${PORT}`);
});
