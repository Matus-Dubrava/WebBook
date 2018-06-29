const express = require('express');

const Post = require('./models/post.js');
const utils = require('./utils');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/posts', (req, res) => {
  Post.find()
    .then(posts => {
      const postsShorterText = posts.map(post => {
        return {
          title: post.title,
          description: post.description,
          date: post.date,
          content: post.content.length > 200
            ? post.content.slice(0, 200) + '...'
            : post.content
        };
      });
      res.render('posts', { posts: postsShorterText });
    })
    .catch(e => console.log(e));
});

router.get('/add-post', (req, res) => {
  res.render('add-post');
});

router.post('/add-post', (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    description: req.body.description,
    date: utils.getCurrentFormattedDate()
  });

  post.save();
  res.redirect('/posts');
});

router.get('/posts/:title', (req, res, next) => {
  Post.findOne({ title: req.params.title }, (err, post) => {
    if (err) { return next(err); }
    if (!post) { return next(404); }

    res.render('post', { post });
  });
});

router.get('/posts/delete/:title', (req, res, next) => {
  Post.findOneAndRemove({ title: req.params.title }, (err, post) => {
    if (err) { return next(err); }
  });

  res.redirect('/posts');
});

router.get('/posts/edit/:title', (req, res, next) => {
  Post.findOne({ title: req.params.title }, (err, post) => {
    res.render('post-edit', { post });
  });
});

router.post('/posts/edit/:title', (req, res, next) => {
  Post.findOne({ title: req.params.title })
    .then(post => {
      post.title = req.body.title;
      post.content = req.body.content;
      post.description = req.body.description;

      post.save();
      res.redirect(`/posts/${post.title}`);
    })
    .catch(e => {
      return next(404);
    });
});

router.use((req, res, next) => {
  res.render('404');
});


module.exports = router;
