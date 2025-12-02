// ============================================
// 語言切換功能
// ============================================
let currentLang = 'zh'; // 預設為中文
const languages = ['zh', 'en', 'ja']; // 支援的語言順序

// 初始化語言切換
function initLanguageToggle() {
    const langToggle = document.getElementById('langToggle');
    
    // 從 localStorage 讀取語言偏好
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && languages.includes(savedLang)) {
        currentLang = savedLang;
    }
    
    // 初始設定語言
    updateLanguage(currentLang);
    updateLangToggleButton();
    
    // 語言切換按鈕事件
    langToggle.addEventListener('click', () => {
        const currentIndex = languages.indexOf(currentLang);
        const nextIndex = (currentIndex + 1) % languages.length;
        currentLang = languages[nextIndex];
        updateLanguage(currentLang);
        updateLangToggleButton();
        localStorage.setItem('preferredLanguage', currentLang);
    });
}

// 更新頁面語言
function updateLanguage(lang) {
    const elements = document.querySelectorAll('[data-zh]');
    
    elements.forEach(element => {
        let text = '';
        if (lang === 'zh' && element.hasAttribute('data-zh')) {
            text = element.getAttribute('data-zh');
        } else if (lang === 'en' && element.hasAttribute('data-en')) {
            text = element.getAttribute('data-en');
        } else if (lang === 'ja' && element.hasAttribute('data-ja')) {
            text = element.getAttribute('data-ja');
        }
        
        if (text) {
            element.textContent = text;
        }
    });
    
    // 更新 HTML lang 屬性
    const langMap = {
        'zh': 'zh-TW',
        'en': 'en',
        'ja': 'ja'
    };
    document.documentElement.lang = langMap[lang] || 'zh-TW';
}

// 更新語言切換按鈕文字
function updateLangToggleButton() {
    const langToggle = document.getElementById('langToggle');
    const langLabels = {
        'zh': 'EN',
        'en': '日',
        'ja': '中'
    };
    langToggle.querySelector('span').textContent = langLabels[currentLang] || 'EN';
}

// ============================================
// 平滑滾動導航
// ============================================
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // 只處理錨點連結
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetElement.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // 關閉行動裝置選單
                    closeMobileMenu();
                }
            }
        });
    });
}

// ============================================
// 響應式選單
// ============================================
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        // 動畫效果
        const spans = menuToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // 點擊外部關閉選單
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });
}

// 關閉行動裝置選單
function closeMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    const menuToggle = document.getElementById('menuToggle');
    const spans = menuToggle.querySelectorAll('span');
    
    navMenu.classList.remove('active');
    menuToggle.classList.remove('active');
    
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
}

// ============================================
// 導航列滾動效果
// ============================================
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // 添加陰影效果
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });
}

// ============================================
// 滾動動畫
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 觀察需要動畫的元素
    const animatedElements = document.querySelectorAll('.professional-card, .service-item, .about-content, .contact-content, .column-item, .venture-item, .gallery-item, .mass-intro, .mass-story, .mass-mission, .mass-cta, .growth-card, .self-growth-intro, .growth-quote');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ============================================
// 表單標籤語言切換
// ============================================
function updateFormLabels(lang) {
    // 這個功能已經包含在 updateLanguage 函數中
    // 因為表單標籤也使用了 data-zh 和 data-en 屬性
}

// ============================================
// 初始化所有功能
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initLanguageToggle();
    initSmoothScroll();
    initMobileMenu();
    initNavbarScroll();
    initScrollAnimations();
    
    // 確保頁面載入時顯示正確的語言
    updateLanguage(currentLang);
});

// ============================================
// 視窗大小改變時關閉行動選單
// ============================================
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});

