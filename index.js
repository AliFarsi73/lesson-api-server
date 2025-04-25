const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/lessons', (req, res) => {
  const { topic, level, lang } = req.query;
  if (!topic || !level || !lang) {
    return res.status(400).json({ error: 'topic, level, and lang are required' });
  }

  const filePath = path.join(__dirname, 'data', 'lessons', `${topic}.json`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Lesson not found' });
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const lesson = JSON.parse(fileContent);

  // اگر بعدا بخوایم فیلتر کنیم بر اساس سطح و زبان
  if (lesson.level === level && lesson.lang === lang) {
    return res.json([lesson]);
  } else {
    return res.status(404).json({ error: 'No matching lesson for this level/lang' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});