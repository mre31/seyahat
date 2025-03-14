/**
 * Üçyıldız Seyahat - Ana JavaScript Dosyası
 * Animasyonlar ve etkileşimler için
 */

document.addEventListener('DOMContentLoaded', function() {
    try {
        // Değişkenler
        const header = document.querySelector('.header');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const mainNav = document.querySelector('.main-nav');
        const fadeElements = document.querySelectorAll('.fade-in');
        
        // Sayfa yüklendiğinde animasyonları başlat
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 300);
        
        // Scroll olayını dinle
        window.addEventListener('scroll', function() {
            try {
                // Header'ı scroll durumuna göre güncelle
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                
                // Scroll animasyonlarını kontrol et
                checkScrollAnimations();
            } catch (error) {
                console.error('Scroll olayında hata:', error);
            }
        });
        
        // Mobil menü toggle
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', function() {
                try {
                    this.classList.toggle('active');
                    mainNav.classList.toggle('active');
                    
                    // Menü açıkken body scroll'u engelle
                    if (mainNav.classList.contains('active')) {
                        document.body.style.overflow = 'hidden';
                    } else {
                        document.body.style.overflow = '';
                    }
                } catch (error) {
                    console.error('Mobil menü olayında hata:', error);
                }
            });
        }
        
        // Scroll animasyonları için fonksiyon
        function checkScrollAnimations() {
            fadeElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('active');
                }
            });
        }
        
        // Sayfa ilk yüklendiğinde görünür elemanları aktifleştir
        checkScrollAnimations();
        
        // Smooth scroll için tüm iç bağlantıları seç
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                try {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    
                    // Eğer hedef # değilse scroll yap
                    if (targetId !== '#') {
                        const targetElement = document.querySelector(targetId);
                        
                        if (targetElement) {
                            // Mobil menü açıksa kapat
                            if (mainNav.classList.contains('active')) {
                                mobileMenuBtn.classList.remove('active');
                                mainNav.classList.remove('active');
                                document.body.style.overflow = '';
                            }
                            
                            // Hedef elemana smooth scroll
                            window.scrollTo({
                                top: targetElement.offsetTop - 80,
                                behavior: 'smooth'
                            });
                        }
                    }
                } catch (error) {
                    console.error('Smooth scroll olayında hata:', error);
                }
            });
        });
        
        // Sayfa yüklendiğinde hero bölümündeki görselleri sırayla göster
        const heroImages = document.querySelectorAll('.hero-images .image-container');
        
        if (heroImages.length > 0) {
            heroImages.forEach((img, index) => {
                setTimeout(() => {
                    img.classList.add('active');
                }, 500 + (index * 200));
            });
        }
        
        // Hizmet kartları için hover efekti
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.classList.add('hovered');
            });
            
            card.addEventListener('mouseleave', function() {
                this.classList.remove('hovered');
            });
        });

        // Hizmetlerimiz sayfası - Büyük hizmet kartları için hover efekti
        const serviceLargeCards = document.querySelectorAll('.service-card-large');
        
        serviceLargeCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.classList.add('hovered');
            });
            
            card.addEventListener('mouseleave', function() {
                this.classList.remove('hovered');
            });
        });

        // Kurumsal sayfası - Değer kartları için hover efekti
        const valueCards = document.querySelectorAll('.value-card');
        
        valueCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.classList.add('hovered');
            });
            
            card.addEventListener('mouseleave', function() {
                this.classList.remove('hovered');
            });
        });

        // Kurumsal sayfası - Misyon ve Vizyon kartları için hover efekti
        const missionVisionCards = document.querySelectorAll('.mission-card, .vision-card');
        
        missionVisionCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.classList.add('hovered');
            });
            
            card.addEventListener('mouseleave', function() {
                this.classList.remove('hovered');
            });
        });
        
        // İletişim formu doğrulama ve gönderme
        const contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                try {
                    e.preventDefault();
                    
                    // Form alanlarını al
                    const name = document.getElementById('name').value.trim();
                    const surname = document.getElementById('surname').value.trim();
                    const email = document.getElementById('email').value.trim();
                    const message = document.getElementById('message').value.trim();
                    
                    // Basit doğrulama
                    if (name === '' || surname === '' || email === '' || message === '') {
                        alert('Lütfen tüm alanları doldurun.');
                        return;
                    }
                    
                    // E-posta formatı doğrulama
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(email)) {
                        alert('Lütfen geçerli bir e-posta adresi girin.');
                        return;
                    }
                    
                    // Form verilerini hazırla (gerçek bir backend'e gönderilecek)
                    const formData = {
                        name,
                        surname,
                        email,
                        message
                    };
                    
                    // Normalde burada bir fetch veya AJAX isteği olacak
                    console.log('Form verileri:', formData);
                    
                    // Başarılı gönderim mesajı
                    alert('Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.');
                    
                    // Formu sıfırla
                    contactForm.reset();
                } catch (error) {
                    console.error('Form gönderiminde hata:', error);
                }
            });
        }
        
        // Sayfa yüklendikten sonra preloader'ı kaldır
        window.addEventListener('load', function() {
            try {
                const preloader = document.querySelector('.preloader');
                if (preloader) {
                    preloader.classList.add('loaded');
                    
                    setTimeout(() => {
                        preloader.style.display = 'none';
                    }, 500);
                }
            } catch (error) {
                console.error('Preloader kaldırma işleminde hata:', error);
            }
        });
    } catch (error) {
        console.error('JavaScript kodunda genel hata:', error);
    }
}); 