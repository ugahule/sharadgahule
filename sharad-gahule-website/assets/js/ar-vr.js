// AR/VR Features for Advanced Website

class ARVRExperience {
    constructor() {
        this.isARSupported = false;
        this.isVRSupported = false;
        this.arSession = null;
        this.vrSession = null;
        this.init();
    }

    init() {
        this.checkARSupport();
        this.checkVRSupport();
        this.setupARButton();
        this.setupVRExperience();
    }

    async checkARSupport() {
        if ('xr' in navigator) {
            try {
                this.isARSupported = await navigator.xr.isSessionSupported('immersive-ar');
                if (this.isARSupported) {
                    console.log('AR is supported!');
                    this.showNotification('AR Mode Available!', 'success');
                }
            } catch (error) {
                console.log('AR not supported:', error);
            }
        }
    }

    async checkVRSupport() {
        if ('xr' in navigator) {
            try {
                this.isVRSupported = await navigator.xr.isSessionSupported('immersive-vr');
                if (this.isVRSupported) {
                    console.log('VR is supported!');
                    this.showNotification('VR Mode Available!', 'success');
                }
            } catch (error) {
                console.log('VR not supported:', error);
            }
        }
    }

    setupARButton() {
        const arButton = document.getElementById('ar-mode');
        if (arButton) {
            arButton.addEventListener('click', () => {
                if (this.isARSupported) {
                    this.startARExperience();
                } else {
                    this.simulateARExperience();
                }
            });
        }
    }

    async startARExperience() {
        try {
            this.arSession = await navigator.xr.requestSession('immersive-ar');
            this.showNotification('AR Mode Activated!', 'success');
            
            // Setup AR scene
            this.setupARScene();
        } catch (error) {
            console.error('Failed to start AR session:', error);
            this.simulateARExperience();
        }
    }

    simulateARExperience() {
        // Fallback AR simulation using device camera
        this.showNotification('Simulating AR Experience...', 'info');
        
        // Create AR overlay
        const arOverlay = document.createElement('div');
        arOverlay.id = 'ar-overlay';
        arOverlay.innerHTML = `
            <div class="ar-interface">
                <div class="ar-header">
                    <h3>AR Portfolio View</h3>
                    <button id="exit-ar">Exit AR</button>
                </div>
                <div class="ar-content">
                    <div class="ar-card" data-project="ai-chatbot">
                        <h4>AI ChatBot</h4>
                        <div class="ar-3d-preview"></div>
                    </div>
                    <div class="ar-card" data-project="vr-experience">
                        <h4>VR Experience</h4>
                        <div class="ar-3d-preview"></div>
                    </div>
                </div>
                <div class="ar-controls">
                    <button class="ar-btn" onclick="this.rotateProjects()">Rotate</button>
                    <button class="ar-btn" onclick="this.zoomIn()">Zoom In</button>
                    <button class="ar-btn" onclick="this.resetView()">Reset</button>
                </div>
            </div>
        `;
        
        arOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(10px);
        `;
        
        document.body.appendChild(arOverlay);
        
        // Add exit functionality
        document.getElementById('exit-ar').addEventListener('click', () => {
            arOverlay.remove();
            this.showNotification('AR Mode Exited', 'info');
        });
        
        // Animate AR cards
        this.animateARCards();
    }

    animateARCards() {
        const arCards = document.querySelectorAll('.ar-card');
        arCards.forEach((card, index) => {
            card.style.cssText = `
                background: rgba(78, 205, 196, 0.1);
                border: 2px solid #4ecdc4;
                border-radius: 15px;
                padding: 20px;
                margin: 10px;
                text-align: center;
                color: white;
                transform: translateZ(${index * 50}px) rotateY(${index * 45}deg);
                animation: arFloat 3s ease-in-out infinite;
                animation-delay: ${index * 0.5}s;
            `;
        });
    }

    setupVRExperience() {
        // Create VR scene in portfolio items
        const vrPreviews = document.querySelectorAll('.vr-preview');
        vrPreviews.forEach(preview => {
            this.createVRScene(preview);
        });
    }

    createVRScene(container) {
        // Create a mini VR scene using Three.js
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        
        renderer.setSize(200, 200);
        container.appendChild(renderer.domElement);
        
        // Add VR objects
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ 
            color: 0x4ecdc4,
            wireframe: true 
        });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        
        camera.position.z = 5;
        
        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        };
        animate();
        
        // Add click handler for full VR
        container.addEventListener('click', () => {
            this.enterFullVR();
        });
    }

    async enterFullVR() {
        if (this.isVRSupported) {
            try {
                this.vrSession = await navigator.xr.requestSession('immersive-vr');
                this.showNotification('VR Mode Activated!', 'success');
            } catch (error) {
                console.error('Failed to start VR session:', error);
                this.simulateVRExperience();
            }
        } else {
            this.simulateVRExperience();
        }
    }

    simulateVRExperience() {
        this.showNotification('Simulating VR Experience...', 'info');
        
        // Create fullscreen VR simulation
        const vrOverlay = document.createElement('div');
        vrOverlay.id = 'vr-overlay';
        vrOverlay.innerHTML = `
            <div class="vr-environment">
                <div class="vr-sky"></div>
                <div class="vr-ground"></div>
                <div class="vr-portfolio-gallery">
                    <div class="vr-project" data-project="1">
                        <div class="vr-screen">AI ChatBot Demo</div>
                    </div>
                    <div class="vr-project" data-project="2">
                        <div class="vr-screen">Web Platform</div>
                    </div>
                    <div class="vr-project" data-project="3">
                        <div class="vr-screen">Mobile App</div>
                    </div>
                </div>
                <div class="vr-ui">
                    <button id="exit-vr">Exit VR</button>
                    <div class="vr-controls">
                        <button onclick="this.moveLeft()">←</button>
                        <button onclick="this.moveRight()">→</button>
                        <button onclick="this.interact()">Interact</button>
                    </div>
                </div>
            </div>
        `;
        
        vrOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(180deg, #87CEEB 0%, #228B22 100%);
            z-index: 10000;
            overflow: hidden;
        `;
        
        document.body.appendChild(vrOverlay);
        
        // Add VR styles
        this.addVRStyles();
        
        // Add exit functionality
        document.getElementById('exit-vr').addEventListener('click', () => {
            vrOverlay.remove();
            this.showNotification('VR Mode Exited', 'info');
        });
        
        // Start VR animation
        this.animateVREnvironment();
    }

    addVRStyles() {
        const vrStyles = document.createElement('style');
        vrStyles.textContent = `
            .vr-environment {
                width: 100%;
                height: 100%;
                position: relative;
                perspective: 1000px;
            }
            
            .vr-sky {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 50%;
                background: linear-gradient(180deg, #87CEEB 0%, #98FB98 100%);
                animation: skyMove 20s linear infinite;
            }
            
            .vr-ground {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 50%;
                background: linear-gradient(180deg, #228B22 0%, #006400 100%);
                transform: rotateX(60deg);
                transform-origin: top;
            }
            
            .vr-portfolio-gallery {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                display: flex;
                gap: 100px;
                animation: galleryFloat 5s ease-in-out infinite;
            }
            
            .vr-project {
                width: 200px;
                height: 150px;
                background: rgba(0, 0, 0, 0.8);
                border: 3px solid #4ecdc4;
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                transform: rotateY(-15deg);
                transition: all 0.3s ease;
                cursor: pointer;
            }
            
            .vr-project:hover {
                transform: rotateY(0deg) scale(1.1);
                box-shadow: 0 20px 40px rgba(78, 205, 196, 0.5);
            }
            
            .vr-screen {
                color: #4ecdc4;
                font-size: 16px;
                font-weight: bold;
                text-align: center;
                padding: 20px;
            }
            
            .vr-ui {
                position: absolute;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 20px;
            }
            
            .vr-controls {
                display: flex;
                gap: 10px;
            }
            
            .vr-controls button, #exit-vr {
                padding: 10px 20px;
                border: none;
                border-radius: 25px;
                background: rgba(78, 205, 196, 0.8);
                color: white;
                cursor: pointer;
                font-weight: bold;
                transition: all 0.3s ease;
            }
            
            .vr-controls button:hover, #exit-vr:hover {
                background: #4ecdc4;
                transform: scale(1.1);
            }
            
            @keyframes skyMove {
                0% { background-position: 0% 0%; }
                100% { background-position: 100% 0%; }
            }
            
            @keyframes galleryFloat {
                0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
                50% { transform: translate(-50%, -50%) translateY(-20px); }
            }
        `;
        document.head.appendChild(vrStyles);
    }

    animateVREnvironment() {
        const projects = document.querySelectorAll('.vr-project');
        projects.forEach((project, index) => {
            project.addEventListener('click', () => {
                this.showProjectInVR(index + 1);
            });
        });
    }

    showProjectInVR(projectId) {
        this.showNotification(`Viewing Project ${projectId} in VR!`, 'success');
        
        // Add project-specific VR content
        const projectData = {
            1: { name: 'AI ChatBot', demo: 'Interactive AI conversation in 3D space' },
            2: { name: 'Web Platform', demo: 'Immersive web interface exploration' },
            3: { name: 'Mobile App', demo: 'Virtual mobile device interaction' }
        };
        
        const project = projectData[projectId];
        if (project) {
            // Create project demo overlay
            const demoOverlay = document.createElement('div');
            demoOverlay.innerHTML = `
                <div class="vr-project-demo">
                    <h2>${project.name}</h2>
                    <p>${project.demo}</p>
                    <div class="vr-demo-space">
                        <div class="demo-object"></div>
                    </div>
                    <button onclick="this.parentElement.remove()">Back to Gallery</button>
                </div>
            `;
            demoOverlay.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                text-align: center;
            `;
            
            document.getElementById('vr-overlay').appendChild(demoOverlay);
        }
    }

    showNotification(message, type) {
        const container = document.getElementById('notification-container');
        if (container) {
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.textContent = message;
            container.appendChild(notification);

            setTimeout(() => {
                notification.remove();
            }, 3000);
        }
    }
}

// Gesture Recognition for AR/VR
class GestureRecognition {
    constructor() {
        this.isActive = false;
        this.gestures = {
            swipeLeft: { action: 'previousProject' },
            swipeRight: { action: 'nextProject' },
            pinch: { action: 'zoom' },
            tap: { action: 'select' }
        };
        this.init();
    }

    init() {
        this.setupTouchGestures();
        this.setupMouseGestures();
    }

    setupTouchGestures() {
        let startX, startY, startTime;
        
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            startTime = Date.now();
        });
        
        document.addEventListener('touchend', (e) => {
            if (!this.isActive) return;
            
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const endTime = Date.now();
            
            const deltaX = endX - startX;
            const deltaY = endY - startY;
            const deltaTime = endTime - startTime;
            
            // Detect swipe gestures
            if (Math.abs(deltaX) > 50 && deltaTime < 300) {
                if (deltaX > 0) {
                    this.executeGesture('swipeRight');
                } else {
                    this.executeGesture('swipeLeft');
                }
            }
        });
    }

    setupMouseGestures() {
        let isDrawing = false;
        let path = [];
        
        document.addEventListener('mousedown', (e) => {
            if (!this.isActive) return;
            isDrawing = true;
            path = [{ x: e.clientX, y: e.clientY }];
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isDrawing || !this.isActive) return;
            path.push({ x: e.clientX, y: e.clientY });
        });
        
        document.addEventListener('mouseup', () => {
            if (!this.isActive) return;
            isDrawing = false;
            this.analyzeGesture(path);
            path = [];
        });
    }

    analyzeGesture(path) {
        if (path.length < 3) return;
        
        const startPoint = path[0];
        const endPoint = path[path.length - 1];
        const deltaX = endPoint.x - startPoint.x;
        const deltaY = endPoint.y - startPoint.y;
        
        // Simple gesture recognition
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX > 50) {
                this.executeGesture('swipeRight');
            } else if (deltaX < -50) {
                this.executeGesture('swipeLeft');
            }
        }
    }

    executeGesture(gestureType) {
        const gesture = this.gestures[gestureType];
        if (gesture) {
            console.log(`Gesture detected: ${gestureType}`);
            this.performAction(gesture.action);
        }
    }

    performAction(action) {
        switch (action) {
            case 'previousProject':
                this.navigateProjects(-1);
                break;
            case 'nextProject':
                this.navigateProjects(1);
                break;
            case 'zoom':
                this.zoomView();
                break;
            case 'select':
                this.selectCurrentItem();
                break;
        }
    }

    navigateProjects(direction) {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        // Implementation for project navigation
        console.log(`Navigating projects: ${direction > 0 ? 'next' : 'previous'}`);
    }

    zoomView() {
        console.log('Zooming view');
    }

    selectCurrentItem() {
        console.log('Selecting current item');
    }

    activate() {
        this.isActive = true;
        console.log('Gesture recognition activated');
    }

    deactivate() {
        this.isActive = false;
        console.log('Gesture recognition deactivated');
    }
}

// Initialize AR/VR features
document.addEventListener('DOMContentLoaded', () => {
    const arvrExperience = new ARVRExperience();
    const gestureRecognition = new GestureRecognition();
    
    // Activate gesture recognition in AR/VR modes
    document.addEventListener('ar-activated', () => {
        gestureRecognition.activate();
    });
    
    document.addEventListener('vr-activated', () => {
        gestureRecognition.activate();
    });
});