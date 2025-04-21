const express = require('express');
const path = require('path');
const app = express();

// برای ساده‌سازی: فعلاً از فایل JSON استفاده می‌کنیم
const lessons = require('./data/lessons.json');

// مسیر برای دریافت درس‌ها بر اساس سطح و زبان کاربر
app.get('/lessons', (req, res) => {
  const { level, lang } = req.query;
  if (!level || !lang) {
    return res.status(400).json({ error: 'level and lang are required' });
  }

  const filtered = lessons.filter(
    (lesson) => lesson.level === level && lesson.lang === lang
  );

  res.json(filtered);
});

app.use('/media', express.static(path.join(__dirname, 'media')));

// فقط از پورت ارائه‌شده توسط Render استفاده کن
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});