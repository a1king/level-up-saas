import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { DraggableCardBody, DraggableCardContainer } from '../ui/draggable-card';

export default function LandingHero({ setCurrentView }) {
  const mountRef = useRef(null);
  const animationIdRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create particle galaxy system
    const particleCount = 2000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const colorPalette = [
      new THREE.Color(0x06b6d4), // cyan
      new THREE.Color(0x3b82f6), // blue  
      new THREE.Color(0x8b5cf6), // purple
      new THREE.Color(0x10b981), // emerald
      new THREE.Color(0xf59e0b), // amber
      new THREE.Color(0xec4899), // pink
    ];

    for (let i = 0; i < particleCount; i++) {
      // Galaxy spiral pattern
      const radius = Math.random() * 15 + 5;
      const spinAngle = radius * 0.3;
      const branchAngle = (i % 6) * (Math.PI * 2) / 6;
      
      const randomRadius = Math.pow(Math.random(), 0.75) * radius;
      const angle = branchAngle + spinAngle;
      
      positions[i * 3] = Math.cos(angle) * randomRadius + (Math.random() - 0.5) * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = Math.sin(angle) * randomRadius + (Math.random() - 0.5) * 2;

      // Assign colors based on branch
      const branchColor = colorPalette[Math.floor(i % 6)];
      colors[i * 3] = branchColor.r;
      colors[i * 3 + 1] = branchColor.g;
      colors[i * 3 + 2] = branchColor.b;

      sizes[i] = Math.random() * 3 + 1;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Custom shader material for glowing particles
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        pixelRatio: { value: Math.min(window.devicePixelRatio, 2) }
      },
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        uniform float time;
        uniform float pixelRatio;
        
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          
          // Pulsing effect
          float pulse = sin(time * 2.0 + position.x * 0.1) * 0.3 + 1.0;
          gl_PointSize = size * pulse * pixelRatio * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
          float strength = 0.05 / distanceToCenter - 0.1;
          
          // Glowing effect
          vec3 glow = vColor * strength;
          gl_FragColor = vec4(glow, strength);
        }
      `,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Add floating geometric accents
    const accentGeometries = [
      new THREE.IcosahedronGeometry(0.5, 0),
      new THREE.OctahedronGeometry(0.6),
      new THREE.TetrahedronGeometry(0.7)
    ];

    const accents = [];
    for (let i = 0; i < 8; i++) {
      const geo = accentGeometries[Math.floor(Math.random() * accentGeometries.length)];
      const mat = new THREE.MeshBasicMaterial({
        color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
        transparent: true,
        opacity: 0.6,
        wireframe: true
      });
      
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
      
      mesh.userData = {
        rotSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02
        ),
        originalY: mesh.position.y,
        floatSpeed: Math.random() * 0.01 + 0.005
      };
      
      accents.push(mesh);
      scene.add(mesh);
    }

    camera.position.z = 20;

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      const elapsedTime = clock.getElapsedTime();
      
      // Update shader uniforms
      material.uniforms.time.value = elapsedTime;
      
      // Rotate particle galaxy
      particles.rotation.y = elapsedTime * 0.05;
      particles.rotation.x = Math.sin(elapsedTime * 0.1) * 0.1;
      
      // Animate accent pieces
      accents.forEach((accent, index) => {
        accent.rotation.x += accent.userData.rotSpeed.x;
        accent.rotation.y += accent.userData.rotSpeed.y;
        accent.rotation.z += accent.userData.rotSpeed.z;
        
        accent.position.y = accent.userData.originalY + 
          Math.sin(elapsedTime * accent.userData.floatSpeed + index) * 2;
      });
      
      // Camera movement
      camera.position.x = Math.sin(elapsedTime * 0.1) * 3;
      camera.position.y = Math.cos(elapsedTime * 0.15) * 1.5;
      camera.lookAt(0, 0, 0);
      
      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      material.uniforms.pixelRatio.value = Math.min(window.devicePixelRatio, 2);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Proper cleanup
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      
      accents.forEach(accent => {
        scene.remove(accent);
        accent.geometry.dispose();
        accent.material.dispose();
      });
    };
  }, []);

  const successStories = [
    {
      name: "Sarah Chen",
      university: "Stanford CS",
      achievement: "Google SWE Intern",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b002?q=80&w=400&auto=format&fit=crop",
      className: "absolute top-16 left-[15%]"
    },
    {
      name: "Alex Rivera", 
      university: "MIT EECS",
      achievement: "Meta Frontend Intern",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
      className: "absolute top-32 left-[30%]"
    },
    {
      name: "Jordan Kim",
      university: "Berkeley CS", 
      achievement: "Apple iOS Intern",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop",
      className: "absolute top-12 left-[45%]"
    },
    {
      name: "Taylor Brown",
      university: "CMU SCS",
      achievement: "Microsoft PM Intern", 
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
      className: "absolute top-28 left-[60%]"
    },
    {
      name: "Morgan Davis",
      university: "Harvard CS",
      achievement: "Tesla SWE Intern",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop", 
      className: "absolute top-20 right-[20%]"
    }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900 overflow-hidden">
      <div ref={mountRef} className="absolute inset-0 z-0" />
      
      {/* Navigation */}
      <nav className="relative z-20 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Level Up
            </span>
            <div className="flex space-x-4">
              <button className="text-white/80 hover:text-cyan-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Features
              </button>
              <button className="text-white/80 hover:text-cyan-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Pricing
              </button>
              <button 
                onClick={() => setCurrentView('dashboard')}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2 rounded-lg hover:from-cyan-600 hover:to-blue-600 font-medium transition-all transform hover:scale-105"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-20">
          <h1 className="text-6xl font-extrabold text-white mb-6 leading-tight">
            Stop Playing the{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Job Application
            </span>{' '}
            Guessing Game
          </h1>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto mb-10">
            Level Up transforms uncertainty into strategy with AI-powered insights, 
            real-time data from thousands of applications, and intelligent optimization 
            to help you land your dream job.
          </p>
          <div className="flex justify-center space-x-4">
            <button 
              onClick={() => setCurrentView('dashboard')}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transform hover:scale-105 transition-all shadow-2xl"
            >
              Start Tracking Free 🚀
            </button>
            <button className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/20 transition-all border border-white/20">
              Watch Demo 📹
            </button>
          </div>
        </div>

        {/* Success Stories Section with Fast Draggable Cards */}
        <div className="mb-32">
          <h2 className="text-4xl font-bold text-center mb-8 text-white">Success Stories</h2>
          <p className="text-xl text-blue-100 text-center mb-16 max-w-3xl mx-auto">
            Students using Level Up have landed internships at top companies.
            <strong className="text-cyan-400"> Drag the cards to explore their journeys!</strong>
          </p>
          
          <DraggableCardContainer className="relative flex min-h-[400px] w-full items-center justify-center">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-0">
              <div className="text-6xl mb-4 opacity-20">🎯</div>
              <p className="text-2xl font-bold text-white/30 max-w-md">
                Success is within reach
              </p>
            </div>
            
            {successStories.map((story, index) => (
              <DraggableCardBody key={index} className={story.className}>
                <img 
                  src={story.image} 
                  alt={story.name}
                  className="w-24 h-24 object-cover rounded-full mb-4 mx-auto ring-2 ring-cyan-400/50"
                />
                <h3 className="text-lg font-bold text-slate-800 text-center">{story.name}</h3>
                <p className="text-sm text-slate-600 text-center">{story.university}</p>
                <p className="text-sm font-semibold text-cyan-600 text-center mt-2">{story.achievement}</p>
              </DraggableCardBody>
            ))}
          </DraggableCardContainer>
        </div>

        {/* Final CTA */}
        <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-12 border border-white/10">
          <h2 className="text-4xl font-bold mb-6 text-white">Ready to Level Up?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students transforming their job search with data-driven insights.
          </p>
          <button 
            onClick={() => setCurrentView('dashboard')}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-12 py-4 rounded-xl text-xl font-semibold hover:from-cyan-600 hover:to-blue-600 transform hover:scale-105 transition-all shadow-2xl"
          >
            Start Your Success Story 🌟
          </button>
        </div>
      </div>
    </div>
  );
}
