const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/lessons', (req, res) => {
  const { topic, level, lang } = req.query;

  if (!topic || !level || !lang) {
    return res.status(400).json({ error: 'topic, level and lang are required' });
  }

  const filePath = `./data/${topic}.json`;

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Topic not found' });
  }

  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const filtered = data.filter(lesson => lesson.level === level && lesson.lang === lang);
    res.json(filtered);
  } catch (err) {
    console.error('Error reading lessons file:', err);
    res.status(500).json({ error: 'Server error while reading lessons' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});