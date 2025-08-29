// Advanced Features JavaScript

// AI Assistant Class
class AIAssistant {
    constructor() {
        this.isActive = false;
        this.recognition = null;
        this.synthesis = window.speechSynthesis;
        this.responses = {
            greeting: ["Hello! I'm Sharad's AI assistant. How can I help you today?", "Hi there! What would you like to know about Sharad's work?"],
            skills: ["Sharad specializes in C++, JavaScript, Python, React, and AI/ML technologies.", "He's proficient in full-stack development with modern frameworks."],
            projects: ["Sharad has worked on various projects including AI chatbots, VR experiences, and web applications.", "Check out his portfolio section for detailed project information."],
            contact: ["You can reach Sharad at sharad.gahule@email.com or use the contact form below.", "Feel free to connect via the contact section!"],
            default: ["That's an interesting question! You can explore more about Sharad's work on this website.", "I'm here to help! Try asking about his skills, projects, or contact information."]
        };
        this.init();
    }

    init() {
        const aiToggle = document.querySelector('.ai-toggle');
        const aiChat = document.querySelector('.ai-chat');
        const closeChat = document.querySelector('.close-chat');
        const sendBtn = document.getElementById('send-btn');
        const voiceBtn = document.getElementById('voice-btn');
        const chatInput = document.getElementById('chat-input');

        aiToggle.addEventListener('click', () => this.toggleChat());
        closeChat.addEventListener('click', () => this.closeChat());
        sendBtn.addEventListener('click', () => this.sendMessage());
        voiceBtn.addEventListener('click', () => this.toggleVoiceRecognition());
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        this.initVoiceRecognition();
        this.addWelcomeMessage();
    }

    toggleChat() {
        const aiChat = document.querySelector('.ai-chat');
        aiChat.classList.toggle('active');
        this.isActive = !this.isActive;
    }

    closeChat() {
        const aiChat = document.querySelector('.ai-chat');
        aiChat.classList.remove('active');
        this.isActive = false;
    }

    addWelcomeMessage() {
        setTimeout(() => {
            this.addMessage('ai', this.responses.greeting[0]);
        }, 1000);
    }

    sendMessage() {
        const chatInput = document.getElementById('chat-input');
        const message = chatInput.value.trim();
        
        if (message) {
            this.addMessage('user', message);
            chatInput.value = '';
            
            setTimeout(() => {
                const response = this.generateResponse(message);
                this.addMessage('ai', response);
                this.speak(response);
            }, 1000);
        }
    }

    addMessage(sender, text) {
        const chatMessages = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    generateResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            return this.getRandomResponse('greeting');
        } else if (lowerMessage.includes('skill') || lowerMessage.includes('technology')) {
            return this.getRandomResponse('skills');
        } else if (lowerMessage.includes('project') || lowerMessage.includes('work')) {
            return this.getRandomResponse('projects');
        } else if (lowerMessage.includes('contact') || lowerMessage.includes('email')) {
            return this.getRandomResponse('contact');
        } else {
            return this.getRandomResponse('default');
        }
    }

    getRandomResponse(category) {
        const responses = this.responses[category];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    initVoiceRecognition() {
        if ('webkitSpeechRecognition' in window) {
            this.recognition = new webkitSpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = 'en-US';

            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                document.getElementById('chat-input').value = transcript;
                this.sendMessage();
            };
        }
    }

    toggleVoiceRecognition() {
        if (this.recognition) {
            this.recognition.start();
            this.showNotification('Listening...', 'info');
        } else {
            this.showNotification('Voice recognition not supported', 'error');
        }
    }

    speak(text) {
        if (this.synthesis) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.8;
            utterance.pitch = 1;
            this.synthesis.speak(utterance);
        }
    }

    showNotification(message, type = 'info') {
        const container = document.getElementById('notification-container');
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        container.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Theme Switcher Class
class ThemeSwitcher {
    constructor() {
        this.themes = {
            cyber: {
                primary: '#00ff41',
                secondary: '#0d7377',
                background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)'
            },
            neon: {
                primary: '#ff0080',
                secondary: '#00ff80',
                background: 'linear-gradient(135deg, #2d1b69 0%, #11998e 100%)'
            },
            matrix: {
                primary: '#00ff00',
                secondary: '#008000',
                background: 'linear-gradient(135deg, #000000 0%, #0d4f0d 100%)'
            },
            hologram: {
                primary: '#00ffff',
                secondary: '#ff00ff',
                background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)'
            }
        };
        this.init();
    }

    init() {
        const themeToggle = document.getElementById('theme-toggle');
        const themeOptions = document.querySelector('.theme-options');
        const themeButtons = document.querySelectorAll('.theme-option');

        themeToggle.addEventListener('click', () => {
            themeOptions.classList.toggle('active');
        });

        themeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const theme = button.dataset.theme;
                this.applyTheme(theme);
                themeOptions.classList.remove('active');
            });
        });
    }

    applyTheme(themeName) {
        const theme = this.themes[themeName];
        const root = document.documentElement;
        
        root.style.setProperty('--primary-color', theme.primary);
        root.style.setProperty('--secondary-color', theme.secondary);
        document.body.style.background = theme.background;
        
        // Update gradients
        const gradientElements = document.querySelectorAll('.gradient-text, .btn-primary');
        gradientElements.forEach(el => {
            el.style.background = `linear-gradient(45deg, ${theme.primary}, ${theme.secondary})`;
            if (el.classList.contains('gradient-text')) {
                el.style.webkitBackgroundClip = 'text';
                el.style.webkitTextFillColor = 'transparent';
            }
        });

        this.showNotification(`${themeName.charAt(0).toUpperCase() + themeName.slice(1)} theme applied!`, 'success');
    }

    showNotification(message, type) {
        const container = document.getElementById('notification-container');
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        container.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Advanced Animations Class
class AdvancedAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.initCounterAnimation();
        this.initHologramMode();
        this.initSkillsRadar();
        this.initPortfolioFilter();
        this.initTestimonialCarousel();
        this.initAnalyticsDashboard();
    }

    initCounterAnimation() {
        const counters = document.querySelectorAll('.stat-number');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.dataset.target);
                    this.animateCounter(counter, target);
                }
            });
        });

        counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            element.textContent = Math.floor(current);
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 20);
    }

    initHologramMode() {
        const hologramBtn = document.getElementById('hologram-mode');
        const hologramDisplay = document.getElementById('hologram-display');

        hologramBtn.addEventListener('click', () => {
            hologramDisplay.classList.toggle('active');
            if (hologramDisplay.classList.contains('active')) {
                hologramBtn.textContent = 'Exit Hologram';
                this.showNotification('Hologram mode activated!', 'success');
            } else {
                hologramBtn.textContent = '3D Hologram';
                this.showNotification('Hologram mode deactivated', 'info');
            }
        });
    }

    initSkillsRadar() {
        const canvas = document.getElementById('skills-radar-chart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 150;

        const skills = [
            { name: 'JavaScript', level: 90 },
            { name: 'C++', level: 85 },
            { name: 'Python', level: 80 },
            { name: 'React', level: 88 },
            { name: 'AI/ML', level: 75 }
        ];

        this.drawRadarChart(ctx, centerX, centerY, radius, skills);
    }

    drawRadarChart(ctx, centerX, centerY, radius, skills) {
        const angleStep = (2 * Math.PI) / skills.length;
        
        // Draw background circles
        ctx.strokeStyle = 'rgba(78, 205, 196, 0.2)';
        for (let i = 1; i <= 5; i++) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, (radius / 5) * i, 0, 2 * Math.PI);
            ctx.stroke();
        }

        // Draw skill data
        ctx.fillStyle = 'rgba(78, 205, 196, 0.3)';
        ctx.strokeStyle = '#4ecdc4';
        ctx.beginPath();

        skills.forEach((skill, index) => {
            const angle = angleStep * index - Math.PI / 2;
            const skillRadius = (radius * skill.level) / 100;
            const x = centerX + Math.cos(angle) * skillRadius;
            const y = centerY + Math.sin(angle) * skillRadius;

            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }

            // Draw skill labels
            const labelX = centerX + Math.cos(angle) * (radius + 20);
            const labelY = centerY + Math.sin(angle) * (radius + 20);
            ctx.fillStyle = '#4ecdc4';
            ctx.font = '12px Poppins';
            ctx.textAlign = 'center';
            ctx.fillText(skill.name, labelX, labelY);
        });

        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

    initPortfolioFilter() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.dataset.category === filter) {
                        item.style.display = 'block';
                        item.style.animation = 'fadeInUp 0.5s ease';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    initTestimonialCarousel() {
        const testimonials = document.querySelectorAll('.testimonial-card');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        let currentIndex = 0;

        const showTestimonial = (index) => {
            testimonials.forEach((testimonial, i) => {
                testimonial.classList.toggle('active', i === index);
            });
        };

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentIndex);
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        });

        // Auto-rotate testimonials
        setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        }, 5000);
    }

    initAnalyticsDashboard() {
        this.animateVisitorCount();
        this.animatePerformanceScore();
        this.animateWorldMap();
    }

    animateVisitorCount() {
        const visitorsElement = document.getElementById('visitors-count');
        if (visitorsElement) {
            this.animateCounter(visitorsElement, 1247);
        }
    }

    animatePerformanceScore() {
        const scoreElement = document.getElementById('performance-score');
        if (scoreElement) {
            this.animateCounter(scoreElement, 98);
        }
    }

    animateWorldMap() {
        const worldMap = document.getElementById('world-map');
        if (worldMap) {
            // Add pulsing dots for different countries
            const dots = ['🔴', '🟢', '🔵', '🟡', '🟣'];
            dots.forEach((dot, index) => {
                setTimeout(() => {
                    const dotElement = document.createElement('span');
                    dotElement.textContent = dot;
                    dotElement.style.position = 'absolute';
                    dotElement.style.left = `${20 + index * 15}%`;
                    dotElement.style.top = `${30 + index * 10}%`;
                    dotElement.style.animation = 'pulse 2s ease-in-out infinite';
                    worldMap.appendChild(dotElement);
                }, index * 500);
            });
        }
    }

    showNotification(message, type) {
        const container = document.getElementById('notification-container');
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        container.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Voice Commands Class
class VoiceCommands {
    constructor() {
        this.recognition = null;
        this.isListening = false;
        this.commands = {
            'scroll to top': () => window.scrollTo({ top: 0, behavior: 'smooth' }),
            'scroll to about': () => document.getElementById('about').scrollIntoView({ behavior: 'smooth' }),
            'scroll to portfolio': () => document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' }),
            'scroll to contact': () => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' }),
            'open chat': () => document.querySelector('.ai-toggle').click(),
            'change theme': () => document.getElementById('theme-toggle').click(),
            'play music': () => document.getElementById('music-toggle').click(),
            'hologram mode': () => document.getElementById('hologram-mode').click()
        };
        this.init();
    }

    init() {
        if ('webkitSpeechRecognition' in window) {
            this.recognition = new webkitSpeechRecognition();
            this.recognition.continuous = true;
            this.recognition.interimResults = false;
            this.recognition.lang = 'en-US';

            this.recognition.onresult = (event) => {
                const command = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
                this.executeCommand(command);
            };

            const voiceControlBtn = document.getElementById('voice-control');
            voiceControlBtn.addEventListener('click', () => this.toggleVoiceControl());
        }
    }

    toggleVoiceControl() {
        if (this.isListening) {
            this.recognition.stop();
            this.isListening = false;
            this.showNotification('Voice control disabled', 'info');
        } else {
            this.recognition.start();
            this.isListening = true;
            this.showNotification('Voice control enabled - Try saying commands!', 'success');
        }
    }

    executeCommand(command) {
        const matchedCommand = Object.keys(this.commands).find(cmd => 
            command.includes(cmd.toLowerCase())
        );

        if (matchedCommand) {
            this.commands[matchedCommand]();
            this.showNotification(`Command executed: ${matchedCommand}`, 'success');
        } else {
            this.showNotification('Command not recognized', 'error');
        }
    }

    showNotification(message, type) {
        const container = document.getElementById('notification-container');
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        container.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Music Player Class
class MusicPlayer {
    constructor() {
        this.isPlaying = false;
        this.audioContext = null;
        this.oscillator = null;
        this.gainNode = null;
        this.init();
    }

    init() {
        const musicToggle = document.getElementById('music-toggle');
        const volumeSlider = document.getElementById('volume-slider');

        musicToggle.addEventListener('click', () => this.toggleMusic());
        volumeSlider.addEventListener('input', (e) => this.setVolume(e.target.value / 100));

        this.initAudioContext();
    }

    initAudioContext() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.gainNode = this.audioContext.createGain();
            this.gainNode.connect(this.audioContext.destination);
            this.gainNode.gain.value = 0.5;
        } catch (error) {
            console.log('Web Audio API not supported');
        }
    }

    toggleMusic() {
        if (this.isPlaying) {
            this.stopMusic();
        } else {
            this.playMusic();
        }
    }

    playMusic() {
        if (!this.audioContext) return;

        this.oscillator = this.audioContext.createOscillator();
        this.oscillator.connect(this.gainNode);
        this.oscillator.type = 'sine';
        this.oscillator.frequency.setValueAtTime(220, this.audioContext.currentTime);
        
        // Create a simple ambient melody
        this.playAmbientMelody();
        
        this.isPlaying = true;
        this.showNotification('Ambient music started', 'success');
    }

    playAmbientMelody() {
        const notes = [220, 246.94, 261.63, 293.66, 329.63];
        let noteIndex = 0;

        const playNote = () => {
            if (this.isPlaying && this.oscillator) {
                this.oscillator.frequency.setValueAtTime(notes[noteIndex], this.audioContext.currentTime);
                noteIndex = (noteIndex + 1) % notes.length;
                setTimeout(playNote, 2000);
            }
        };

        this.oscillator.start();
        playNote();
    }

    stopMusic() {
        if (this.oscillator) {
            this.oscillator.stop();
            this.oscillator = null;
        }
        this.isPlaying = false;
        this.showNotification('Music stopped', 'info');
    }

    setVolume(volume) {
        if (this.gainNode) {
            this.gainNode.gain.value = volume;
        }
    }

    showNotification(message, type) {
        const container = document.getElementById('notification-container');
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        container.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Loading Screen Manager
class LoadingManager {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const loadingScreen = document.getElementById('loading-screen');
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 1000);
            }, 2000);
        });
    }
}

// Initialize all advanced features
document.addEventListener('DOMContentLoaded', () => {
    new LoadingManager();
    new AIAssistant();
    new ThemeSwitcher();
    new AdvancedAnimations();
    new VoiceCommands();
    new MusicPlayer();

    // Add particles.js configuration
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80 },
                color: { value: '#4ecdc4' },
                shape: { type: 'circle' },
                opacity: { value: 0.5 },
                size: { value: 3 },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'repulse' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                }
            },
            retina_detect: true
        });
    }

    // Enhanced cursor trail
    const cursor = document.getElementById('cursor-trail');
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        if (cursor) {
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
        }
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
});