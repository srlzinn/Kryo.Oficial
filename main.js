// ==================== MOBILE MENU ====================
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.nav');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (nav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        if (mobileMenuBtn) {
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// ==================== SCROLL ANIMATIONS (Intersection Observer) ====================
const animateElements = document.querySelectorAll('.fade-up, .fade-left, .fade-right');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

animateElements.forEach(el => observer.observe(el));

// ==================== HEADER SCROLL EFFECT ====================
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.background = 'rgba(10, 10, 10, 0.95)';
        header.style.backdropFilter = 'blur(12px)';
    } else {
        header.style.background = 'rgba(10, 10, 10, 0.9)';
    }
    
    lastScroll = currentScroll;
});

// ==================== FORMULÁRIO DE CONTATO ====================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensagem = document.getElementById('mensagem').value.trim();
        
        if (!nome || !email || !mensagem) {
            formStatus.textContent = 'Por favor, preencha todos os campos.';
            formStatus.style.color = '#ff6b6b';
            return;
        }
        
        if (!isValidEmail(email)) {
            formStatus.textContent = 'Por favor, insira um e-mail válido.';
            formStatus.style.color = '#ff6b6b';
            return;
        }
        
        // Simulação de envio (aqui você pode integrar com API real)
        formStatus.textContent = 'Enviando mensagem...';
        formStatus.style.color = '#aaa';
        
        // Simular delay de envio
        setTimeout(() => {
            formStatus.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
            formStatus.style.color = '#4caf50';
            contactForm.reset();
            
            // Limpar mensagem após 5 segundos
            setTimeout(() => {
                formStatus.textContent = '';
            }, 5000);
        }, 1000);
    });
}

function isValidEmail(email) {
    const re = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    return re.test(email);
}

// ==================== SMOOTH SCROLL PARA LINKS ÂNCORA ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            e.preventDefault();
            const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== ATUALIZAR ANO NO FOOTER ====================
const footerYear = document.querySelector('.footer-copy p');
if (footerYear) {
    footerYear.innerHTML = `&copy; ${new Date().getFullYear()} Kryo.Design. Todos os direitos reservados.`;
}

// ==================== ADICIONAR CLASSE VISIBLE A ELEMENTOS JÁ VISÍVEIS ====================
// Executar uma vez para elementos que já estão visíveis no carregamento
setTimeout(() => {
    animateElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            el.classList.add('visible');
        }
    });
}, 100);