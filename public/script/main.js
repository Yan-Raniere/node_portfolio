// ===============================================
// YAN RANIERE PORTFOLIO — Global JS
// ===============================================

const i18n = {
  pt: {
    nav_home: 'Início', nav_about: 'Sobre', nav_projects: 'Projetos',
    nav_blog: 'Blog', nav_contact: 'Contato',
    lang_btn: 'EN',
    theme_dark: 'Escuro', theme_light: 'Claro',

    // HOME
    home_tag: 'Full Stack Developer',
    home_h1_a: 'Olá, eu sou',
    home_h1_b: 'Yan Raniere',
    home_h1_c: 'Desenvolvedor Full Stack',
    home_desc: 'Com 5 anos de experiência em desenvolvimento web, construo soluções digitais com PHP, JavaScript, WordPress, Moodle e muito mais.',
    home_cta_proj: 'Ver Projetos',
    home_cta_contact: 'Entrar em Contato',
    home_exp_label: 'anos de experiência',
    home_proj_label: 'projetos entregues',
    home_tech_label: 'tecnologias',
    home_skills_title: 'Tecnologias & Ferramentas',

    // ABOUT
    about_tag: 'Sobre Mim',
    about_h2: 'Desenvolvedor apaixonado por resolver problemas reais',
    about_p1: 'Sou Yan Raniere, desenvolvedor full stack com sede de Ipatinga/MG. Tenho 5 anos de experiência prática em desenvolvimento web, atuando com PHP, JavaScript, HTML, CSS, MySQL, Moodle e WordPress.',
    about_p2: 'Desde 2021, passei por agências, startups e empresas de e-learning, sempre com foco em entregar soluções de qualidade. Atualmente sou desenvolvedor na CaféEAD, onde lidero tecnicamente uma equipe de 2 devs e cuido da arquitetura de plugins e sistemas para WordPress e Moodle.',
    about_p3: 'Nas horas vagas, gosto de tocar instrumentos, ouvir música, assistir séries e jogar uns rounds de CS. Acredito que descanso bem aproveitado é combustível para um trabalho excelente.',
    about_exp_title: 'Experiência',
    about_edu_title: 'Formação',
    about_skills_title: 'Habilidades',
    about_soft_title: 'Soft Skills',
    exp1_title: 'Full Stack Developer', exp1_company: 'CaféEAD Soluções E-learning', exp1_period: 'Mar 2023 — Presente',
    exp1_desc: 'Desenvolvimento, personalização e manutenção de plugins, temas e blocos para WordPress e Moodle. Liderança técnica de equipe com 2 desenvolvedores.',
    exp2_title: 'Desenvolvedor Front-End', exp2_company: 'Agência MI Digital', exp2_period: 'Jun 2021 — Mar 2023',
    exp2_desc: 'Desenvolvimento de sites institucionais e comerciais com WordPress e Elementor. Responsável pela estruturação visual e responsividade.',
    exp3_title: 'Estágio em Desenvolvimento Web', exp3_company: 'Virtuemasters', exp3_period: 'Mar 2020 — Jun 2021',
    exp3_desc: 'Manutenções e correções em sistemas WordPress com foco em PHP, JavaScript, HTML e CSS.',
    edu1_title: 'Sistemas de Informação', edu1_inst: 'Descomplica — 6º período', edu1_period: 'Mar 2024 — Presente',
    edu2_title: 'Curso DEV — Felipe Deschamps', edu2_inst: 'Desenvolvimento de aplicações modernas', edu2_period: 'Dez 2025 — Presente',
    soft1: 'Liderança Técnica', soft2: 'Comunicação', soft3: 'Gestão de Demandas',
    soft4: 'Proatividade', soft5: 'Comprometimento', soft6: 'Adaptabilidade',

    // PROJECTS
    proj_tag: 'Projetos',
    proj_h2: 'Trabalhos que entregaram resultados',
    proj_note: '* Alguns projetos profissionais estão sob NDA.',
    proj_view: 'Ver Projeto →',
    proj_nda_title: 'Projetos Profissionais',
    proj_nda_desc: 'Desenvolvimento e personalização de plugins, temas e blocos para WordPress e Moodle. Atuação em plataformas educacionais e sites institucionais. Detalhes sob NDA.',
    proj_nda_tag: 'NDA',
    proj_empty: 'Nenhum projeto cadastrado ainda.',

    // BLOG
    blog_tag: 'Blog',
    blog_h2: 'Artigos & Pensamentos',
    blog_desc: 'Reflexões sobre desenvolvimento, tecnologia e o que estou aprendendo.',
    blog_read_more: 'Ler mais →',
    blog_empty: 'Nenhum post publicado ainda. Em breve!',

    // CONTACT
    contact_tag: 'Contato',
    contact_h2: 'Vamos trabalhar juntos?',
    contact_desc: 'Estou disponível para projetos freelance, oportunidades de emprego e parcerias. Entre em contato e vamos conversar!',
    contact_email_label: 'E-mail',
    contact_phone_label: 'Telefone / WhatsApp',
    contact_linkedin_label: 'LinkedIn',
    contact_github_label: 'GitHub',
    form_name: 'Seu nome', form_email: 'Seu e-mail', form_msg: 'Sua mensagem',
    form_send: 'Enviar mensagem', form_note: 'Responderei em até 24 horas.',
  },

  en: {
    nav_home: 'Home', nav_about: 'About', nav_projects: 'Projects',
    nav_blog: 'Blog', nav_contact: 'Contact',
    lang_btn: 'PT',
    theme_dark: 'Dark', theme_light: 'Light',

    home_tag: 'Full Stack Developer',
    home_h1_a: 'Hi, I\'m',
    home_h1_b: 'Yan Raniere',
    home_h1_c: 'Full Stack Developer',
    home_desc: 'With 5 years of web development experience, I build digital solutions using PHP, JavaScript, WordPress, Moodle and more.',
    home_cta_proj: 'View Projects',
    home_cta_contact: 'Get in Touch',
    home_exp_label: 'years of experience',
    home_proj_label: 'projects delivered',
    home_tech_label: 'technologies',
    home_skills_title: 'Technologies & Tools',

    about_tag: 'About Me',
    about_h2: 'Developer passionate about solving real problems',
    about_p1: 'I\'m Yan Raniere, a full stack developer from Ipatinga/MG, Brazil. I have 5 years of hands-on web development experience working with PHP, JavaScript, HTML, CSS, MySQL, Moodle and WordPress.',
    about_p2: 'Since 2021, I\'ve worked at agencies, startups, and e-learning companies, always focused on delivering quality solutions. I\'m currently a developer at CaféEAD, where I technically lead a 2-dev team and handle plugin and system architecture for WordPress and Moodle.',
    about_p3: 'In my free time, I enjoy playing instruments, listening to music, watching TV shows and playing some CS. I believe well-spent rest is fuel for excellent work.',
    about_exp_title: 'Experience', about_edu_title: 'Education',
    about_skills_title: 'Skills', about_soft_title: 'Soft Skills',
    exp1_title: 'Full Stack Developer', exp1_company: 'CaféEAD E-learning Solutions', exp1_period: 'Mar 2023 — Present',
    exp1_desc: 'Development, customization and maintenance of plugins, themes and blocks for WordPress and Moodle. Technical leadership of a 2-developer team.',
    exp2_title: 'Front-End Developer', exp2_company: 'Agência MI Digital', exp2_period: 'Jun 2021 — Mar 2023',
    exp2_desc: 'Development of institutional and commercial websites using WordPress and Elementor. Responsible for visual structure and responsiveness.',
    exp3_title: 'Web Development Intern', exp3_company: 'Virtuemasters', exp3_period: 'Mar 2020 — Jun 2021',
    exp3_desc: 'Maintenance and fixes on WordPress systems focused on PHP, JavaScript, HTML and CSS.',
    edu1_title: 'Information Systems', edu1_inst: 'Descomplica — 6th semester', edu1_period: 'Mar 2024 — Present',
    edu2_title: 'DEV Course — Felipe Deschamps', edu2_inst: 'Modern application development', edu2_period: 'Dec 2025 — Present',
    soft1: 'Technical Leadership', soft2: 'Communication', soft3: 'Demand Management',
    soft4: 'Proactivity', soft5: 'Commitment', soft6: 'Adaptability',

    proj_tag: 'Projects', proj_h2: 'Work that delivered results',
    proj_note: '* Some professional projects are under NDA.',
    proj_view: 'View Project →',
    proj_nda_title: 'Professional Projects',
    proj_nda_desc: 'Development and customization of plugins, themes and blocks for WordPress and Moodle. Work on educational platforms and institutional websites. Details under NDA.',
    proj_nda_tag: 'NDA',
    proj_empty: 'No projects added yet.',

    blog_tag: 'Blog',
    blog_h2: 'Articles & Thoughts',
    blog_desc: 'Reflections on development, technology, and what I\'m learning.',
    blog_read_more: 'Read more →',
    blog_empty: 'No posts published yet. Coming soon!',

    contact_tag: 'Contact', contact_h2: 'Let\'s work together?',
    contact_desc: 'I\'m available for freelance projects, job opportunities and partnerships. Get in touch and let\'s talk!',
    contact_email_label: 'E-mail', contact_phone_label: 'Phone / WhatsApp',
    contact_linkedin_label: 'LinkedIn', contact_github_label: 'GitHub',
    form_name: 'Your name', form_email: 'Your e-mail', form_msg: 'Your message',
    form_send: 'Send message', form_note: 'I\'ll reply within 24 hours.',
  }
};

let currentLang  = localStorage.getItem('yr-lang')  || 'pt';
let currentTheme = localStorage.getItem('yr-theme') || 'light';

document.addEventListener('DOMContentLoaded', () => {
  applyTheme(currentTheme);
  applyLang(currentLang);
  markActiveNav();
  initScrollAnim();
  initNavToggle();
});

// ── THEME ──────────────────────────────────────
function applyTheme(t) {
  currentTheme = t;
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem('yr-theme', t);
  updateThemeBtn();
}

function toggleTheme() {
  applyTheme(currentTheme === 'light' ? 'dark' : 'light');
}

function updateThemeBtn() {
  const btn = document.getElementById('themeBtn');
  if (!btn) return;
  const t = i18n[currentLang];
  const isDark = currentTheme === 'dark';
  btn.innerHTML = isDark
    ? `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 110 14A7 7 0 0112 5z"/></svg>${t.theme_light}`
    : `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>${t.theme_dark}`;
}

// ── LANGUAGE ───────────────────────────────────
function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('yr-lang', lang);
  const t = i18n[lang];

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = t[key];
      } else {
        el.textContent = t[key];
      }
    }
  });

  const langBtn = document.getElementById('langBtn');
  if (langBtn) langBtn.querySelector('span').textContent = t.lang_btn;

  updateThemeBtn();
}

function toggleLang() {
  applyLang(currentLang === 'pt' ? 'en' : 'pt');
}

// ── ACTIVE NAV ─────────────────────────────────
function markActiveNav() {
  const path = location.pathname;
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === '/' && path === '/') {
      a.classList.add('active');
    } else if (href !== '/' && path.startsWith(href)) {
      a.classList.add('active');
    }
  });
}

// ── MOBILE NAV ─────────────────────────────────
function initNavToggle() {
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => links.classList.toggle('open'));
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });
}

// ── SCROLL ANIMATIONS ──────────────────────────
function initScrollAnim() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const delay = e.target.dataset.delay || 0;
        setTimeout(() => e.target.classList.add('visible'), delay * 100);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.anim').forEach((el, i) => {
    if (!el.dataset.delay) el.dataset.delay = (i % 6);
    obs.observe(el);
  });
}

// ── CONTACT FORM ───────────────────────────────
function handleForm(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.form-send-btn');
  btn.textContent = currentLang === 'pt' ? 'Enviado! ✓' : 'Sent! ✓';
  btn.style.background = '#22c55e';
  setTimeout(() => {
    btn.textContent = i18n[currentLang].form_send;
    btn.style.background = '';
    e.target.reset();
  }, 3000);
}
