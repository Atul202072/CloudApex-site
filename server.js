
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 80;
const SECRET_KEY = 'cloudapex_super_secret_key_change_me';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '.')));

// Database Setup
const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) console.error('DB Connection Error:', err.message);
  else console.log('Connected to SQLite database.');
});

// Initialize Tables
db.serialize(() => {
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
});

// Helper: JWT Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(0);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Routes
app.post('/api/auth/signup', async (req, res) => {
  const { name, email, password } = req.body;
  const id = Math.random().toString(36).substr(2, 9);
  const hashedPassword = await bcrypt.hash(password, 10);
  const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;

  const sql = `INSERT INTO users (id, name, email, password, avatar) VALUES (?, ?, ?, ?, ?)`;
  db.run(sql, [id, name, email, hashedPassword, avatar], function(err) {
    if (err) return res.status(400).json({ error: 'User already exists' });
    const token = jwt.sign({ id, email }, SECRET_KEY);
    res.json({ token, user: { id, name, email, avatar, role: 'Student', level: 1, xp: 0, totalXp: 1000 } });
  });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
    if (err || !user) return res.status(400).json({ error: 'User not found' });
    
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ error: 'Invalid password' });

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

app.put('/api/user/profile', authenticateToken, (req, res) => {
  const { name, bio, location } = req.body;
  const sql = `UPDATE users SET name = ?, bio = ?, location = ? WHERE id = ?`;
  db.run(sql, [name, bio, location, req.user.id], function(err) {
    if (err) return res.status(500).json({ error: 'Update failed' });
    res.json({ message: 'Profile updated' });
  });
});

// Serve frontend for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`CloudApex Production Backend running on port ${PORT}`);
});
