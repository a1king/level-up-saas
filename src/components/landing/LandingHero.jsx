import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { DraggableCardBody, DraggableCardContainer } from '../ui/draggable-card';

export default function LandingHero({ setCurrentView }) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const animationIdRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    const shapes = [];
    const geometries = [
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.SphereGeometry(0.8, 32, 32),
      new THREE.ConeGeometry(0.8, 1.5, 8),
      new THREE.OctahedronGeometry(0.8),
      new THREE.TetrahedronGeometry(1)
    ];

    const colors = [0x06b6d4, 0x3b82f6, 0x8b5cf6, 0x10b981, 0xf59e0b];

    for (let i = 0; i < 12; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const material = new THREE.MeshBasicMaterial({ 
        color: colors[Math.floor(Math.random() * colors.length)],
        transparent: true,
        opacity: 0.4,
        wireframe: Math.random() > 0.6
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      
      mesh.position.x = (Math.random() - 0.5) * 25;
      mesh.position.y = (Math.random() - 0.5) * 25;
      mesh.position.z = (Math.random() - 0.5) * 25;
      
      mesh.userData = {
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.01,
          y: (Math.random() - 0.5) * 0.01,
          z: (Math.random() - 0.5) * 0.01
        },
        floatSpeed: Math.random() * 0.01 + 0.005,
      };
      
      shapes.push(mesh);
      scene.add(mesh);
    }

    camera.position.z = 20;

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      shapes.forEach((shape, index) => {
        shape.rotation.x += shape.userData.rotationSpeed.x;
        shape.rotation.y += shape.userData.rotationSpeed.y;
        shape.rotation.z += shape.userData.rotationSpeed.z;
        
        shape.position.y += Math.sin(Date.now() * shape.userData.floatSpeed + index) * 0.008;
      });
      
      camera.position.x = Math.sin(Date.now() * 0.0003) * 1.5;
      camera.position.y = Math.cos(Date.now() * 0.0002) * 0.8;
      camera.lookAt(0, 0, 0);
      
      renderer.render(scene, camera);
    };

    animate();
    sceneRef.current = { scene, renderer, camera, shapes };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      shapes.forEach(shape => {
        scene.remove(shape);
        shape.geometry.dispose();
        shape.material.dispose();
      });
    };
  }, []);

  const successStories = [
    {
      name: "Sarah Chen",
      university: "Stanford CS",
      achievement: "Google SWE Intern",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b002?q=80&w=400&auto=format&fit=crop",
      className: "absolute top-10 left-[15%] rotate-[-3deg]"
    },
    {
      name: "Alex Rivera",
      university: "MIT EECS", 
      achievement: "Meta Frontend Intern",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
      className: "absolute top-32 left-[25%] rotate-[5deg]"
    },
    {
      name: "Jordan Kim",
      university: "Berkeley CS",
      achievement: "Apple iOS Intern", 
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop",
      className: "absolute top-8 left-[35%] rotate-[-7deg]"
    },
    {
      name: "Taylor Brown",
      university: "CMU SCS",
      achievement: "Microsoft PM Intern",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
      className: "absolute top-24 left-[50%] rotate-[4deg]"
    },
    {
      name: "Morgan Davis",
      university: "Harvard CS",
      achievement: "Tesla SWE Intern",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop",
      className: "absolute top-16 right-[25%] rotate-[-2deg]"
    }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-100 overflow-hidden">
      <div ref={mountRef} className="absolute inset-0 z-0" />
      
      {/* Navigation */}
      <nav className="relative z-20 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <span className="text-2xl font-bold text-cyan-600">Level Up</span>
            <div className="flex space-x-4">
              <button className="text-slate-600 hover:text-cyan-600 px-3 py-2 rounded-md text-sm font-medium">
                Features
              </button>
              <button className="text-slate-600 hover:text-cyan-600 px-3 py-2 rounded-md text-sm font-medium">
                Pricing
              </button>
              <button 
                onClick={() => setCurrentView('dashboard')}
                className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 font-medium transition-colors"
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
          <h1 className="text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
            Stop Playing the{' '}
            <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Job Application
            </span>{' '}
            Guessing Game
          </h1>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto mb-10">
            Level Up is the intelligent job application tracker that turns uncertainty into strategy. 
            Get real-time insights from thousands of student applications, AI-powered optimization, 
            and data-driven guidance to land your dream internship or job.
          </p>
          <div className="flex justify-center space-x-4">
            <button 
              onClick={() => setCurrentView('dashboard')}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-cyan-700 hover:to-blue-700 transform hover:scale-105 transition-all shadow-lg"
            >
              Start Tracking Free 🚀
            </button>
            <button className="bg-white/80 backdrop-blur-sm text-slate-900 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white transition-all shadow-lg border border-slate-200">
              Watch Demo 📹
            </button>
          </div>
        </div>

        {/* What We Do Section */}
        <div className="mb-32">
          <h2 className="text-4xl font-bold text-center mb-16">What Level Up Does For You</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:shadow-xl transition-all hover:transform hover:scale-105">
              <div className="text-5xl mb-6 text-center">��</div>
              <h3 className="text-2xl font-bold mb-4 text-center">Smart Application Tracking</h3>
              <p className="text-slate-600 text-center">
                Never lose track of an application again. Our intelligent tracker monitors your entire job search journey, 
                from application submission to final decision, with automatic status updates and timeline tracking.
              </p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:shadow-xl transition-all hover:transform hover:scale-105">
              <div className="text-5xl mb-6 text-center">🤖</div>
              <h3 className="text-2xl font-bold mb-4 text-center">AI-Powered Insights</h3>
              <p className="text-slate-600 text-center">
                Get personalized recommendations powered by machine learning. Our AI analyzes your applications, 
                suggests improvements, generates cover letters, and predicts success rates based on historical data.
              </p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:shadow-xl transition-all hover:transform hover:scale-105">
              <div className="text-5xl mb-6 text-center">📈</div>
              <h3 className="text-2xl font-bold mb-4 text-center">Market Intelligence</h3>
              <p className="text-slate-600 text-center">
                Access real-time data from thousands of applications. See response rates by company, average timelines, 
                and success patterns from students at top universities to optimize your strategy.
              </p>
            </div>
          </div>
        </div>

        {/* Success Stories Section with Draggable Cards */}
        <div className="mb-32">
          <h2 className="text-4xl font-bold text-center mb-8">Success Stories from Real Students</h2>
          <p className="text-xl text-slate-600 text-center mb-16 max-w-3xl mx-auto">
            Join thousands of students who've landed their dream internships and jobs using Level Up's data-driven approach.
            <strong> Drag the cards below to explore their stories!</strong>
          </p>
          
          <DraggableCardContainer className="relative flex min-h-[400px] w-full items-center justify-center overflow-visible">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-0">
              <div className="text-6xl mb-4 opacity-20">🎯</div>
              <p className="text-2xl font-bold text-slate-300 max-w-md">
                Success happens when preparation meets opportunity
              </p>
            </div>
            
            {successStories.map((story, index) => (
              <DraggableCardBody key={index} className={story.className}>
                <img 
                  src={story.image} 
                  alt={story.name}
                  className="w-32 h-32 object-cover rounded-lg mb-4 mx-auto"
                />
                <h3 className="text-lg font-bold text-slate-800 text-center">{story.name}</h3>
                <p className="text-sm text-slate-600 text-center">{story.university}</p>
                <p className="text-sm font-semibold text-cyan-600 text-center mt-2">{story.achievement}</p>
              </DraggableCardBody>
            ))}
          </DraggableCardContainer>
        </div>

        {/* How It Works */}
        <div className="mb-32">
          <h2 className="text-4xl font-bold text-center mb-16">How Level Up Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-cyan-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-cyan-600">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Track Applications</h3>
              <p className="text-slate-600">Add your job applications with company, position, and submission date</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Get AI Insights</h3>
              <p className="text-slate-600">Receive personalized recommendations and application optimization tips</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Monitor Progress</h3>
              <p className="text-slate-600">Track response times, interview schedules, and application outcomes</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">4</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Land Your Dream Job</h3>
              <p className="text-slate-600">Use data-driven insights to optimize your strategy and secure offers</p>
            </div>
          </div>
        </div>

        {/* Pricing Preview */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-16">Simple, Transparent Pricing</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border-2 border-slate-200">
              <h3 className="text-2xl font-bold mb-4">Free Tracker</h3>
              <div className="text-4xl font-bold mb-6">$0<span className="text-lg font-normal text-slate-600">/month</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><span className="text-green-500 mr-3">✓</span>Track up to 10 applications</li>
                <li className="flex items-center"><span className="text-green-500 mr-3">✓</span>Basic status updates</li>
                <li className="flex items-center"><span className="text-green-500 mr-3">✓</span>Community insights</li>
                <li className="flex items-center"><span className="text-green-500 mr-3">✓</span>Export to CSV</li>
              </ul>
              <button className="w-full bg-slate-600 text-white py-3 rounded-lg font-medium hover:bg-slate-700 transition-colors">
                Start Free
              </button>
            </div>
            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-amber-400 text-amber-900 px-3 py-1 rounded-full text-sm font-bold">
                POPULAR
              </div>
              <h3 className="text-2xl font-bold mb-4">Premium AI</h3>
              <div className="text-4xl font-bold mb-6">$9<span className="text-lg font-normal opacity-90">/month</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><span className="text-green-300 mr-3">✓</span>Unlimited applications</li>
                <li className="flex items-center"><span className="text-green-300 mr-3">✓</span>🤖 AI Resume Analysis</li>
                <li className="flex items-center"><span className="text-green-300 mr-3">✓</span>🤖 AI Cover Letter Generator</li>
                <li className="flex items-center"><span className="text-green-300 mr-3">✓</span>🤖 Interview Preparation</li>
                <li className="flex items-center"><span className="text-green-300 mr-3">✓</span>Advanced analytics & insights</li>
                <li className="flex items-center"><span className="text-green-300 mr-3">✓</span>Response time predictions</li>
              </ul>
              <button className="w-full bg-white text-cyan-600 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                Upgrade Now
              </button>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-white/90 backdrop-blur-sm rounded-2xl p-12 shadow-xl">
          <h2 className="text-4xl font-bold mb-6">Ready to Level Up Your Job Search?</h2>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Join thousands of students who've transformed their job search with data-driven insights and AI-powered optimization.
          </p>
          <button 
            onClick={() => setCurrentView('dashboard')}
            className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-12 py-4 rounded-xl text-xl font-semibold hover:from-cyan-700 hover:to-blue-700 transform hover:scale-105 transition-all shadow-lg"
          >
            Start Your Success Story Today 🎯
          </button>
        </div>
      </div>
    </div>
  );
}
