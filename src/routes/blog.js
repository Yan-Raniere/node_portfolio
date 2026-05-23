const express    = require('express');
const { marked } = require('marked');
const db         = require('../db');
const router     = express.Router();

router.get('/', async (req, res) => {
  try {
    const [postsResult, settingResult] = await Promise.all([
      db.query(
        `SELECT id, title, slug, excerpt, cover_image, tags, published_at, created_at
         FROM posts WHERE published = true ORDER BY published_at DESC`
      ),
      db.query("SELECT value FROM settings WHERE key = 'default_post_image'"),
    ]);
    const defaultPostImage = settingResult.rows[0]?.value || null;
    res.render('blog/index', { active: 'blog', posts: postsResult.rows, defaultPostImage });
  } catch (err) {
    console.error(err);
    res.render('blog/index', { active: 'blog', posts: [], defaultPostImage: null });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const { rows } = await db.query(
      'SELECT * FROM posts WHERE slug = $1 AND published = true',
      [req.params.slug]
    );
    if (!rows.length) return res.status(404).render('404');

    const post = rows[0];
    post.html  = marked(post.content);
    res.render('blog/post', { active: 'blog', post });
  } catch (err) {
    console.error(err);
    res.status(500).render('404');
  }
});

module.exports = router;
