// 3D Background Animation with Three.js
class Background3D {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: document.getElementById('bg-canvas'),
            alpha: true 
        });
        
        this.init();
        this.createParticles();
        this.animate();
        this.handleResize();
    }
    
    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.camera.position.z = 5;
    }
    
    createParticles() {
        const geometry = new THREE.BufferGeometry();
        const particleCount = 1000;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 20;
            positions[i + 1] = (Math.random() - 0.5) * 20;
            positions[i + 2] = (Math.random() - 0.5) * 20;
            
            colors[i] = Math.random();
            colors[i + 1] = Math.random() * 0.5 + 0.5;
            colors[i + 2] = 1;
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        const material = new THREE.PointsMaterial({
            size: 0.05,
            vertexColors: true,
            transparent: true,
            opacity: 0.8
        });
        
        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
        
        // Add floating cubes
        this.createFloatingCubes();
    }
    
    createFloatingCubes() {
        this.cubes = [];
        for (let i = 0; i < 5; i++) {
            const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
            const material = new THREE.MeshBasicMaterial({
                color: new THREE.Color().setHSL(Math.random(), 0.7, 0.6),
                transparent: true,
                opacity: 0.3,
                wireframe: true
            });
            
            const cube = new THREE.Mesh(geometry, material);
            cube.position.set(
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10
            );
            
            this.cubes.push(cube);
            this.scene.add(cube);
        }
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        // Rotate particles
        this.particles.rotation.x += 0.001;
        this.particles.rotation.y += 0.002;
        
        // Animate cubes
        this.cubes.forEach((cube, index) => {
            cube.rotation.x += 0.01 + index * 0.001;
            cube.rotation.y += 0.01 + index * 0.001;
            cube.position.y += Math.sin(Date.now() * 0.001 + index) * 0.001;
        });
        
        this.renderer.render(this.scene, this.camera);
    }
    
    handleResize() {
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
}

// Smooth Scrolling
class SmoothScroll {
    constructor() {
        this.init();
    }
    
    init() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
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
}

// Skill Bar Animation
class SkillAnimation {
    constructor() {
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBars = entry.target.querySelectorAll('.skill-progress');
                    skillBars.forEach(bar => {
                        const width = bar.getAttribute('data-width');
                        bar.style.setProperty('--width', width);
                        bar.style.width = width;
                    });
                }
            });
        });
        
        const skillsSection = document.querySelector('.skills');
        if (skillsSection) {
            observer.observe(skillsSection);
        }
    }
}

// Parallax Effect
class ParallaxEffect {
    constructor() {
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.floating-cube');
            
            parallaxElements.forEach(element => {
                const speed = 0.5;
                element.style.transform = `translateY(${scrolled * speed}px) rotateX(${scrolled * 0.1}deg) rotateY(${scrolled * 0.1}deg)`;
            });
        });
    }
}

// Navbar Scroll Effect
class NavbarEffect {
    constructor() {
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(0, 0, 0, 0.95)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.style.background = 'rgba(0, 0, 0, 0.9)';
                navbar.style.boxShadow = 'none';
            }
        });
    }
}

// Card Hover Effects
class CardEffects {
    constructor() {
        this.init();
    }
    
    init() {
        const cards = document.querySelectorAll('.service-card, .portfolio-item');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
                
                card.style.background = `
                    radial-gradient(circle at var(--mouse-x) var(--mouse-y), 
                    rgba(255, 107, 107, 0.2) 0%, 
                    rgba(78, 205, 196, 0.1) 50%, 
                    rgba(255, 255, 255, 0.1) 100%)
                `;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.background = 'rgba(255, 255, 255, 0.1)';
            });
        });
    }
}

// Form Handling
class FormHandler {
    constructor() {
        this.init();
    }
    
    init() {
        const form = document.querySelector('.contact-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit(form);
            });
        }
    }
    
    handleSubmit(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = 'linear-gradient(45deg, #4ecdc4, #45b7d1)';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4)';
                form.reset();
            }, 2000);
        }, 1500);
    }
}

// Typing Animation
class TypingAnimation {
    constructor() {
        this.init();
    }
    
    init() {
        const subtitle = document.querySelector('.hero-subtitle');
        if (subtitle) {
            const text = subtitle.textContent;
            subtitle.textContent = '';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    subtitle.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                }
            };
            
            setTimeout(typeWriter, 1000);
        }
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Background3D();
    new SmoothScroll();
    new SkillAnimation();
    new ParallaxEffect();
    new NavbarEffect();
    new CardEffects();
    new FormHandler();
    new TypingAnimation();
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Performance optimization
window.addEventListener('load', () => {
    // Preload critical resources
    const criticalImages = document.querySelectorAll('img[data-src]');
    criticalImages.forEach(img => {
        img.src = img.dataset.src;
    });
});

// Add mouse trail effect
class MouseTrail {
    constructor() {
        this.trail = [];
        this.maxTrail = 20;
        this.init();
    }
    
    init() {
        document.addEventListener('mousemove', (e) => {
            this.trail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
            
            if (this.trail.length > this.maxTrail) {
                this.trail.shift();
            }
            
            this.updateTrail();
        });
    }
    
    updateTrail() {
        const existingTrails = document.querySelectorAll('.mouse-trail');
        existingTrails.forEach(trail => trail.remove());
        
        this.trail.forEach((point, index) => {
            const trailElement = document.createElement('div');
            trailElement.className = 'mouse-trail';
            trailElement.style.cssText = `
                position: fixed;
                left: ${point.x}px;
                top: ${point.y}px;
                width: ${10 - index * 0.5}px;
                height: ${10 - index * 0.5}px;
                background: radial-gradient(circle, rgba(78, 205, 196, ${1 - index * 0.05}) 0%, transparent 70%);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                transform: translate(-50%, -50%);
            `;
            
            document.body.appendChild(trailElement);
            
            setTimeout(() => {
                trailElement.remove();
            }, 1000);
        });
    }
}

// Initialize mouse trail
new MouseTrail();