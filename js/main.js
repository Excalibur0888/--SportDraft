document.addEventListener('DOMContentLoaded', () => {
    // Age Verification
    const ageVerifyModal = document.getElementById('ageVerifyModal');
    
    if (ageVerifyModal) {
        const confirmAgeBtn = document.getElementById('confirmAge');
        const rejectAgeBtn = document.getElementById('rejectAge');

        // Check if age verification was already done
        const isAgeVerified = localStorage.getItem('ageVerified');

        // Show modal only if age hasn't been verified (null) or was explicitly rejected ('false')
        if (isAgeVerified !== 'true') {
            ageVerifyModal.style.display = 'flex';
        } else {
            ageVerifyModal.style.display = 'none';
        }

        confirmAgeBtn.addEventListener('click', () => {
            localStorage.setItem('ageVerified', 'true');
            ageVerifyModal.style.display = 'none';
        });

        rejectAgeBtn.addEventListener('click', () => {
            localStorage.setItem('ageVerified', 'false');
            window.location.href = 'https://www.google.com';
        });
    }

    // Mobile Menu Toggle - Enhanced for all screen sizes and page types
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            // Toggle the active class on the navigation links
            navLinks.classList.toggle('active');
            
            // Toggle the active class on the menu toggle button
            this.classList.toggle('active');
            
            
            // Force the navigation to be visible if active class is present
            if (navLinks.classList.contains('active')) {
                navLinks.style.transform = 'translateY(0)';
                navLinks.style.opacity = '1';
                navLinks.style.pointerEvents = 'auto';
            } else {
                navLinks.style.transform = '';
                navLinks.style.opacity = '';
                navLinks.style.pointerEvents = '';
            }
        });
    }

    // Countdown Timer
    const countdownElements = document.querySelectorAll('.countdown');
    
    function updateCountdown() {
        countdownElements.forEach(element => {
            const timeLeft = element.textContent;
            const [hours, minutes] = timeLeft.split('h ');
            let totalMinutes = parseInt(hours) * 60 + parseInt(minutes);
            
            if (totalMinutes > 0) {
                totalMinutes--;
                const newHours = Math.floor(totalMinutes / 60);
                const newMinutes = totalMinutes % 60;
                element.textContent = `${newHours}h ${newMinutes}m`;
            }
        });
    }

    setInterval(updateCountdown, 60000); // Update every minute

    // Smooth Scroll
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

    // Floating Animation for Cards
    const floatingCards = document.querySelectorAll('.floating-cards .stat-card, .floating-cards .player-card');
    
    floatingCards.forEach(card => {
        card.style.animationDelay = `${Math.random() * 2}s`;
    });

    // Progress Bar Animation
    const progressBars = document.querySelectorAll('.progress');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.parentElement.dataset.progress || entry.target.style.width;
                entry.target.style.width = width;
            }
        });
    }, observerOptions);

    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });

    // Header Scroll Effect
    const header = document.querySelector('.main-header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }

        lastScroll = currentScroll;
    });

    // Tournament Card Hover Effect
    const tournamentCards = document.querySelectorAll('.tournament-card');

    tournamentCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Feature Card Animation
    const featureCards = document.querySelectorAll('.feature-card');
    
    const featureObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.5 });

    featureCards.forEach(card => {
        featureObserver.observe(card);
    });

    // Mobile Detection
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
        document.body.classList.add('is-mobile');
    }

    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        // Initially hide all answers except the first one
        faqItems.forEach((item, index) => {
            const question = item.querySelector('h3');
            const answer = item.querySelector('p');
            
            // Add cursor pointer to entire faq-item
            item.style.cursor = 'pointer';
            
            // Initially hide all answers except the first one
            if (index > 0) {
                answer.style.display = 'none';
            }
            
            // Add initial arrow to all items
            if (!question.querySelector('.faq-arrow')) {
                const arrow = document.createElement('span');
                arrow.className = 'faq-arrow';
                arrow.innerHTML = index === 0 ? '▼' : '▶';
                arrow.style.position = 'absolute';
                arrow.style.right = '0';
                arrow.style.top = '50%';
                arrow.style.transform = 'translateY(-50%)';
                arrow.style.fontSize = '12px';
                arrow.style.color = 'var(--primary)';
                question.style.paddingRight = '20px';
                question.style.position = 'relative';
                question.appendChild(arrow);
            }
            
            // Add active class to first item
            if (index === 0) {
                question.classList.add('active');
            }
            
            // Add click event to the entire FAQ item
            item.addEventListener('click', function() {
                const question = this.querySelector('h3');
                const answer = this.querySelector('p');
                const arrow = question.querySelector('.faq-arrow');
                
                // Toggle the current answer
                if (answer.style.display === 'none' || answer.style.display === '') {
                    answer.style.display = 'block';
                    question.classList.add('active');
                    if (arrow) {
                        arrow.innerHTML = '▼';
                    }
                } else {
                    answer.style.display = 'none';
                    question.classList.remove('active');
                    if (arrow) {
                        arrow.innerHTML = '▶';
                    }
                }
            });
        });
    }
}); 