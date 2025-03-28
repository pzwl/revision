import React, { useEffect, useRef } from 'react';

const RepellingParticleSystem = () => {
  const canvasRef = useRef(null);
  const backgroundRef = useRef(null);

  useEffect(() => {
    // Create a dark background
    const background = document.createElement('div');
    background.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #121721 0%, #090a0f 100%);
      z-index: -2;
    `;
    document.body.appendChild(background);
    backgroundRef.current = background;

    // Canvas for particle system
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
    `;
    document.body.appendChild(canvas);
    canvasRef.current = canvas;

    // Initialize canvas
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    // Particle class
    class Particle {
      constructor(x, y) {
        this.position = { x, y };
        this.size = Math.random() * 2 + 1;
        this.baseSize = this.size;
        this.color = this.getRandomColor();
        this.velocity = {
          x: (Math.random() - 0.5) * 0.2,
          y: (Math.random() - 0.5) * 0.2
        };
        this.acceleration = { x: 0, y: 0 };
        this.maxSpeed = 1.2;
        this.maxForce = 0.05;
        this.repulsionRadius = 150;
        this.connectionDistance = 120;
        this.targetSize = this.size;
      }

      getRandomColor() {
        // Generate colors in blue/purple range
        const hue = Math.random() * 60 + 220; // 220-280: blue to purple
        const saturation = Math.random() * 20 + 70; // 70-90%
        const lightness = Math.random() * 15 + 60; // 60-75%
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      }

      update() {
        // Apply acceleration and limit speed
        this.velocity.x += this.acceleration.x;
        this.velocity.y += this.acceleration.y;
        
        const speed = Math.sqrt(this.velocity.x ** 2 + this.velocity.y ** 2);
        if (speed > this.maxSpeed) {
          this.velocity.x = (this.velocity.x / speed) * this.maxSpeed;
          this.velocity.y = (this.velocity.y / speed) * this.maxSpeed;
        }
        
        // Update position
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        
        // Reset acceleration
        this.acceleration.x = 0;
        this.acceleration.y = 0;
        
        // Wrap around the screen
        this.wrap();
        
        // Gradually move towards target size
        this.size += (this.targetSize - this.size) * 0.1;
      }

      // Apply force to the particle
      applyForce(force) {
        this.acceleration.x += force.x;
        this.acceleration.y += force.y;
      }

      // Wrap around screen edges
      wrap() {
        if (this.position.x < 0) this.position.x = canvas.width;
        if (this.position.x > canvas.width) this.position.x = 0;
        if (this.position.y < 0) this.position.y = canvas.height;
        if (this.position.y > canvas.height) this.position.y = 0;
      }

      // Repel from cursor
      repelFromMouse() {
        const dx = this.position.x - mouseX;
        const dy = this.position.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Only repel within repulsion radius
        if (distance < this.repulsionRadius) {
          // Calculate repulsion strength based on distance
          const strength = (this.repulsionRadius - distance) / this.repulsionRadius;
          
          // Normalize direction
          const forceX = dx / distance || 0;
          const forceY = dy / distance || 0;
          
          // Apply repulsion force
          this.applyForce({
            x: forceX * strength * this.maxForce * 1.5,
            y: forceY * strength * this.maxForce * 1.5
          });
          
          // Make particles larger near the cursor
          this.targetSize = this.baseSize * (1 + strength * 2);
        } else {
          this.targetSize = this.baseSize;
        }
      }

      // Draw the particle
      draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    // Create particles
    const createParticles = () => {
      const count = Math.min(Math.floor(window.innerWidth * window.innerHeight / 10000), 200);
      const particles = [];
      
      for (let i = 0; i < count; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push(new Particle(x, y));
      }
      
      return particles;
    };

    // Initialize particles
    let particles = createParticles();

    // Handle canvas resize
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        particles = createParticles();
      }
    };

    // Handle mouse movement
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Animation function
    const animate = () => {
      if (!canvasRef.current) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.repelFromMouse();
        particle.update();
      });
      
      // Draw connections
      ctx.beginPath();
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].position.x - particles[j].position.x;
          const dy = particles[i].position.y - particles[j].position.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < particles[i].connectionDistance) {
            const alpha = 1 - (distance / particles[i].connectionDistance);
            ctx.strokeStyle = `rgba(100, 150, 255, ${alpha * 0.2})`;
            ctx.lineWidth = alpha * 0.5;
            
            ctx.moveTo(particles[i].position.x, particles[i].position.y);
            ctx.lineTo(particles[j].position.x, particles[j].position.y);
          }
        }
      }
      ctx.stroke();
      
      // Draw particles
      particles.forEach(particle => particle.draw(ctx));
      
      animationFrameId = requestAnimationFrame(animate);
    };

    // Set up event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Initial setup
    handleResize();
    animate();

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      if (backgroundRef.current) {
        document.body.removeChild(backgroundRef.current);
      }
      if (canvasRef.current) {
        document.body.removeChild(canvasRef.current);
      }
    };
  }, []); // Empty dependency array since we only want to run this once

  return null;
};

export default RepellingParticleSystem; 