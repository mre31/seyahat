/**
 * Üçyıldız Seyahat - Hakkımızda Sayfası JavaScript Dosyası
 * Animasyonlar ve etkileşimler için
 */

document.addEventListener('DOMContentLoaded', function() {
    // İstatistik sayaçları için değişkenler
    const statNumbers = document.querySelectorAll('.stat-number');
    let counted = false;
    
    // Sayfa yüklendiğinde hero görselini animasyonla göster
    setTimeout(() => {
        document.querySelector('.page-hero h1').classList.add('active');
    }, 300);
    
    // Scroll olayını dinle
    window.addEventListener('scroll', function() {
        // İstatistik bölümü görünür olduğunda sayaçları başlat
        if (!counted) {
            const statsSection = document.querySelector('.stats-section');
            if (statsSection) {
                const statsSectionTop = statsSection.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (statsSectionTop < windowHeight - 100) {
                    startCounting();
                    counted = true;
                }
            }
        }
    });
    
    // İstatistik sayaçlarını başlat
    function startCounting() {
        statNumbers.forEach(statNumber => {
            const target = parseInt(statNumber.getAttribute('data-count'));
            const duration = 2000; // 2 saniye
            
            let start = 0;
            const increment = target / (duration / 16); // 60fps için
            
            const timer = setInterval(() => {
                start += increment;
                
                if (start >= target) {
                    statNumber.textContent = formatNumber(target);
                    clearInterval(timer);
                } else {
                    statNumber.textContent = formatNumber(Math.floor(start));
                }
            }, 16);
        });
    }
    
    // Sayıları formatla (1000 -> 1,000)
    function formatNumber(number) {
        if (number >= 1000000) {
            return (number / 1000000).toFixed(1) + 'M';
        } else if (number >= 1000) {
            return (number / 1000).toFixed(0) + 'K';
        }
        return number.toString();
    }
    
    // Zaman çizelgesi animasyonu
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    item.classList.add('active');
                    observer.unobserve(item);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(item);
    });
    
    // Değerler kartları için hover efekti
    const valueCards = document.querySelectorAll('.value-card');
    
    valueCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.value-icon i');
            icon.classList.add('fa-bounce');
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.value-icon i');
            icon.classList.remove('fa-bounce');
        });
    });
    
    // Ekip kartları için hover efekti
    const teamCards = document.querySelectorAll('.team-card');
    
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const socialIcons = this.querySelectorAll('.team-social a');
            socialIcons.forEach((icon, index) => {
                setTimeout(() => {
                    icon.style.transform = 'translateY(-5px)';
                }, 100 * index);
            });
        });
        
        card.addEventListener('mouseleave', function() {
            const socialIcons = this.querySelectorAll('.team-social a');
            socialIcons.forEach(icon => {
                icon.style.transform = '';
            });
        });
    });
    
    // Müşteri yorumları için basit slider
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    let currentTestimonial = 0;
    
    // Mobil cihazlarda otomatik slider
    if (window.innerWidth < 768) {
        setInterval(() => {
            testimonialItems.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'translateX(50px)';
            });
            
            setTimeout(() => {
                currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
                testimonialItems[currentTestimonial].style.opacity = '1';
                testimonialItems[currentTestimonial].style.transform = 'translateX(0)';
            }, 500);
        }, 5000);
    }
}); 