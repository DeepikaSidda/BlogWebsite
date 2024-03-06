const express = require('express');
const articleRouter = require('./routes/articles');
const Article = require('./models/article');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017/deepu', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: 'desc' });
    res.render('articles/index', { articles: articles });
  } catch (error) {
    console.error('Error retrieving articles:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.use('/articles', articleRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
