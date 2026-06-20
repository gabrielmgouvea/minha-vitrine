// ===== Navbar User Dropdown =====
document.addEventListener('DOMContentLoaded', function() {
    const userMenuBtn = document.getElementById('userMenuBtn');
    const userDropdown = document.getElementById('userDropdown');
    
    if (userMenuBtn && userDropdown) {
        userMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            userDropdown.classList.toggle('show');
        });
        
        document.addEventListener('click', function() {
            userDropdown.classList.remove('show');
        });
    }
    
    // Mobile Menu
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMobileMenu = document.getElementById('closeMobileMenu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.add('active');
        });
        
        closeMobileMenu.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
        });
        
        // Fechar ao clicar em um link
        const mobileLinks = document.querySelectorAll('.mobile-nav-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
            });
        });
    }
    
    // Close Messages
    const closeMessageBtns = document.querySelectorAll('.close-message');
    closeMessageBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const message = this.closest('.message');
            message.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => message.remove(), 300);
        });
    });

    // Theme toggle (Dark/Light) - persisted em localStorage
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    const themeToggleMobile = document.getElementById('themeToggleMobile');
    const themeIcon = document.getElementById('themeToggleIcon');

    const applyTheme = (theme) => {
        if (theme === 'light') {
            body.classList.add('light-mode');
            if (themeIcon) themeIcon.className = 'fas fa-sun';
            if (themeToggleMobile) themeToggleMobile.innerHTML = '<i class="fas fa-sun"></i> Modo claro';
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('light-mode');
            if (themeIcon) themeIcon.className = 'fas fa-moon';
            if (themeToggleMobile) themeToggleMobile.innerHTML = '<i class="fas fa-moon"></i> Modo noturno';
            localStorage.setItem('theme', 'dark');
        }
    };

    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
        applyTheme('dark');
    } else if (storedTheme === 'light') {
        // Mantém o padrão escuro do projeto (mesmo se o usuário tiver salvo "claro" antes).
        applyTheme('dark');
    } else {
        // Padrão do projeto: escuro
        applyTheme('dark');
    }

    const toggleTheme = () => {
        const isLight = body.classList.contains('light-mode');
        applyTheme(isLight ? 'dark' : 'light');
    };

    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    if (themeToggleMobile) {
        themeToggleMobile.addEventListener('click', toggleTheme);
    }
    
    // Auto-hide messages after 5 seconds
    setTimeout(() => {
        const messages = document.querySelectorAll('.message');
        messages.forEach(message => {
            message.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => message.remove(), 300);
        });
    }, 5000);

    // Navbar search (Netflix-like expand)
    const navSearchBtn = document.getElementById('navSearchBtn');
    const navSearchInput = document.getElementById('navSearchInput');
    const navSearchForm = navSearchInput ? navSearchInput.closest('form') : null;
    const closeSearchIfEmpty = () => {
        if (!navSearchForm || !navSearchInput) return;
        if (!navSearchInput.value) navSearchForm.classList.remove('is-open');
    };

    if (navSearchBtn && navSearchInput && navSearchForm) {
        navSearchBtn.addEventListener('click', () => {
            const opened = navSearchForm.classList.contains('is-open');
            const hasQuery = navSearchInput.value.trim().length > 0;
            if (opened && hasQuery) {
                navSearchForm.submit();
                return;
            }
            navSearchForm.classList.add('is-open');
            setTimeout(() => navSearchInput.focus(), 0);
        });

        navSearchInput.addEventListener('focus', () => navSearchForm.classList.add('is-open'));
        navSearchInput.addEventListener('blur', closeSearchIfEmpty);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                navSearchForm.classList.remove('is-open');
                navSearchInput.blur();
            }
        });
    }

    // Categorias (modal no topo)
    const categoriesBtn = document.getElementById('navCategoriesBtn');
    const categoriesBtnMobile = document.getElementById('navCategoriesBtnMobile');
    const categoriesModal = document.getElementById('categoryMore');
    const categoriesClose = document.getElementById('categoryMoreClose');
    const categoriesBackdrop = document.getElementById('categoryMoreBackdrop');

    if (categoriesModal && (categoriesBtn || categoriesBtnMobile)) {
        const setExpanded = (val) => {
            if (categoriesBtn) categoriesBtn.setAttribute('aria-expanded', val ? 'true' : 'false');
            if (categoriesBtnMobile) categoriesBtnMobile.setAttribute('aria-expanded', val ? 'true' : 'false');
        };

        function openCategories() {
            categoriesModal.hidden = false;
            setExpanded(true);
            document.body.style.overflow = 'hidden';
            const first = categoriesModal.querySelector('.category-more-item');
            if (first) first.focus?.();
        }

        function closeCategories() {
            categoriesModal.hidden = true;
            setExpanded(false);
            document.body.style.overflow = '';
        }

        const toggleCategories = () => {
            if (categoriesModal.hidden) openCategories();
            else closeCategories();
        };

        if (categoriesBtn) categoriesBtn.addEventListener('click', toggleCategories);
        if (categoriesBtnMobile) categoriesBtnMobile.addEventListener('click', () => {
            toggleCategories();
            if (mobileMenu) mobileMenu.classList.remove('active');
        });
        if (categoriesClose) categoriesClose.addEventListener('click', closeCategories);
        if (categoriesBackdrop) categoriesBackdrop.addEventListener('click', closeCategories);

        document.addEventListener('keydown', (e) => {
            if (!categoriesModal.hidden && e.key === 'Escape') closeCategories();
        });
    }
});

// Animation for slide out
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Search Enhancement =====
const searchInput = document.querySelector('.search-input');
if (searchInput) {
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            this.closest('form').submit();
        }
    });
}

// ===== Lazy Loading Images =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== Card Animations on Scroll =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'all 0.5s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            cardObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.establishment-card, .evento-card').forEach(card => {
    cardObserver.observe(card);
});

// ===== Form Validation Enhancement =====
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.style.borderColor = 'var(--error-color)';
            } else {
                this.style.borderColor = 'var(--border-color)';
            }
        });
        
        input.addEventListener('input', function() {
            if (this.value.trim()) {
                this.style.borderColor = 'var(--border-color)';
            }
        });
    });
});

// ===== Utilities =====
function showNotification(message, type = 'info') {
    const messagesContainer = document.querySelector('.messages-container') || createMessagesContainer();
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.innerHTML = `
        <i class="fas ${icons[type]}"></i>
        <span>${message}</span>
        <button class="close-message">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    messagesContainer.appendChild(messageDiv);
    
    messageDiv.querySelector('.close-message').addEventListener('click', function() {
        messageDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => messageDiv.remove(), 300);
    });
    
    setTimeout(() => {
        if (messageDiv.parentElement) {
            messageDiv.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => messageDiv.remove(), 300);
        }
    }, 5000);
}

function createMessagesContainer() {
    const container = document.createElement('div');
    container.className = 'messages-container';
    document.body.appendChild(container);
    return container;
}

// ===== Loading State =====
function showLoading() {
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loading-overlay';
    loadingDiv.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
            <p>Carregando...</p>
        </div>
    `;
    loadingDiv.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
    `;
    document.body.appendChild(loadingDiv);
}

function hideLoading() {
    const loadingDiv = document.getElementById('loading-overlay');
    if (loadingDiv) {
        loadingDiv.remove();
    }
}

// ===== Image Preview =====
function previewImage(input, previewId) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            document.getElementById(previewId).src = e.target.result;
        };
        
        reader.readAsDataURL(input.files[0]);
    }
}

// ===== Debounce Function =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== Scroll to Top Button =====
window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
        if (!document.getElementById('scrollTopBtn')) {
            const btn = document.createElement('button');
            btn.id = 'scrollTopBtn';
            btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
            btn.style.cssText = `
                position: fixed;
                bottom: 2rem;
                right: 2rem;
                width: 50px;
                height: 50px;
                background: var(--primary-color);
                color: white;
                border: none;
                border-radius: 50%;
                cursor: pointer;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                transition: all 0.3s ease;
                z-index: 900;
            `;
            btn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'translateY(-4px)';
                btn.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.2)';
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translateY(0)';
                btn.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            });
            document.body.appendChild(btn);
        }
    } else {
        const btn = document.getElementById('scrollTopBtn');
        if (btn) btn.remove();
    }
});

console.log('Minha Vitrine - Sistema inicializado');

