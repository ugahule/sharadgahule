// Metaverse & Web3 Integration
class MetaverseEngine {
    constructor() {
        this.web3 = null;
        this.nftCollection = [];
        this.virtualWorld = new VirtualWorld();
        this.avatarSystem = new AvatarSystem();
        this.spatialAudio = new SpatialAudio();
        this.hapticFeedback = new HapticFeedback();
        this.init();
    }

    async init() {
        await this.initWeb3();
        await this.loadMetaverseAssets();
        this.createVirtualEnvironment();
        this.initSocialFeatures();
        this.startMetaverseLoop();
    }

    async initWeb3() {
        if (typeof window.ethereum !== 'undefined') {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                this.web3 = new Web3(window.ethereum);
                console.log('Web3 connected');
                this.showNotification('Web3 Wallet Connected!', 'success');
            } catch (error) {
                console.log('Web3 connection failed, using simulation');
                this.web3 = new Web3Simulator();
            }
        } else {
            this.web3 = new Web3Simulator();
        }
    }

    async loadMetaverseAssets() {
        const assets = [
            { type: 'environment', url: 'virtual-office.glb' },
            { type: 'avatar', url: 'default-avatar.glb' },
            { type: 'nft', url: 'portfolio-nft.json' }
        ];

        for (const asset of assets) {
            await this.loadAsset(asset);
        }
    }

    async loadAsset(asset) {
        // Simulate asset loading
        return new Promise(resolve => {
            setTimeout(() => {
                console.log(`Loaded ${asset.type}: ${asset.url}`);
                resolve(asset);
            }, Math.random() * 1000);
        });
    }

    createVirtualEnvironment() {
        const metaverseScene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        
        // Create virtual office environment
        this.createVirtualOffice(metaverseScene);
        this.createInteractiveElements(metaverseScene);
        this.setupLighting(metaverseScene);
        
        camera.position.set(0, 5, 10);
        
        const animate = () => {
            requestAnimationFrame(animate);
            this.updateMetaverse();
            renderer.render(metaverseScene, camera);
        };
        animate();
    }

    createVirtualOffice(scene) {
        // Floor
        const floorGeometry = new THREE.PlaneGeometry(20, 20);
        const floorMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x404040,
            transparent: true,
            opacity: 0.8
        });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        scene.add(floor);

        // Walls
        this.createWalls(scene);
        
        // Furniture
        this.createFurniture(scene);
        
        // Interactive screens
        this.createInteractiveScreens(scene);
    }

    createWalls(scene) {
        const wallMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x666666,
            transparent: true,
            opacity: 0.7
        });

        // Back wall
        const backWall = new THREE.Mesh(
            new THREE.PlaneGeometry(20, 10),
            wallMaterial
        );
        backWall.position.set(0, 5, -10);
        scene.add(backWall);

        // Side walls
        const leftWall = new THREE.Mesh(
            new THREE.PlaneGeometry(20, 10),
            wallMaterial
        );
        leftWall.rotation.y = Math.PI / 2;
        leftWall.position.set(-10, 5, 0);
        scene.add(leftWall);

        const rightWall = new THREE.Mesh(
            new THREE.PlaneGeometry(20, 10),
            wallMaterial
        );
        rightWall.rotation.y = -Math.PI / 2;
        rightWall.position.set(10, 5, 0);
        scene.add(rightWall);
    }

    createFurniture(scene) {
        // Desk
        const deskGeometry = new THREE.BoxGeometry(4, 0.1, 2);
        const deskMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
        const desk = new THREE.Mesh(deskGeometry, deskMaterial);
        desk.position.set(0, 1, -5);
        desk.castShadow = true;
        scene.add(desk);

        // Chair
        const chairGeometry = new THREE.BoxGeometry(1, 2, 1);
        const chairMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
        const chair = new THREE.Mesh(chairGeometry, chairMaterial);
        chair.position.set(0, 1, -3);
        chair.castShadow = true;
        scene.add(chair);
    }

    createInteractiveScreens(scene) {
        // Portfolio screen
        const screenGeometry = new THREE.PlaneGeometry(3, 2);
        const screenMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x000000,
            transparent: true,
            opacity: 0.9
        });
        const screen = new THREE.Mesh(screenGeometry, screenMaterial);
        screen.position.set(-5, 3, -9.9);
        scene.add(screen);

        // Add interactive functionality
        screen.userData = { 
            type: 'portfolio',
            interactive: true,
            onClick: () => this.showPortfolioInMetaverse()
        };
    }

    setupLighting(scene) {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
        scene.add(ambientLight);

        // Directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 10, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        scene.add(directionalLight);

        // Point lights for ambiance
        const pointLight1 = new THREE.PointLight(0x4ecdc4, 0.5, 10);
        pointLight1.position.set(-5, 5, -5);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0xff6b6b, 0.5, 10);
        pointLight2.position.set(5, 5, -5);
        scene.add(pointLight2);
    }

    createInteractiveElements(scene) {
        // NFT Gallery
        this.createNFTGallery(scene);
        
        // Social interaction zones
        this.createSocialZones(scene);
        
        // Teleportation portals
        this.createPortals(scene);
    }

    createNFTGallery(scene) {
        const nftPositions = [
            { x: -8, y: 3, z: -9.8 },
            { x: -6, y: 3, z: -9.8 },
            { x: -4, y: 3, z: -9.8 }
        ];

        nftPositions.forEach((pos, index) => {
            const nftFrame = new THREE.Mesh(
                new THREE.PlaneGeometry(1.5, 1.5),
                new THREE.MeshBasicMaterial({ 
                    color: 0x4ecdc4,
                    transparent: true,
                    opacity: 0.8
                })
            );
            nftFrame.position.set(pos.x, pos.y, pos.z);
            nftFrame.userData = {
                type: 'nft',
                id: index,
                onClick: () => this.viewNFT(index)
            };
            scene.add(nftFrame);
        });
    }

    createSocialZones(scene) {
        // Meeting area
        const meetingTable = new THREE.Mesh(
            new THREE.CylinderGeometry(2, 2, 0.1, 8),
            new THREE.MeshLambertMaterial({ color: 0x654321 })
        );
        meetingTable.position.set(5, 1, 5);
        scene.add(meetingTable);

        // Chairs around table
        for (let i = 0; i < 4; i++) {
            const angle = (i / 4) * Math.PI * 2;
            const chairX = 5 + Math.cos(angle) * 3;
            const chairZ = 5 + Math.sin(angle) * 3;
            
            const socialChair = new THREE.Mesh(
                new THREE.BoxGeometry(0.8, 1.5, 0.8),
                new THREE.MeshLambertMaterial({ color: 0x444444 })
            );
            socialChair.position.set(chairX, 0.75, chairZ);
            scene.add(socialChair);
        }
    }

    createPortals(scene) {
        // Portal to different environments
        const portalGeometry = new THREE.RingGeometry(1, 1.5, 16);
        const portalMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x00ffff,
            transparent: true,
            opacity: 0.7,
            side: THREE.DoubleSide
        });
        const portal = new THREE.Mesh(portalGeometry, portalMaterial);
        portal.position.set(8, 2, 8);
        portal.userData = {
            type: 'portal',
            destination: 'space-station',
            onClick: () => this.teleportToEnvironment('space-station')
        };
        scene.add(portal);

        // Animate portal
        const animatePortal = () => {
            portal.rotation.z += 0.01;
            requestAnimationFrame(animatePortal);
        };
        animatePortal();
    }

    initSocialFeatures() {
        this.socialSystem = {
            users: new Map(),
            chat: new ChatSystem(),
            voiceChat: new VoiceChat(),
            collaboration: new CollaborationTools()
        };
    }

    startMetaverseLoop() {
        setInterval(() => {
            this.updateUserPositions();
            this.processInteractions();
            this.updateSocialFeatures();
        }, 16); // 60 FPS
    }

    updateMetaverse() {
        // Update avatar animations
        this.avatarSystem.update();
        
        // Update spatial audio
        this.spatialAudio.update();
        
        // Process haptic feedback
        this.hapticFeedback.update();
    }

    showPortfolioInMetaverse() {
        const portfolioData = {
            projects: [
                { name: 'AI ChatBot', type: '3D Model', url: 'chatbot.glb' },
                { name: 'VR Experience', type: 'Interactive Demo', url: 'vr-demo.html' },
                { name: 'Blockchain App', type: 'Smart Contract', url: 'contract.sol' }
            ]
        };

        this.virtualWorld.displayPortfolio(portfolioData);
        this.showNotification('Portfolio loaded in Metaverse!', 'success');
    }

    viewNFT(nftId) {
        const nftData = {
            id: nftId,
            name: `Portfolio NFT #${nftId + 1}`,
            description: 'Unique digital asset representing my work',
            image: `nft-${nftId}.png`,
            attributes: [
                { trait_type: 'Rarity', value: 'Legendary' },
                { trait_type: 'Category', value: 'Portfolio' },
                { trait_type: 'Year', value: '2024' }
            ]
        };

        this.displayNFTModal(nftData);
    }

    displayNFTModal(nftData) {
        const modal = document.createElement('div');
        modal.className = 'nft-modal';
        modal.innerHTML = `
            <div class="nft-content">
                <h3>${nftData.name}</h3>
                <div class="nft-image">🎨</div>
                <p>${nftData.description}</p>
                <div class="nft-attributes">
                    ${nftData.attributes.map(attr => 
                        `<div class="attribute">
                            <span class="trait">${attr.trait_type}:</span>
                            <span class="value">${attr.value}</span>
                        </div>`
                    ).join('')}
                </div>
                <div class="nft-actions">
                    <button onclick="this.parentElement.parentElement.parentElement.remove()">Close</button>
                    <button onclick="this.mintNFT('${nftData.id}')">Mint NFT</button>
                </div>
            </div>
        `;
        
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;
        
        document.body.appendChild(modal);
    }

    teleportToEnvironment(destination) {
        this.showNotification(`Teleporting to ${destination}...`, 'info');
        
        // Simulate environment change
        setTimeout(() => {
            this.loadEnvironment(destination);
            this.showNotification(`Welcome to ${destination}!`, 'success');
        }, 2000);
    }

    loadEnvironment(environmentName) {
        const environments = {
            'space-station': {
                background: 'linear-gradient(180deg, #000011 0%, #000033 100%)',
                gravity: 0.1,
                atmosphere: 'space'
            },
            'underwater-lab': {
                background: 'linear-gradient(180deg, #001133 0%, #003366 100%)',
                gravity: 0.8,
                atmosphere: 'underwater'
            },
            'cyber-city': {
                background: 'linear-gradient(180deg, #330066 0%, #660099 100%)',
                gravity: 1.0,
                atmosphere: 'neon'
            }
        };

        const env = environments[environmentName];
        if (env) {
            document.body.style.background = env.background;
            this.virtualWorld.setGravity(env.gravity);
            this.virtualWorld.setAtmosphere(env.atmosphere);
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

class VirtualWorld {
    constructor() {
        this.gravity = 9.8;
        this.atmosphere = 'normal';
        this.physics = new PhysicsEngine();
    }

    setGravity(value) {
        this.gravity = value;
        this.physics.updateGravity(value);
    }

    setAtmosphere(type) {
        this.atmosphere = type;
        this.updateVisualEffects(type);
    }

    updateVisualEffects(atmosphere) {
        const effects = {
            space: () => this.addStarField(),
            underwater: () => this.addBubbles(),
            neon: () => this.addNeonEffects()
        };

        if (effects[atmosphere]) {
            effects[atmosphere]();
        }
    }

    addStarField() {
        console.log('Adding star field effect');
    }

    addBubbles() {
        console.log('Adding underwater bubbles');
    }

    addNeonEffects() {
        console.log('Adding neon city effects');
    }

    displayPortfolio(portfolioData) {
        console.log('Displaying portfolio in virtual world:', portfolioData);
    }
}

class AvatarSystem {
    constructor() {
        this.currentAvatar = null;
        this.animations = new Map();
        this.customization = {
            appearance: {},
            clothing: {},
            accessories: {}
        };
    }

    update() {
        if (this.currentAvatar) {
            this.updateAnimations();
            this.updatePosition();
        }
    }

    updateAnimations() {
        // Update avatar animations based on user input
    }

    updatePosition() {
        // Update avatar position in virtual world
    }
}

class SpatialAudio {
    constructor() {
        this.audioContext = null;
        this.sources = new Map();
        this.listener = null;
        this.init();
    }

    async init() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.listener = this.audioContext.listener;
        } catch (error) {
            console.log('Spatial audio not supported');
        }
    }

    update() {
        // Update 3D audio positioning
    }
}

class HapticFeedback {
    constructor() {
        this.gamepad = null;
        this.vibrationPatterns = new Map();
    }

    update() {
        const gamepads = navigator.getGamepads();
        if (gamepads[0]) {
            this.gamepad = gamepads[0];
        }
    }

    vibrate(pattern) {
        if (this.gamepad && this.gamepad.vibrationActuator) {
            this.gamepad.vibrationActuator.playEffect('dual-rumble', {
                duration: pattern.duration,
                strongMagnitude: pattern.strong,
                weakMagnitude: pattern.weak
            });
        }
    }
}

class Web3Simulator {
    constructor() {
        this.accounts = ['0x1234567890abcdef'];
        this.balance = 1.5;
    }

    async getAccounts() {
        return this.accounts;
    }

    async getBalance(account) {
        return this.balance;
    }
}

class PhysicsEngine {
    constructor() {
        this.gravity = 9.8;
        this.objects = [];
    }

    updateGravity(value) {
        this.gravity = value;
    }

    addObject(object) {
        this.objects.push(object);
    }

    update() {
        this.objects.forEach(obj => {
            obj.velocity.y -= this.gravity * 0.016; // 60 FPS
            obj.position.y += obj.velocity.y * 0.016;
        });
    }
}

class ChatSystem {
    constructor() {
        this.messages = [];
        this.users = new Set();
    }

    sendMessage(user, message) {
        this.messages.push({ user, message, timestamp: Date.now() });
    }

    getMessages() {
        return this.messages;
    }
}

class VoiceChat {
    constructor() {
        this.isActive = false;
        this.peers = new Map();
    }

    startVoiceChat() {
        this.isActive = true;
    }

    stopVoiceChat() {
        this.isActive = false;
    }
}

class CollaborationTools {
    constructor() {
        this.whiteboards = new Map();
        this.sharedDocuments = new Map();
    }

    createWhiteboard(id) {
        this.whiteboards.set(id, { content: [], users: new Set() });
    }

    shareDocument(id, content) {
        this.sharedDocuments.set(id, { content, collaborators: new Set() });
    }
}

// Initialize Metaverse
document.addEventListener('DOMContentLoaded', () => {
    const metaverse = new MetaverseEngine();
    
    // Add metaverse UI
    const metaverseUI = document.createElement('div');
    metaverseUI.innerHTML = `
        <div class="metaverse-controls">
            <button id="enter-metaverse">Enter Metaverse</button>
            <button id="create-avatar">Customize Avatar</button>
            <button id="mint-nft">Mint Portfolio NFT</button>
            <button id="join-meeting">Join Virtual Meeting</button>
        </div>
    `;
    
    metaverseUI.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 20px;
        z-index: 1000;
        display: flex;
        flex-direction: column;
        gap: 10px;
    `;
    
    document.body.appendChild(metaverseUI);
    
    console.log('🌐 Metaverse Engine Initialized');
    console.log('🎮 Virtual World Ready');
    console.log('👤 Avatar System Active');
    console.log('🔊 Spatial Audio Enabled');
});