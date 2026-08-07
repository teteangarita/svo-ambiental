// Intersection Observer for Scroll Reveal
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

revealElements.forEach(element => {
    revealOnScroll.observe(element);
});

// Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ── CARGA DINÁMICA DEL BLOG (desde data/posts.json) ─────────────────
async function loadBlogPosts() {
    const container = document.getElementById('blog-list');
    if (!container) return;
    try {
        const res = await fetch('data/posts.json');
        if (!res.ok) throw new Error('No se pudo cargar posts.json');
        const posts = await res.json();
        if (!Array.isArray(posts) || posts.length === 0) {
            container.innerHTML = '<p>No hay entradas disponibles.</p>';
            return;
        }
        container.innerHTML = posts.map(p => `
            <div class="service-card blog-card reveal">
                <div class="icon">${p.icon || ''}</div>
                <h4>${p.title}</h4>
                <p>${p.excerpt || ''}</p>
                <a href="${p.url || '#'}" class="read-more">Leer artículo →</a>
            </div>
        `).join('');

        // Re-observe reveal elements añadidos dinámicamente
        document.querySelectorAll('.reveal').forEach(element => {
            revealOnScroll.observe(element);
        });
    } catch (err) {
        console.error(err);
        container.innerHTML = '<p>Error cargando entradas.</p>';
    }
}

document.addEventListener('DOMContentLoaded', loadBlogPosts);

// Form Submission Feedback (Mock)
const contactForm = document.getElementById('form-consulta');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = 'Enviando...';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerText = '¡Mensaje Enviado!';
            btn.style.backgroundColor = '#1D9E75';
            contactForm.reset();
            
            setTimeout(() => {
                btn.innerText = originalText;
                btn.disabled = false;
                btn.style.backgroundColor = '';
            }, 3000);
        }, 1500);
    });
}

// ── TABS DE SERVICIOS ──────────────────────────────────────
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-tab');

        // Desactivar todos
        tabBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
        tabPanels.forEach(p => p.classList.remove('active'));

        // Activar el seleccionado
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        const panel = document.getElementById(targetId);
        if (panel) panel.classList.add('active');
    });
});
