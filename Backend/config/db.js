const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/profilEdu', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('eduprofile.db');

// Инициализация таблиц
db.serialize(() => {
  // Пользователи
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
  )`);

  // GPA
  db.run(`CREATE TABLE IF NOT EXISTS gpa (
    user_id INTEGER PRIMARY KEY,
    value REAL DEFAULT 0,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )`);

  // Древо развития
  db.run(`CREATE TABLE IF NOT EXISTS categories (
    user_id INTEGER,
    name TEXT,
    value INTEGER DEFAULT 0,
    PRIMARY KEY(user_id, name),
    FOREIGN KEY(user_id) REFERENCES users(id)
  )`);

  // События
  db.run(`CREATE TABLE IF NOT EXISTS events (
    user_id INTEGER,
    event_id INTEGER,
    participants INTEGER DEFAULT 0,
    PRIMARY KEY(user_id, event_id),
    FOREIGN KEY(user_id) REFERENCES users(id)
  )`);
});

module.exports = db;
