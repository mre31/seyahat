/**
 * Üçyıldız Seyahat - Hizmetlerimiz Sayfası JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Sayfa yüklendiğinde preloader'ı kaldır
    setTimeout(function() {
        document.querySelector('.preloader').classList.add('loaded');
        document.body.classList.add('loaded');
    }, 500);

    // Scroll animasyonları için gözlemci
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // Hizmet kartları için hover efekti
    const serviceCards = document.querySelectorAll('.service-card-large');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hovered');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hovered');
        });
    });

    // Mobil menü toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        mainNav.classList.toggle('active');
    });

    // Scroll olduğunda header'ı güncelle
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}); 