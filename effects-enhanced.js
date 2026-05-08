/**
 * ============================================
 * ENHANCED EFFECTS FOR DONG THAP WEBSITE
 * ============================================
 * Các hiệu ứng nâng cao cho website Đồng Tháp
 */

(function() {
    'use strict';

    // ============ 1. COUNTER ANIMATION ============
    // Đếm số liệu từ 0 đến target
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        const speed = 50;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.animated) {
                    entry.target.dataset.animated = 'true';
                    const target = parseInt(entry.target.dataset.target);
                    let current = 0;
                    const increment = target / speed;
                    
                    const updateCounter = () => {
                        if (current < target) {
                            current += increment;
                            entry.target.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            entry.target.textContent = target;
                        }
                    };
                    
                    updateCounter();
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => observer.observe(counter));
    }

    // ============ 2. PARALLAX EFFECT ============
    // Hiệu ứng nền chuyển động theo cuộn
    function setupParallax() {
        const parallaxBg = document.getElementById('parallax-bg');
        if (!parallaxBg) return;
        
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            parallaxBg.style.transform = `translateY(${scrollY * 0.5}px)`;
        }, { passive: true });
    }

    // ============ 3. SCROLL REVEAL WITH FADE-IN ============
    // Hiệu ứng hiện lên khi cuộn tới
    function setupScrollReveal() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('[data-aos]').forEach(el => {
            observer.observe(el);
        });
    }

    // ============ 4. HIGHLIGHT WORD PULSE ============
    // Làm sáng từ highlight khi hover
    function setupHighlightWords() {
        const words = document.querySelectorAll('.highlight-word');
        words.forEach(word => {
            word.addEventListener('mouseenter', function() {
                this.style.filter = 'brightness(1.3)';
            });
            word.addEventListener('mouseleave', function() {
                this.style.filter = 'brightness(1)';
            });
        });
    }

    // ============ 5. RIPPLE EFFECT ============
    // Hiệu ứng sóng khi click button
    function setupRippleEffect() {
        document.querySelectorAll('.ripple-container').forEach(btn => {
            btn.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                
                this.appendChild(ripple);
                setTimeout(() => ripple.remove(), 600);
            });
        });
    }

    // ============ 6. STAT BAR FILL ANIMATION ============
    // Điền thanh thống kê khi cuộn tới
    function setupStatBars() {
        const bars = document.querySelectorAll('.stat-bar-fill');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.filled) {
                    entry.target.dataset.filled = 'true';
                    const width = entry.target.parentElement.parentElement.querySelector('.stat-bar-fill').dataset.width;
                    setTimeout(() => {
                        entry.target.style.width = width + '%';
                    }, 100);
                }
            });
        }, { threshold: 0.5 });
        
        bars.forEach(bar => observer.observe(bar));
    }

    // ============ 7. FLOATING SCROLL INDICATOR ============
    // Chỉ báo cuộn nổi
    function setupFloatingScrollIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'float-scroll-indicator';
        indicator.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="12 5 12 19 5 12 12 19 19 12"></polyline>
            </svg>
        `;
        indicator.style.cssText = `
            position: fixed;
            left: 50%;
            bottom: 30px;
            transform: translateX(-50%);
            color: #4caf50;
            z-index: 50;
            pointer-events: none;
            animation: float-bounce 2s ease-in-out infinite;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(indicator);
        
        // Ẩn/hiện indicator tùy theo vị trí
        window.addEventListener('scroll', () => {
            const scrollPos = window.scrollY + window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;
            
            if (scrollPos < docHeight - 500) {
                indicator.style.opacity = '1';
            } else {
                indicator.style.opacity = '0';
            }
        }, { passive: true });
    }

    // ============ 8. CARD LIFT ON HOVER ============
    // Nâng card khi hover
    function setupCardLift() {
        document.querySelectorAll('.card-lift').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
                this.style.boxShadow = '0 20px 40px rgba(76,175,80,0.2)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '';
            });
        });
    }

    // ============ 9. UNDERLINE ANIMATION ON SCROLL ============
    // Các đường gạch dưới tiêu đề khi cuộn
    function setupUnderlineAnimation() {
        const underlines = document.querySelectorAll('[id$="-underline"]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.animated) {
                    entry.target.dataset.animated = 'true';
                    entry.target.style.width = '100%';
                }
            });
        }, { threshold: 0.5 });
        
        underlines.forEach(line => observer.observe(line));
    }

    // ============ 10. FEATURE CARD STAGGER ============
    // Hiệu ứng xếp tầng cho feature cards
    function setupFeatureCardStagger() {
        const cards = document.querySelectorAll('[data-aos]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                    }, index * 100);
                }
            });
        }, { threshold: 0.1 });
        
        cards.forEach(card => observer.observe(card));
    }

    // ============ 11. TEXT SHIMMER EFFECT ============
    // Hiệu ứng lấp lánh trên text
    function setupTextShimmer() {
        const shimmers = document.querySelectorAll('.text-shimmer');
        shimmers.forEach(el => {
            el.style.backgroundSize = '200% auto';
            el.style.animation = 'shimmer-move 3s linear infinite';
        });
    }

    // ============ 12. GLITCH EFFECT ON TITLE ============
    // Hiệu ứng sai lệch chữ
    function setupGlitchEffect() {
        const glitches = document.querySelectorAll('.glitch');
        glitches.forEach(el => {
            el.addEventListener('mouseenter', function() {
                this.style.animation = 'glitch-effect 0.3s ease infinite';
            });
            
            el.addEventListener('mouseleave', function() {
                this.style.animation = 'none';
            });
        });
    }

    // ============ 13. MAGNETIC BUTTON EFFECT ============
    // Nút hút nam châm
    function setupMagneticButtons() {
        document.querySelectorAll('.magnetic-btn').forEach(btn => {
            btn.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                this.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });
            
            btn.addEventListener('mouseleave', function() {
                this.style.transform = 'translate(0, 0)';
            });
        });
    }

    // ============ 14. SCROLL PROGRESS BAR ============
    // Thanh tiến độ cuộn
    function setupScrollProgressBar() {
        const progressBar = document.getElementById('progress-bar');
        if (!progressBar) return;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrolled + '%';
        }, { passive: true });
    }

    // ============ 15. SCROLL TO TOP BUTTON ============
    // Nút cuộn về đầu trang
    function setupScrollToTop() {
        const scrollTop = document.getElementById('scroll-top');
        if (!scrollTop) return;
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTop.classList.add('visible');
            } else {
                scrollTop.classList.remove('visible');
            }
        }, { passive: true });
    }

    // ============ 16. LAZY LOAD IMAGES ============
    // Tải ảnh khi hiển thị
    function setupLazyLoadImages() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('revealed');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => observer.observe(img));
    }

    // ============ INITIALIZE ALL EFFECTS ============
    function initAllEffects() {
        // Đợi DOM load xong
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                setupEffects();
            });
        } else {
            setupEffects();
        }

        function setupEffects() {
            setTimeout(() => {
                animateCounters();
                setupParallax();
                setupScrollReveal();
                setupHighlightWords();
                setupRippleEffect();
                setupStatBars();
                setupFloatingScrollIndicator();
                setupCardLift();
                setupUnderlineAnimation();
                setupFeatureCardStagger();
                setupTextShimmer();
                setupGlitchEffect();
                setupMagneticButtons();
                setupScrollProgressBar();
                setupScrollToTop();
                setupLazyLoadImages();
            }, 100);
        }
    }

    // Khởi động
    initAllEffects();

})();

// ============ ADDITIONAL ANIMATION KEYFRAMES ============
// Thêm vào CSS nếu chưa có
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes float-bounce {
        0%, 100% {
            transform: translateX(-50%) translateY(0);
        }
        50% {
            transform: translateX(-50%) translateY(-10px);
        }
    }

    @keyframes glitch-effect {
        0% {
            text-shadow: 0 0 0 rgba(76,175,80,0);
        }
        50% {
            text-shadow: -2px 0 #4caf50, 2px 0 #81c784;
        }
        100% {
            text-shadow: 0 0 0 rgba(76,175,80,0);
        }
    }

    @keyframes shimmer-move {
        to {
            background-position: 200% center;
        }
    }

    .float-scroll-indicator svg {
        display: block;
        width: 24px;
        height: 24px;
    }
`;
document.head.appendChild(style);
