const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const menuIcon = menuBtn ? menuBtn.querySelector('i') : null;
const cursorGlow = document.querySelector('.cursor-glow');
const particlesLayer = document.querySelector('.particles-layer');
const heroVisual = document.querySelector('.hero-visual');
const typingText = document.querySelector('.typing-text');
const revealItems = document.querySelectorAll('.reveal');

if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
        menuBtn.setAttribute('aria-expanded', String(!expanded));
        if (menuIcon) {
            menuIcon.className = expanded ? 'fas fa-bars' : 'fas fa-times';
        }
    });

    document.querySelectorAll('.nav-links a').forEach((link) => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuBtn.setAttribute('aria-expanded', 'false');
            if (menuIcon) {
                menuIcon.className = 'fas fa-bars';
            }
        });
    });
}

if (particlesLayer) {
    for (let i = 0; i < 24; i += 1) {
        const particle = document.createElement('span');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${6 + Math.random() * 6}s`;
        particle.style.animationDelay = `${Math.random() * 4}s`;
        particlesLayer.appendChild(particle);
    }
}

if (cursorGlow && window.matchMedia('(pointer:fine)').matches) {
    window.addEventListener('pointermove', (event) => {
        cursorGlow.style.left = `${event.clientX}px`;
        cursorGlow.style.top = `${event.clientY}px`;
    });

    window.addEventListener('pointerdown', () => {
        cursorGlow.style.opacity = '0.95';
    });

    window.addEventListener('pointerup', () => {
        cursorGlow.style.opacity = '0.7';
    });
}

if (heroVisual) {
    window.addEventListener('mousemove', (event) => {
        const x = (event.clientX / window.innerWidth - 0.5) * 10;
        const y = (event.clientY / window.innerHeight - 0.5) * 10;
        heroVisual.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });

    window.addEventListener('mouseleave', () => {
        heroVisual.style.transform = 'translate3d(0, 0, 0)';
    });
}

const roles = [
    'Digital Marketing Executive',
    'SEO Specialist',
    'Social Media Marketer',
    'Content Creator',
    'AI Tools Expert'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
    if (!typingText) {
        return;
    }

    const current = roles[roleIndex];
    typingText.textContent = current.slice(0, charIndex);

    if (!isDeleting && charIndex < current.length) {
        charIndex += 1;
        setTimeout(typeLoop, 90);
    } else if (isDeleting && charIndex > 0) {
        charIndex -= 1;
        setTimeout(typeLoop, 55);
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
            roleIndex = (roleIndex + 1) % roles.length;
        }
        setTimeout(typeLoop, 900);
    }
}

typeLoop();

document.querySelectorAll('.btn').forEach((button) => {
    button.addEventListener('click', (event) => {
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.left = `${event.clientX - button.getBoundingClientRect().left}px`;
        ripple.style.top = `${event.clientY - button.getBoundingClientRect().top}px`;
        button.appendChild(ripple);
        setTimeout(() => ripple.remove(), 700);
    });
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.16 });

revealItems.forEach((item) => revealObserver.observe(item));