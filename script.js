// Gamana Studio - Interactive Gaming Elements
document.addEventListener('DOMContentLoaded', function() {
    
    // Create custom cursor
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    document.body.appendChild(cursor);
    
    // Create cursor trail
    const cursorTrail = document.createElement('div');
    cursorTrail.className = 'cursor-trail';
    document.body.appendChild(cursorTrail);
    
    // Digital codes that will be revealed
    const digitalCodes = [
        '01001000', '01100101', '01101100', '01101100', '01101111',
        '01000111', '01100001', '01101101', '01100001', '01101110',
        '01100001', '01010110', '01010010', '01000001', '01010010',
        '00110001', '00110010', '00110011', '00110100', '00110101',
        '01100001', '01100010', '01100011', '01100100', '01100101',
        '01000110', '01000111', '01001000', '01001001', '01001010'
    ];
    
    let mouseX = 0;
    let mouseY = 0;
    let trailX = 0;
    let trailY = 0;
    
    // Mouse move handler
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Update cursor position (center the flashlight)
        cursor.style.left = mouseX - 100 + 'px';
        cursor.style.top = mouseY - 100 + 'px';
        
        // Reveal codes within flashlight radius
        revealCodesInRadius(mouseX, mouseY);
        
        // Update trail with smooth following
        requestAnimationFrame(() => {
            trailX += (mouseX - trailX) * 0.1;
            trailY += (mouseY - trailY) * 0.1;
            cursorTrail.style.left = trailX - 2 + 'px';
            cursorTrail.style.top = trailY - 2 + 'px';
        });
    });
    
    // Reveal codes within flashlight radius
    function revealCodesInRadius(x, y) {
        const codeLines = document.querySelectorAll('.code-line');
        const flashlightRadius = 120; // Increased radius for better coverage
        
        codeLines.forEach(codeLine => {
            const rect = codeLine.getBoundingClientRect();
            const codeX = rect.left + rect.width / 2;
            const codeY = rect.top + rect.height / 2;
            
            // Calculate distance from cursor to code
            const distance = Math.sqrt(Math.pow(x - codeX, 2) + Math.pow(y - codeY, 2));
            
            if (distance <= flashlightRadius) {
                // Reveal the code with intensity based on distance
                const intensity = 1 - (distance / flashlightRadius);
                
                // Different effects for different code types
                if (codeLine.classList.contains('special-code')) {
                    // Special codes get extra bright effect
                    codeLine.style.opacity = intensity * 1.2;
                    codeLine.style.color = `rgba(0, 255, 65, ${0.2 + intensity * 0.8})`;
                    codeLine.style.textShadow = `0 0 ${10 + intensity * 20}px rgba(0, 255, 65, ${0.4 + intensity * 0.6})`;
                    codeLine.style.transform = `scale(${1 + intensity * 0.2})`;
                } else if (codeLine.classList.contains('matrix-code')) {
                    // Matrix codes get a different color
                    codeLine.style.opacity = intensity * 0.8;
                    codeLine.style.color = `rgba(0, 255, 136, ${0.1 + intensity * 0.7})`;
                    codeLine.style.textShadow = `0 0 ${5 + intensity * 8}px rgba(0, 255, 136, ${0.2 + intensity * 0.6})`;
                } else {
                    // Regular codes
                    codeLine.style.opacity = intensity;
                    codeLine.style.color = `rgba(0, 255, 65, ${0.1 + intensity * 0.9})`;
                    codeLine.style.textShadow = `0 0 ${5 + intensity * 10}px rgba(0, 255, 65, ${0.2 + intensity * 0.8})`;
                }
            } else {
                // Hide the code
                codeLine.style.opacity = 0;
                codeLine.style.transform = 'scale(1)';
                
                // Reset to default colors based on type
                if (codeLine.classList.contains('special-code')) {
                    codeLine.style.color = 'rgba(0, 255, 65, 0.05)';
                    codeLine.style.textShadow = '0 0 8px rgba(0, 255, 65, 0.3)';
                } else if (codeLine.classList.contains('matrix-code')) {
                    codeLine.style.color = 'rgba(0, 255, 65, 0.08)';
                    codeLine.style.textShadow = '0 0 3px rgba(0, 255, 65, 0.2)';
                } else {
                    codeLine.style.color = 'rgba(0, 255, 65, 0.1)';
                    codeLine.style.textShadow = '0 0 5px rgba(0, 255, 65, 0.2)';
                }
            }
        });
    }
    
    // Cursor hover effects
    document.addEventListener('mouseenter', function(e) {
        if (e.target.tagName === 'A' || e.target.classList.contains('gaming-btn') || e.target.classList.contains('game-card')) {
            cursor.style.transform = 'scale(1.2)';
            cursor.style.background = 'radial-gradient(circle, rgba(255, 0, 64, 0.4) 0%, rgba(255, 0, 64, 0.2) 30%, transparent 70%)';
        }
    });
    
    document.addEventListener('mouseleave', function(e) {
        if (e.target.tagName === 'A' || e.target.classList.contains('gaming-btn') || e.target.classList.contains('game-card')) {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'radial-gradient(circle, rgba(0, 255, 65, 0.3) 0%, rgba(0, 255, 65, 0.1) 30%, transparent 70%)';
        }
    });
    
    // Add click effect with code burst
    document.addEventListener('click', function(e) {
        cursor.style.transform = 'scale(0.9)';
        setTimeout(() => {
            cursor.style.transform = 'scale(1)';
        }, 100);
        
        // Create a burst effect around the click
        createClickBurst(e.clientX, e.clientY);
    });
    
    // Create click burst effect
    function createClickBurst(x, y) {
        const codeLines = document.querySelectorAll('.code-line');
        const burstRadius = 150;
        
        codeLines.forEach(codeLine => {
            const rect = codeLine.getBoundingClientRect();
            const codeX = rect.left + rect.width / 2;
            const codeY = rect.top + rect.height / 2;
            const distance = Math.sqrt(Math.pow(x - codeX, 2) + Math.pow(y - codeY, 2));
            
            if (distance <= burstRadius) {
                // Create a temporary bright flash
                const intensity = 1 - (distance / burstRadius);
                codeLine.style.opacity = intensity * 1.5;
                codeLine.style.color = `rgba(0, 255, 65, ${0.3 + intensity * 0.7})`;
                codeLine.style.textShadow = `0 0 ${15 + intensity * 25}px rgba(0, 255, 65, ${0.6 + intensity * 0.4})`;
                codeLine.style.transform = `scale(${1 + intensity * 0.3})`;
                
                // Fade back to normal
                setTimeout(() => {
                    codeLine.style.opacity = 0;
                    codeLine.style.transform = 'scale(1)';
                }, 300);
            }
        });
    }
    
    // Add keyboard interaction
    document.addEventListener('keydown', function(e) {
        if (e.key === ' ') { // Spacebar
            e.preventDefault();
            // Create a random burst effect
            const randomX = Math.random() * window.innerWidth;
            const randomY = Math.random() * window.innerHeight;
            createClickBurst(randomX, randomY);
        }
    });
    
    // Animated counter for statistics
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = Math.floor(current);
            }, 16);
        });
    }
    
    // Animate progress bars
    function animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-fill, .skill-fill, .level-fill, .xp-fill');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const level = progressBar.getAttribute('data-level') || progressBar.getAttribute('data-progress');
                    progressBar.style.width = level + '%';
                    progressBar.classList.add('animated');
                }
            });
        });
        
        progressBars.forEach(bar => observer.observe(bar));
    }
    
    // Floating particles animation
    function createFloatingParticles() {
        const particlesContainer = document.querySelector('.particles-container');
        if (!particlesContainer) return;
        
        const particles = particlesContainer.querySelectorAll('.particle');
        
        particles.forEach((particle, index) => {
            // Random position and animation
            const randomX = Math.random() * 100;
            const randomY = Math.random() * 100;
            const randomDelay = Math.random() * 3;
            const randomDuration = 3 + Math.random() * 4;
            
            particle.style.left = randomX + '%';
            particle.style.top = randomY + '%';
            particle.style.animationDelay = randomDelay + 's';
            particle.style.animationDuration = randomDuration + 's';
        });
    }
    
    // Gaming button effects
    function addGamingButtonEffects() {
        const gamingButtons = document.querySelectorAll('.gaming-btn');
        
        gamingButtons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) scale(1.05)';
                this.style.boxShadow = '0 15px 35px rgba(0, 255, 136, 0.4)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 10px 25px rgba(0, 255, 136, 0.3)';
            });
            
            button.addEventListener('click', function(e) {
                // Create ripple effect
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }
    
    
    // Game card hover effects
    function addGameCardEffects() {
        const gameCards = document.querySelectorAll('.game-card');
        
        gameCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-15px) rotateX(5deg)';
                this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
                
                const playButton = this.querySelector('.play-button');
                if (playButton) {
                    playButton.style.transform = 'scale(1.2)';
                    playButton.style.opacity = '1';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) rotateX(0deg)';
                this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
                
                const playButton = this.querySelector('.play-button');
                if (playButton) {
                    playButton.style.transform = 'scale(1)';
                    playButton.style.opacity = '0.8';
                }
            });
        });
    }
    
    // Tech card animations
    function addTechCardEffects() {
        const techCards = document.querySelectorAll('.tech-card');
        
        techCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05) rotateY(5deg)';
                this.style.boxShadow = '0 15px 35px rgba(102, 126, 234, 0.3)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) rotateY(0deg)';
                this.style.boxShadow = '0 5px 20px rgba(102, 126, 234, 0.2)';
            });
        });
    }
    
    // Smooth scrolling for navigation
    function addSmoothScrolling() {
        const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // Form validation and effects
    function addFormEffects() {
        const form = document.querySelector('.gaming-form');
        if (!form) return;
        
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
        });
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<span class="btn-icon">✅</span><span class="btn-text">پیام ارسال شد!</span>';
            submitBtn.style.background = 'linear-gradient(45deg, #00ff88, #00d4ff)';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                this.reset();
            }, 3000);
        });
    }
    
    // Job application system
    function initJobApplicationSystem() {
        const applyButtons = document.querySelectorAll('.apply-btn');
        const detailsButtons = document.querySelectorAll('.details-btn');
        const generalApplicationBtn = document.getElementById('general-application');
        
        // Apply button handlers
        applyButtons.forEach(button => {
            button.addEventListener('click', function() {
                const jobType = this.getAttribute('data-job');
                showJobApplicationModal(jobType);
            });
        });
        
        // Details button handlers
        detailsButtons.forEach(button => {
            button.addEventListener('click', function() {
                const jobType = this.getAttribute('data-job');
                showJobDetailsModal(jobType);
            });
        });
        
        // General application handler
        if (generalApplicationBtn) {
            generalApplicationBtn.addEventListener('click', function() {
                showJobApplicationModal('general');
            });
        }
    }
    
    // Show job application modal
    function showJobApplicationModal(jobType) {
        const jobTitles = {
            'vr-developer': 'توسعه‌دهنده VR - Unity C#',
            'unreal-developer': 'توسعه‌دهنده Unreal Engine',
            'project-manager': 'مدیر پروژه',
            'general': 'ارسال رزومه عمومی'
        };
        
        const modal = createApplicationModal(jobTitles[jobType] || 'درخواست شغل', jobType);
        document.body.appendChild(modal);
        
        // Animate in
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }
    
    // Show job details modal
    function showJobDetailsModal(jobType) {
        const jobDetails = {
            'vr-developer': {
                title: 'توسعه‌دهنده VR - Unity C#',
                description: 'جزئیات کامل این موقعیت شغلی...',
                requirements: ['تجربه 2+ سال در Unity 3D', 'تسلط به C#', 'آشنایی با VR SDK ها'],
                benefits: ['حقوق رقابتی', 'بیمه تکمیلی', 'محیط کار خلاقانه']
            },
            'unreal-developer': {
                title: 'توسعه‌دهنده Unreal Engine',
                description: 'جزئیات کامل این موقعیت شغلی...',
                requirements: ['تجربه 3+ سال در Unreal Engine', 'تسلط به Blueprint و C++', 'آشنایی با ARCore/ARKit'],
                benefits: ['حقوق رقابتی', 'بیمه تکمیلی', 'محیط کار خلاقانه']
            },
            'project-manager': {
                title: 'مدیر پروژه',
                description: 'جزئیات کامل این موقعیت شغلی...',
                requirements: ['تجربه 4+ سال در مدیریت پروژه', 'آشنایی با Agile/Scrum', 'تجربه در صنعت بازی‌سازی'],
                benefits: ['حقوق رقابتی', 'بیمه تکمیلی', 'محیط کار خلاقانه']
            }
        };
        
        const details = jobDetails[jobType];
        if (details) {
            const modal = createDetailsModal(details);
            document.body.appendChild(modal);
            
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
        }
    }
    
    // Create application modal
    function createApplicationModal(title, jobType) {
        const modal = document.createElement('div');
        modal.className = 'job-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <form class="job-application-form">
                        <div class="form-group">
                            <label for="applicant-name">👤 نام و نام خانوادگی</label>
                            <input type="text" id="applicant-name" required>
                        </div>
                        <div class="form-group">
                            <label for="applicant-email">📧 ایمیل</label>
                            <input type="email" id="applicant-email" required>
                        </div>
                        <div class="form-group">
                            <label for="applicant-phone">📱 شماره تماس</label>
                            <input type="tel" id="applicant-phone" required>
                        </div>
                        <div class="form-group">
                            <label for="applicant-experience">💼 سال‌های تجربه</label>
                            <select id="applicant-experience" required>
                                <option value="">انتخاب کنید</option>
                                <option value="0-1">0-1 سال</option>
                                <option value="1-2">1-2 سال</option>
                                <option value="2-3">2-3 سال</option>
                                <option value="3-5">3-5 سال</option>
                                <option value="5+">5+ سال</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="applicant-skills">🛠️ مهارت‌های فنی</label>
                            <textarea id="applicant-skills" placeholder="مهارت‌های خود را بنویسید..." rows="3"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="applicant-portfolio">🔗 لینک پورتفولیو/گیت‌هاب</label>
                            <input type="url" id="applicant-portfolio" placeholder="https://...">
                        </div>
                        <div class="form-group">
                            <label for="applicant-message">💬 پیام اضافی</label>
                            <textarea id="applicant-message" placeholder="پیام خود را اینجا بنویسید..." rows="4"></textarea>
                        </div>
                        <div class="form-actions">
                            <button type="submit" class="btn btn-primary gaming-btn">
                                <span class="btn-icon">📤</span>
                                <span class="btn-text">ارسال درخواست</span>
                                <div class="btn-glow"></div>
                            </button>
                            <button type="button" class="btn btn-secondary gaming-btn close-modal">
                                <span class="btn-icon">❌</span>
                                <span class="btn-text">انصراف</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        // Add event listeners
        modal.querySelector('.close-btn').addEventListener('click', () => closeModal(modal));
        modal.querySelector('.close-modal').addEventListener('click', () => closeModal(modal));
        modal.querySelector('.modal-overlay').addEventListener('click', () => closeModal(modal));
        
        modal.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();
            submitApplication(jobType, this);
            closeModal(modal);
        });
        
        return modal;
    }
    
    // Create details modal
    function createDetailsModal(details) {
        const modal = document.createElement('div');
        modal.className = 'job-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${details.title}</h3>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="job-details">
                        <p>${details.description}</p>
                        <div class="requirements-section">
                            <h4>مهارت‌های مورد نیاز:</h4>
                            <ul>
                                ${details.requirements.map(req => `<li>${req}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="benefits-section">
                            <h4>مزایا:</h4>
                            <ul>
                                ${details.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add event listeners
        modal.querySelector('.close-btn').addEventListener('click', () => closeModal(modal));
        modal.querySelector('.modal-overlay').addEventListener('click', () => closeModal(modal));
        
        return modal;
    }
    
    // Close modal
    function closeModal(modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    }
    
    // Submit application
    function submitApplication(jobType, form) {
        const formData = new FormData(form);
        const applicationData = {
            jobType: jobType,
            name: form.querySelector('#applicant-name').value,
            email: form.querySelector('#applicant-email').value,
            phone: form.querySelector('#applicant-phone').value,
            experience: form.querySelector('#applicant-experience').value,
            skills: form.querySelector('#applicant-skills').value,
            portfolio: form.querySelector('#applicant-portfolio').value,
            message: form.querySelector('#applicant-message').value,
            timestamp: new Date().toISOString()
        };
        
        // Show success message
        showSuccessMessage('درخواست شما با موفقیت ارسال شد! به زودی با شما تماس خواهیم گرفت.');
        
        // In a real application, you would send this data to a server
        console.log('Application submitted:', applicationData);
    }
    
    // Show success message
    function showSuccessMessage(message) {
        const notification = document.createElement('div');
        notification.className = 'success-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">✅</span>
                <span class="notification-text">${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Initialize all effects
    function init() {
        animateCounters();
        animateProgressBars();
        createFloatingParticles();
        addGamingButtonEffects();
        addGameCardEffects();
        addTechCardEffects();
        addSmoothScrolling();
        addFormEffects();
        initJobApplicationSystem();
    }
    
    // Start the gaming experience!
    init();
    
    // Add some random gaming sounds effects (visual feedback)
    function addVisualFeedback() {
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('gaming-btn') || e.target.closest('.gaming-btn')) {
                // Create sparkle effect
                for (let i = 0; i < 5; i++) {
                    setTimeout(() => {
                        const sparkle = document.createElement('div');
                        sparkle.className = 'sparkle';
                        sparkle.style.left = e.clientX + (Math.random() - 0.5) * 100 + 'px';
                        sparkle.style.top = e.clientY + (Math.random() - 0.5) * 100 + 'px';
                        document.body.appendChild(sparkle);
                        
                        setTimeout(() => {
                            sparkle.remove();
                        }, 1000);
                    }, i * 100);
                }
            }
        });
    }
    
    addVisualFeedback();
});

// Add CSS for sparkle effect
const style = document.createElement('style');
style.textContent = `
    .sparkle {
        position: fixed;
        width: 4px;
        height: 4px;
        background: #00ff88;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        animation: sparkleAnimation 1s ease-out forwards;
    }
    
    @keyframes sparkleAnimation {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: scale(1) rotate(360deg);
            opacity: 0;
        }
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: rippleAnimation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes rippleAnimation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
