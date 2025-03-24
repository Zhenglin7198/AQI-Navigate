// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    
    // Initialize image slider
    initImageSlider();
    
    // Initialize parallax effect
    initParallax();
    
    // Initialize hero image scroll effect
    initHeroImageEffect();
});

// Function to initialize animations
function initAnimations() {
    // Initial animations that should play on page load
    setTimeout(() => {
        document.querySelectorAll('.reveal-text').forEach(element => {
            element.classList.add('appear');
        });
    }, 300);

    setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach(element => {
            element.classList.add('appear');
        });
    }, 500);

    // Initialize scroll animations
    const scrollElements = document.querySelectorAll('.scroll-trigger, .parallax-element');
    
    // Function to check if element is in viewport
    const isElementInViewport = (el, offset = 150) => {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight - offset) &&
            rect.bottom >= offset
        );
    };
    
    // Function to handle scroll animation
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (isElementInViewport(el)) {
                el.classList.add('appear');
            }
        });
    };
    
    // Check if elements are visible on initial load
    handleScrollAnimation();
    
    // Add scroll event listener
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
}

// Function to initialize image slider
function initImageSlider() {
    const sliders = document.querySelectorAll('.image-slider');
    
    sliders.forEach(slider => {
        const slides = slider.querySelectorAll('.feature-image');
        const dots = document.querySelectorAll('.dot');
        let currentSlide = 0;
        
        // Function to show slide
        const showSlide = (index) => {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            slides[index].classList.add('active');
            dots[index].classList.add('active');
        };
        
        // Add click event to dots
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const slideIndex = dot.getAttribute('data-index');
                currentSlide = parseInt(slideIndex);
                showSlide(currentSlide);
            });
        });
        
        // Auto-rotate slides
        if (slides.length > 1) {
            setInterval(() => {
                currentSlide = (currentSlide + 1) % slides.length;
                showSlide(currentSlide);
            }, 4000);
        }
    });
}

// Function to initialize parallax effect
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        parallaxElements.forEach((element) => {
            const rect = element.getBoundingClientRect();
            const elementCenter = rect.top + rect.height / 2;
            const windowCenter = window.innerHeight / 2;
            const distanceFromCenter = elementCenter - windowCenter;
            
            // Only apply parallax if element is in viewport
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                // Calculate parallax transformation
                const parallaxValue = distanceFromCenter * 0.15;
                element.style.transform = `translateY(${-parallaxValue}px)`;
            }
        });
    });
}

// Add sticky header effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 20) {
        header.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// Add smooth scrolling for anchor links
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

// Add hover effect for feature images
document.querySelectorAll('.feature-image').forEach(image => {
    image.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        
        this.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) scale(1.05)`;
    });
    
    image.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale(1)';
    });
});

// Create a sticky navigation menu that shows on scroll up
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    const header = document.querySelector('header');
    
    if (currentScroll > 150) {
        if (currentScroll > lastScrollTop) {
            // Scroll down - hide the header
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scroll up - show the header
            header.style.transform = 'translateY(0)';
        }
        lastScrollTop = currentScroll;
    } else {
        header.style.transform = 'translateY(0)';
    }
});

// Add a scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: var(--primary-color);
    color: white;
    font-size: 24px;
    border: none;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s, transform 0.3s;
    z-index: 999;
    transform: translateY(20px);
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 500) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.transform = 'translateY(0)';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.transform = 'translateY(20px)';
    }
});

scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add text typing animation
const titles = document.querySelectorAll('.section-title');
titles.forEach(title => {
    // Store original text
    const originalText = title.textContent;
    const words = originalText.split(' ');
    
    // Replace with spans for word-by-word animation
    title.innerHTML = '';
    words.forEach((word, index) => {
        const span = document.createElement('span');
        span.className = 'word';
        span.textContent = word;
        span.style.opacity = '0';
        span.style.transition = `opacity 0.5s ${index * 0.1}s ease`;
        span.style.display = 'inline-block';
        span.style.marginRight = '10px';
        title.appendChild(span);
    });
    
    // Add intersection observer to animate when in viewport
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const wordSpans = entry.target.querySelectorAll('.word');
                wordSpans.forEach(span => {
                    span.style.opacity = '1';
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(title);
});

// Function to initialize hero image scroll effect
function initHeroImageEffect() {
    const heroSection = document.querySelector('.hero');
    const heroImage = document.getElementById('heroImage');
    
    if (!heroSection || !heroImage) return;
    
    // 确保页面加载时图片大小正常
    heroImage.style.transform = 'scale(1)';
    
    // 重置图片大小的函数，在滚动位置重置时调用
    const resetImageSize = () => {
        heroImage.style.transform = 'scale(1)';
    };
    
    // 初始调用一次
    resetImageSize();
    
    // 当页面刷新或加载完成时重置图片大小
    window.addEventListener('load', resetImageSize);
    document.addEventListener('DOMContentLoaded', resetImageSize);
    
    const sectionHeight = heroSection.offsetHeight;
    const viewportHeight = window.innerHeight;
    
    window.addEventListener('scroll', function() {
        // Get the section's position relative to the viewport
        const rect = heroSection.getBoundingClientRect();
        
        // 如果用户滚动回顶部或接近顶部，重置图片大小
        if (window.scrollY < 50) {
            resetImageSize();
            return;
        }
        
        // Calculate the scroll progress within the section (0 to 1)
        let scrollProgress = 1 - rect.top / (sectionHeight - viewportHeight);
        scrollProgress = Math.max(0, Math.min(1, scrollProgress));
        
        // First phase: Keep image at normal size until 30% scrolled
        let scale = 1;
        
        // Second phase: Scale up from 1 to 1.25 between 30% and 70% scroll (减小最大缩放值)
        if (scrollProgress > 0.3 && scrollProgress < 0.7) {
            scale = 1 + (scrollProgress - 0.3) * (0.25 / 0.4);
        } 
        // Third phase: Keep maximum scale after 70% scroll
        else if (scrollProgress >= 0.7) {
            scale = 1.25;
        }
        
        // Apply the transformation
        heroImage.style.transform = `scale(${scale})`;
    });
} 