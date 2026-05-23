const express      = require('express');
const crypto       = require('crypto');
const multer       = require('multer');
const slugify      = require('slugify');
const db           = require('../db');
const { uploadBuffer } = require('../cloudinary');
const requireAdmin = require('../middleware/auth');
const router       = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Apenas imagens são permitidas.'));
  },
});

// ── PASSWORD UTILS ────────────────────────────────────
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

function verifyPassword(password, stored) {
  const [salt, hash] = stored.split(':');
  const attempt = crypto.scryptSync(password, salt, 64).toString('hex');
  return attempt === hash;
}

// ── AUTH ──────────────────────────────────────────────
router.get('/login', (req, res) => {
  if (req.session.admin) return res.redirect('/admin/dashboard');
  res.render('admin/login', { error: null });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (username !== process.env.ADMIN_USER) {
    return res.render('admin/login', { error: 'Usuário ou senha inválidos.' });
  }

  try {
    const { rows } = await db.query("SELECT value FROM settings WHERE key = 'admin_password'");
    let valid = false;
    if (rows.length) {
      valid = verifyPassword(password, rows[0].value);
    } else {
      valid = password === process.env.ADMIN_PASSWORD;
    }

    if (valid) {
      req.session.admin = true;
      return res.redirect('/admin/dashboard');
    }
  } catch (_) {
    if (password === process.env.ADMIN_PASSWORD) {
      req.session.admin = true;
      return res.redirect('/admin/dashboard');
    }
  }

  res.render('admin/login', { error: 'Usuário ou senha inválidos.' });
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/admin/login'));
});

// ── DASHBOARD ────────────────────────────────────────
router.get(['/', '/dashboard'], requireAdmin, async (req, res) => {
  const [posts, projects, published] = await Promise.all([
    db.query('SELECT COUNT(*) FROM posts'),
    db.query('SELECT COUNT(*) FROM projects'),
    db.query('SELECT COUNT(*) FROM posts WHERE published = true'),
  ]);
  const recent = await db.query(
    'SELECT id, title, published, created_at FROM posts ORDER BY created_at DESC LIMIT 5'
  );
  res.render('admin/dashboard', {
    totalPosts:     parseInt(posts.rows[0].count),
    totalProjects:  parseInt(projects.rows[0].count),
    publishedPosts: parseInt(published.rows[0].count),
    recentPosts:    recent.rows,
  });
});

// ── POSTS ─────────────────────────────────────────────
router.get('/posts', requireAdmin, async (req, res) => {
  const { rows } = await db.query('SELECT * FROM posts ORDER BY created_at DESC');
  res.render('admin/posts/list', { posts: rows });
});

router.get('/posts/novo', requireAdmin, (req, res) => {
  res.render('admin/posts/form', { post: null, error: null });
});

router.post('/posts', requireAdmin, upload.single('cover_file'), async (req, res) => {
  const { title, excerpt, content, tags, published } = req.body;
  const slug = slugify(title, { lower: true, strict: true, locale: 'pt' });
  const tagsArr = tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : [];
  const isPublished = published === 'on';

  let coverImage = null;
  if (req.file) {
    try { coverImage = await uploadBuffer(req.file.buffer); }
    catch (e) { return res.render('admin/posts/form', { post: null, error: 'Erro ao enviar imagem: ' + e.message }); }
  }

  try {
    await db.query(
      `INSERT INTO posts (title, slug, excerpt, content, cover_image, tags, published, published_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
      [title, slug, excerpt, content, coverImage, tagsArr, isPublished, isPublished ? new Date() : null]
    );
    res.redirect('/admin/posts');
  } catch (err) {
    res.render('admin/posts/form', { post: null, error: 'Slug já existe. Troque o título.' });
  }
});

router.get('/posts/:id/editar', requireAdmin, async (req, res) => {
  const { rows } = await db.query('SELECT * FROM posts WHERE id = $1', [req.params.id]);
  if (!rows.length) return res.redirect('/admin/posts');
  res.render('admin/posts/form', { post: rows[0], error: null });
});

router.put('/posts/:id', requireAdmin, upload.single('cover_file'), async (req, res) => {
  const { title, excerpt, content, tags, published, cover_image_keep } = req.body;
  const slug = slugify(title, { lower: true, strict: true, locale: 'pt' });
  const tagsArr = tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : [];
  const isPublished = published === 'on';

  const existing = await db.query('SELECT published, published_at, cover_image FROM posts WHERE id = $1', [req.params.id]);
  const prev = existing.rows[0];
  const publishedAt = (!prev?.published && isPublished) ? new Date() : prev?.published_at;

  let coverImage = cover_image_keep || null;
  if (req.file) {
    try { coverImage = await uploadBuffer(req.file.buffer); }
    catch (e) { return res.render('admin/posts/form', { post: prev, error: 'Erro ao enviar imagem: ' + e.message }); }
  }

  await db.query(
    `UPDATE posts SET title=$1, slug=$2, excerpt=$3, content=$4, cover_image=$5,
     tags=$6, published=$7, published_at=$8, updated_at=NOW() WHERE id=$9`,
    [title, slug, excerpt, content, coverImage, tagsArr, isPublished, publishedAt, req.params.id]
  );
  res.redirect('/admin/posts');
});

router.delete('/posts/:id', requireAdmin, async (req, res) => {
  await db.query('DELETE FROM posts WHERE id = $1', [req.params.id]);
  res.redirect('/admin/posts');
});

// ── PROJECTS ──────────────────────────────────────────
router.get('/projetos', requireAdmin, async (req, res) => {
  const { rows } = await db.query('SELECT * FROM projects ORDER BY display_order ASC, created_at DESC');
  res.render('admin/projects/list', { projects: rows });
});

router.get('/projetos/novo', requireAdmin, (req, res) => {
  res.render('admin/projects/form', { project: null, error: null });
});

router.post('/projetos', requireAdmin, upload.single('cover_file'), async (req, res) => {
  const { title, description, emoji, tags, url, display_order, visible } = req.body;
  const tagsArr = tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : [];
  let coverImage = null;
  if (req.file) {
    try { coverImage = await uploadBuffer(req.file.buffer); }
    catch (e) { return res.render('admin/projects/form', { project: null, error: 'Erro ao enviar imagem: ' + e.message }); }
  }
  await db.query(
    `INSERT INTO projects (title, description, emoji, tags, url, display_order, visible, cover_image)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
    [title, description, emoji || '🚀', tagsArr, url, parseInt(display_order) || 0, visible === 'on', coverImage]
  );
  res.redirect('/admin/projetos');
});

router.get('/projetos/:id/editar', requireAdmin, async (req, res) => {
  const { rows } = await db.query('SELECT * FROM projects WHERE id = $1', [req.params.id]);
  if (!rows.length) return res.redirect('/admin/projetos');
  res.render('admin/projects/form', { project: rows[0], error: null });
});

router.put('/projetos/:id', requireAdmin, upload.single('cover_file'), async (req, res) => {
  const { title, description, emoji, tags, url, display_order, visible, cover_image_keep } = req.body;
  const tagsArr = tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : [];
  let coverImage = cover_image_keep || null;
  if (req.file) {
    try { coverImage = await uploadBuffer(req.file.buffer); }
    catch (e) {
      const { rows } = await db.query('SELECT * FROM projects WHERE id = $1', [req.params.id]);
      return res.render('admin/projects/form', { project: rows[0] || null, error: 'Erro ao enviar imagem: ' + e.message });
    }
  }
  await db.query(
    `UPDATE projects SET title=$1, description=$2, emoji=$3, tags=$4, url=$5,
     display_order=$6, visible=$7, cover_image=$8 WHERE id=$9`,
    [title, description, emoji || '🚀', tagsArr, url, parseInt(display_order) || 0, visible === 'on', coverImage, req.params.id]
  );
  res.redirect('/admin/projetos');
});

router.delete('/projetos/:id', requireAdmin, async (req, res) => {
  await db.query('DELETE FROM projects WHERE id = $1', [req.params.id]);
  res.redirect('/admin/projetos');
});

// ── SETTINGS ──────────────────────────────────────────
router.get('/configuracoes', requireAdmin, async (req, res) => {
  const { rows } = await db.query(
    "SELECT key, value FROM settings WHERE key IN ('default_post_image','default_project_image')"
  );
  const defaults = Object.fromEntries(rows.map(r => [r.key, r.value]));
  res.render('admin/settings', {
    success: null,
    error: null,
    defaultPostImage:    defaults.default_post_image    || null,
    defaultProjectImage: defaults.default_project_image || null,
  });
});

router.post('/configuracoes/senha', requireAdmin, async (req, res) => {
  const { current_password, new_password, confirm_password } = req.body;

  const { rows } = await db.query("SELECT value FROM settings WHERE key = 'admin_password'");
  let currentValid = rows.length
    ? verifyPassword(current_password, rows[0].value)
    : current_password === process.env.ADMIN_PASSWORD;

  if (!currentValid) return res.render('admin/settings', { error: 'Senha atual incorreta.', success: null });
  if (new_password.length < 6) return res.render('admin/settings', { error: 'Nova senha deve ter ao menos 6 caracteres.', success: null });
  if (new_password !== confirm_password) return res.render('admin/settings', { error: 'As senhas não coincidem.', success: null });

  const hashed = hashPassword(new_password);
  await db.query(
    "INSERT INTO settings (key,value) VALUES ('admin_password',$1) ON CONFLICT (key) DO UPDATE SET value=EXCLUDED.value",
    [hashed]
  );

  const { rows: dr } = await db.query(
    "SELECT key, value FROM settings WHERE key IN ('default_post_image','default_project_image')"
  );
  const defaults = Object.fromEntries(dr.map(r => [r.key, r.value]));
  res.render('admin/settings', {
    success: 'Senha alterada com sucesso!',
    error: null,
    defaultPostImage:    defaults.default_post_image    || null,
    defaultProjectImage: defaults.default_project_image || null,
  });
});

router.post('/configuracoes/imagens', requireAdmin, upload.fields([
  { name: 'default_post_image',    maxCount: 1 },
  { name: 'default_project_image', maxCount: 1 },
]), async (req, res) => {
  const fetchDefaults = async () => {
    const { rows } = await db.query(
      "SELECT key, value FROM settings WHERE key IN ('default_post_image','default_project_image')"
    );
    return Object.fromEntries(rows.map(r => [r.key, r.value]));
  };

  const files = req.files || {};
  let uploaded = 0;

  for (const key of ['default_post_image', 'default_project_image']) {
    if (files[key] && files[key][0]) {
      try {
        const url = await uploadBuffer(files[key][0].buffer);
        await db.query(
          'INSERT INTO settings (key,value) VALUES ($1,$2) ON CONFLICT (key) DO UPDATE SET value=EXCLUDED.value',
          [key, url]
        );
        uploaded++;
      } catch (e) {
        const defaults = await fetchDefaults();
        return res.render('admin/settings', {
          error: 'Erro ao enviar imagem: ' + e.message,
          success: null,
          defaultPostImage:    defaults.default_post_image    || null,
          defaultProjectImage: defaults.default_project_image || null,
        });
      }
    }
  }

  const defaults = await fetchDefaults();
  res.render('admin/settings', {
    success: uploaded ? 'Imagens padrão atualizadas!' : 'Nenhuma imagem enviada.',
    error: null,
    defaultPostImage:    defaults.default_post_image    || null,
    defaultProjectImage: defaults.default_project_image || null,
  });
});

module.exports = router;
