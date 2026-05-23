const express = require('express');
const db      = require('../db');
const router  = express.Router();

router.get('/', (req, res) => res.render('index', { active: 'home' }));
router.get('/sobre', (req, res) => res.render('about', { active: 'sobre' }));
router.get('/contato', (req, res) => res.render('contact', { active: 'contato' }));

router.get('/projetos', async (req, res) => {
  try {
    const [projResult, settingResult] = await Promise.all([
      db.query('SELECT * FROM projects WHERE visible = true ORDER BY display_order ASC, created_at DESC'),
      db.query("SELECT value FROM settings WHERE key = 'default_project_image'"),
    ]);
    const defaultProjectImage = settingResult.rows[0]?.value || null;
    res.render('projects', { active: 'projetos', projects: projResult.rows, defaultProjectImage });
  } catch (err) {
    console.error(err);
    res.render('projects', { active: 'projetos', projects: [], defaultProjectImage: null });
  }
});

router.post('/contato', (req, res) => {
  res.json({ ok: true });
});

module.exports = router;
