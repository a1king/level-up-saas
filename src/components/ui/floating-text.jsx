import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export function FloatingText() {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const animationIdRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, 400);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create floating text geometries
    const textObjects = [];
    const words = [
      { text: "TRACK", color: 0x06b6d4, size: 0.8, position: [-8, 2, 0] },
      { text: "ANALYZE", color: 0x3b82f6, size: 0.7, position: [-4, -1, 0] },
      { text: "SUCCEED", color: 0x8b5cf6, size: 0.9, position: [0, 3, 0] },
      { text: "LEVEL UP", color: 0x10b981, size: 1.0, position: [4, -2, 0] },
      { text: "FUTURE", color: 0xf59e0b, size: 0.6, position: [8, 1, 0] }
    ];

    // Create text geometries (simplified as cubes for now)
    words.forEach((word, index) => {
      const geometry = new THREE.BoxGeometry(word.size, word.size, word.size);
      const material = new THREE.MeshBasicMaterial({ 
        color: word.color,
        transparent: true,
        opacity: 0.8,
        wireframe: true
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(...word.position);
      mesh.userData = {
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.02
        },
        floatSpeed: Math.random() * 0.01 + 0.005,
        floatRange: Math.random() * 1 + 0.5,
        originalY: word.position[1]
      };
      
      textObjects.push(mesh);
      scene.add(mesh);
    });

    // Add some floating particles
    const particles = [];
    for (let i = 0; i < 20; i++) {
      const geometry = new THREE.SphereGeometry(0.1, 8, 8);
      const material = new THREE.MeshBasicMaterial({ 
        color: new THREE.Color().setHSL(Math.random(), 0.7, 0.5),
        transparent: true,
        opacity: 0.6
      });
      
      const particle = new THREE.Mesh(geometry, material);
      particle.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      );
      
      particle.userData = {
        floatSpeed: Math.random() * 0.02 + 0.01,
        floatRange: Math.random() * 2 + 1
      };
      
      particles.push(particle);
      scene.add(particle);
    }

    camera.position.z = 15;

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      // Animate text objects
      textObjects.forEach((obj, index) => {
        obj.rotation.x += obj.userData.rotationSpeed.x;
        obj.rotation.y += obj.userData.rotationSpeed.y;
        obj.rotation.z += obj.userData.rotationSpeed.z;
        
        obj.position.y = obj.userData.originalY + Math.sin(Date.now() * obj.userData.floatSpeed + index) * obj.userData.floatRange;
      });
      
      // Animate particles
      particles.forEach((particle, index) => {
        particle.position.y += Math.sin(Date.now() * particle.userData.floatSpeed + index) * 0.01;
        particle.rotation.y += 0.01;
      });
      
      // Gentle camera movement
      camera.position.x = Math.sin(Date.now() * 0.0003) * 1;
      camera.position.y = Math.cos(Date.now() * 0.0002) * 0.5;
      camera.lookAt(0, 0, 0);
      
      renderer.render(scene, camera);
    };

    animate();
    sceneRef.current = { scene, renderer, camera, textObjects, particles };

    const handleResize = () => {
      camera.aspect = window.innerWidth / 400;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, 400);
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
      textObjects.forEach(obj => {
        scene.remove(obj);
        obj.geometry.dispose();
        obj.material.dispose();
      });
      particles.forEach(particle => {
        scene.remove(particle);
        particle.geometry.dispose();
        particle.material.dispose();
      });
    };
  }, []);

  return (
    <div className="w-full h-[400px] relative">
      <div ref={mountRef} className="w-full h-full" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center text-white/20">
          <h3 className="text-2xl font-bold mb-2">Interactive 3D Experience</h3>
          <p className="text-sm">Watch the floating elements dance</p>
        </div>
      </div>
    </div>
  );
}
