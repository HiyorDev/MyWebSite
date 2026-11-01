// ==========================================================================
// Mauricio Vega — Backend Developer Portfolio
// ==========================================================================

/* -------------------- Theme toggle (dark / light) -------------------- */
(function initTheme() {
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  const STORAGE_KEY = 'portfolio-theme';

  function getPreferredTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'dark' || stored === 'light') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (toggle) toggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
  }

  applyTheme(getPreferredTheme());

  toggle?.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  });

  // Follow system preference if the user hasn't chosen manually
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
})();

/* -------------------- i18n: translations -------------------- */
const translations = {
  es: {
    skip: "Saltar al contenido",
    nav_home: "Inicio",
    nav_about: "Sobre mí",
    nav_stack: "Stack",
    nav_projects: "Proyectos",
    nav_certs: "Certificaciones",
    nav_contact: "Contacto",
    hero_kicker: "&lt;/&gt; hola, soy",
    hero_role: "Backend Developer &mdash; Software Engineering Student",
    hero_text: "Estudiante de Ingeniería de Software enfocado en desarrollo backend, APIs y bases de datos. Construyo proyectos con Python y FastAPI para reforzar lo que aprendo y seguir creciendo como developer.",
    hero_cta_projects: "Ver proyectos",
    about_title: "Sobre mí",
    about_p1: "Soy estudiante de Ingeniería de Software, enfocado en desarrollo backend, APIs, bases de datos e ingeniería de software en general.",
    about_p2: "Disfruto construir proyectos para reforzar mis habilidades de programación y aprender nuevas tecnologías a través de desarrollo práctico. La mayoría de mis proyectos usan Python y FastAPI en el backend, combinados con bases de datos SQL y una interfaz web simple hecha con HTML, CSS y JavaScript.",
    stack_title: "Stack",
    stack_lang: "Lenguajes",
    stack_backend: "Backend",
    stack_db: "Bases de datos",
    stack_tools: "Herramientas",
    projects_title: "Proyectos destacados",
    projects_lede: 'Repositorios fijados en mi <a href="https://github.com/HiyorDev" target="_blank" rel="noopener">GitHub</a>. Cada tarjeta enlaza directo al código fuente del proyecto.',
    certs_title: "Certificaciones",
    contact_title: "Contacto",
    contact_lede: "Abierto a prácticas, proyectos colaborativos y oportunidades como backend developer.",
    footer_text: "Hecho con HTML, CSS y JavaScript puro.",
    modal_desc: "Descripción",
    modal_tech: "Tecnologías",
    modal_view_github: "Ver en GitHub &rarr;",
    card_view_details: "Ver detalles &rarr;",
    nav_toggle_label: "Abrir menú",
    modal_close_label: "Cerrar detalles del proyecto",
    theme_toggle_label: "Cambiar entre modo oscuro y claro",
  },
  en: {
    skip: "Skip to content",
    nav_home: "Home",
    nav_about: "About",
    nav_stack: "Stack",
    nav_projects: "Projects",
    nav_certs: "Certifications",
    nav_contact: "Contact",
    hero_kicker: "&lt;/&gt; hi, I'm",
    hero_role: "Backend Developer &mdash; Software Engineering Student",
    hero_text: "Software Engineering student focused on backend development, APIs, and databases. I build projects with Python and FastAPI to reinforce what I learn and keep growing as a developer.",
    hero_cta_projects: "View projects",
    about_title: "About me",
    about_p1: "I'm a Software Engineering student focused on backend development, APIs, databases, and software engineering in general.",
    about_p2: "I enjoy building projects to strengthen my programming skills and learning new technologies through hands-on development. Most of my projects use Python and FastAPI on the backend, paired with SQL databases and a simple frontend built with HTML, CSS, and JavaScript.",
    stack_title: "Stack",
    stack_lang: "Languages",
    stack_backend: "Backend",
    stack_db: "Databases",
    stack_tools: "Tools",
    projects_title: "Featured projects",
    projects_lede: 'Pinned repositories from my <a href="https://github.com/HiyorDev" target="_blank" rel="noopener">GitHub</a>. Each card links straight to the project\'s source code.',
    certs_title: "Certifications",
    contact_title: "Contact",
    contact_lede: "Open to internships, collaborative projects, and opportunities as a backend developer.",
    footer_text: "Built with plain HTML, CSS, and JavaScript.",
    modal_desc: "Overview",
    modal_tech: "Technologies",
    modal_view_github: "View on GitHub &rarr;",
    card_view_details: "View details &rarr;",
    nav_toggle_label: "Open menu",
    modal_close_label: "Close project details",
    theme_toggle_label: "Toggle dark / light mode",
  },
};

let currentLang = 'es';

function applyLanguage(lang) {
  currentLang = lang;
  const dict = translations[lang];
  document.documentElement.setAttribute('lang', lang);

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) el.innerHTML = dict[key];
  });

  const navToggle = document.getElementById('navToggle');
  navToggle?.setAttribute('aria-label', dict.nav_toggle_label);

  const themeToggle = document.getElementById('themeToggle');
  themeToggle?.setAttribute('aria-label', dict.theme_toggle_label);
  themeToggle?.setAttribute('title', dict.theme_toggle_label);

  const modalClose = document.querySelector('.modal__close');
  modalClose?.setAttribute('aria-label', dict.modal_close_label);

  const langLabel = document.getElementById('langLabel');
  if (langLabel) langLabel.textContent = lang === 'es' ? 'EN' : 'ES';

  renderProjects();
}

function initLanguage() {
  const STORAGE_KEY = 'portfolio-lang';
  const stored = localStorage.getItem(STORAGE_KEY);
  const browserLang = navigator.language?.toLowerCase().startsWith('en') ? 'en' : 'es';
  applyLanguage(stored === 'en' || stored === 'es' ? stored : browserLang);

  document.getElementById('langToggle')?.addEventListener('click', () => {
    const next = currentLang === 'es' ? 'en' : 'es';
    applyLanguage(next);
    localStorage.setItem(STORAGE_KEY, next);
  });
}

/* -------------------- Projects data (from GitHub pinned repos) -------------------- */
const projects = [
  {
    id: "pokebirthday",
    title: "PokeBirthday",
    status: { es: "Activo", en: "Active" },
    description: {
      es: "Aplicación web que determina qué Pokémon eres según tu fecha de nacimiento, con estadísticas base y soporte ES/EN.",
      en: "A web app that determines which Pokémon you are based on your birthday, with base stats and ES/EN support.",
    },
    tags: ["Python", "FastAPI", "PokéAPI", "JavaScript"],
    url: "https://github.com/HiyorDev/PokeBirthday",
    overview: {
      es: "Ingresas tu fecha de nacimiento y la app determina tu Pokémon correspondiente, mostrando su información y estadísticas base con barras visuales. Detecta automáticamente el idioma del navegador (español/inglés) y recuerda la preferencia del usuario.",
      en: "You enter your birthday and the app determines your matching Pokémon, showing its info and base stats with visual bars. It auto-detects the browser's language (Spanish/English) and remembers the user's preference.",
    },
    tech: ["HTML5", "CSS3", "JavaScript", "Python", "FastAPI", "HTTPX", "Uvicorn", "PokéAPI"],
  },
  {
    id: "docai",
    title: "DocAi",
    status: { es: "V1.0", en: "V1.0" },
    description: {
      es: "Analizador de documentos con IA: sube archivos PDF, DOCX o XLSX y hazles preguntas sobre su contenido usando Gemini.",
      en: "AI-powered document analyzer: upload PDF, DOCX, or XLSX files and ask questions about their content using Gemini.",
    },
    tags: ["Python", "FastAPI", "Gemini AI"],
    url: "https://github.com/HiyorDev/DocAi",
    overview: {
      es: "Permite subir documentos, extrae su texto automáticamente y habilita un chat interactivo donde el usuario hace preguntas sobre el contenido, respondidas por la API de Gemini a través de un backend en FastAPI.",
      en: "Lets users upload documents, automatically extracts their text, and enables an interactive chat where users ask questions about the content, answered by the Gemini API through a FastAPI backend.",
    },
    tech: ["Python", "FastAPI", "Google Gemini API", "PyMuPDF", "python-docx", "openpyxl", "HTML", "CSS", "JavaScript"],
  },
  {
    id: "movora",
    title: "Movora",
    status: { es: "En desarrollo", en: "In development" },
    description: {
      es: "Plataforma de películas full-stack con autenticación de usuarios, base de datos PostgreSQL y una interfaz moderna estilo streaming.",
      en: "Full-stack movie platform with user authentication, a PostgreSQL database, and a modern streaming-inspired interface.",
    },
    tags: ["FastAPI", "PostgreSQL", "Auth"],
    url: "https://github.com/HiyorDev/Movora",
    overview: {
      es: "Registro e inicio de sesión de usuarios con contraseñas hasheadas (Argon2), integración con PostgreSQL vía SQLAlchemy, documentación interactiva con Swagger y una interfaz inspirada en plataformas de streaming.",
      en: "User registration and login with hashed passwords (Argon2), PostgreSQL integration via SQLAlchemy, interactive Swagger docs, and a streaming-platform-inspired interface.",
    },
    tech: ["HTML5", "CSS3", "JavaScript", "Python", "FastAPI", "SQLAlchemy", "Pydantic", "psycopg2", "PostgreSQL", "Git", "Render"],
  },
];

/* -------------------- Render project cards -------------------- */
function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;
  const dict = translations[currentLang];

  grid.innerHTML = projects.map((p, i) => `
    <article class="card reveal" style="transition-delay:${i * 90}ms" data-project="${p.id}" tabindex="0" role="button" aria-haspopup="dialog">
      <div class="card__top">
        <h3 class="card__title">${p.title}</h3>
        <span class="card__status">${p.status[currentLang]}</span>
      </div>
      <p class="card__desc">${p.description[currentLang]}</p>
      <div class="card__tags">
        ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
      </div>
      <div class="card__foot">
        <span class="card__link">${dict.card_view_details}</span>
      </div>
    </article>
  `).join('');

  grid.querySelectorAll('[data-project]').forEach(card => {
    card.addEventListener('click', () => openProjectModal(card.dataset.project));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openProjectModal(card.dataset.project);
      }
    });
  });

  observeReveal();
}

/* -------------------- Project modal -------------------- */
const modal = document.getElementById('projectModal');
const modalContent = document.getElementById('modalContent');
let lastFocusedEl = null;

function openProjectModal(id) {
  const project = projects.find(p => p.id === id);
  if (!project || !modal || !modalContent) return;
  const dict = translations[currentLang];

  lastFocusedEl = document.activeElement;

  modalContent.innerHTML = `
    <h2 class="modal-title" id="modalTitle">${project.title}</h2>
    <div class="modal-meta">
      <span class="tag">${project.status[currentLang]}</span>
    </div>
    <div class="modal-block">
      <h3>${dict.modal_desc}</h3>
      <p>${project.overview[currentLang]}</p>
    </div>
    <div class="modal-block">
      <h3>${dict.modal_tech}</h3>
      <div class="modal-tech">
        ${project.tech.map(t => `<span class="tag">${t}</span>`).join('')}
      </div>
    </div>
    <a href="${project.url}" class="btn btn--primary" target="_blank" rel="noopener">${dict.modal_view_github}</a>
  `;

  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  modal.querySelector('.modal__close')?.focus();
}

function closeProjectModal() {
  if (!modal) return;
  modal.hidden = true;
  document.body.style.overflow = '';
  lastFocusedEl?.focus();
}

modal?.querySelectorAll('[data-close-modal]').forEach(el => {
  el.addEventListener('click', closeProjectModal);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal && !modal.hidden) closeProjectModal();
});

modal?.addEventListener('keydown', (e) => {
  if (e.key !== 'Tab') return;
  const focusable = modal.querySelectorAll('button, a[href]');
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
});

/* -------------------- Mobile nav toggle -------------------- */
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle?.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

navMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('is-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

/* -------------------- Navbar scroll state -------------------- */
const navbar = document.getElementById('navbar');
function handleScroll() {
  if (!navbar) return;
  navbar.classList.toggle('is-scrolled', window.scrollY > 8);
}
window.addEventListener('scroll', handleScroll, { passive: true });

/* -------------------- Reveal on scroll (with stagger support) -------------------- */
function observeReveal() {
  const items = document.querySelectorAll('.reveal:not(.is-visible)');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach(el => io.observe(el));
}

/* -------------------- Footer year -------------------- */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* -------------------- Init -------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  handleScroll();

  document.querySelectorAll('.section').forEach(s => s.classList.add('reveal'));
  document.querySelectorAll('.stack-group').forEach((el, i) => {
    el.style.transitionDelay = `${i * 80}ms`;
  });
  observeReveal();
});
