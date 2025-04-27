// index.js - Server

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// فعال کردن CORS برای همه درخواست‌ها
app.use(cors());

// =======================
// Endpoint برای دریافت لیست درس‌ها
// =======================
app.get('/lesson-list', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'lesson-list.json');

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Lesson list not found' });
  }

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lessons = JSON.parse(content);
    return res.json(lessons);
  } catch (err) {
    console.error('خطا در خواندن lesson-list:', err);
    return res.status(500).json({ error: 'Failed to read lesson list file' });
  }
});

// =======================
// Endpoint جدید برای دریافت تمرینات هر درس با زبان
// =======================
app.get('/lessons/:topic/:lang', (req, res) => {
  const { topic, lang } = req.params;

  const lessonFile = path.join(__dirname, 'data', 'lessons', `${topic}.${lang}.json`);

  if (!fs.existsSync(lessonFile)) {
    return res.status(404).json({ error: 'Lesson not found' });
  }

  try {
    const content = fs.readFileSync(lessonFile, 'utf8');
    const lesson = JSON.parse(content);
    return res.json(lesson);
  } catch (err) {
    console.error('خطا در خواندن فایل درس:', err);
    return res.status(500).json({ error: 'Failed to read lesson file' });
  }
});

// =======================
// اجرای سرور
// =======================
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});