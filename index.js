const express = require('express');
const app = express();
const PORT = process.env.PORT ;
const path = require('path');

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

// در آینده برای فایل‌های مدیا
app.use('/media', express.static(path.join(__dirname, 'media')));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});