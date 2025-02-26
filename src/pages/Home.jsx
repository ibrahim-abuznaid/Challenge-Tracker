import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import './HomeAnimations.css';

function Home() {
  const featuresRef = useRef(null);
  const heroRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);

  // Handle mouse movement for parallax effect
  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const { width, height } = heroRef.current.getBoundingClientRect();
    const centerX = width / 2;
    const centerY = height / 2;
    const moveX = (e.clientX - centerX) / 25;
    const moveY = (e.clientY - centerY) / 25;
    
    setMousePosition({ x: moveX, y: moveY });
  };

  // Handle scroll progress
  const handleScroll = () => {
    const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    setScrollProgress(progress);
  };

  // Create particle effect
  const createParticles = () => {
    const particles = document.createElement('div');
    particles.className = 'particles';
    
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random position, size and animation duration
      const size = Math.random() * 8 + 2;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const delay = Math.random() * 5;
      const duration = Math.random() * 10 + 5;
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      particle.style.opacity = Math.random() * 0.6 + 0.2;
      particle.style.animationDuration = `${duration}s`;
      particle.style.animationDelay = `${delay}s`;
      
      particles.appendChild(particle);
    }
    
    return particles;
  };

  useEffect(() => {
    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    // Add the floating shapes to the hero section
    const hero = document.querySelector('.hero');
    if (hero) {
      const shapes = ['shape-1', 'shape-2', 'shape-3', 'shape-4', 'shape-5'];
      shapes.forEach(className => {
        const shape = document.createElement('div');
        shape.className = `shape ${className}`;
        hero.appendChild(shape);
      });
      
      // Add particles
      const particles = createParticles();
      hero.appendChild(particles);
      
      // Add wave divider
      const waveDivider = document.createElement('div');
      waveDivider.className = 'wave-divider';
      hero.appendChild(waveDivider);
    }

    // Animate features on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const features = Array.from(featuresRef.current.querySelectorAll('.feature'));
            features.forEach((feature, index) => {
              setTimeout(() => {
                feature.classList.add('animated');
              }, index * 150);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }
    
    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      document.body.removeChild(progressBar);
    };
  }, []);

  // Update scroll progress
  useEffect(() => {
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
      progressBar.style.width = `${scrollProgress}%`;
    }
  }, [scrollProgress]);

  return (
    <div className="home-page">
      <section className="hero" ref={heroRef} onMouseMove={handleMouseMove}>
        <div 
          className="hero-content parallax-layer"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
          }}
        >
          <h1>Master New Skills with Daily Challenges</h1>
          <p>
            Join structured, time-bound challenges designed to help you learn 
            and grow through consistent daily practice.
          </p>
          <div className="hero-actions">
            <Link to="/challenges" className="hero-btn browse-btn">
              Browse Challenges
            </Link>
            <Link to="/dashboard" className="hero-btn dashboard-btn">
              My Dashboard
            </Link>
          </div>
        </div>
      </section>
      
      <section className="features container perspective-container" ref={featuresRef}>
        <h2>How It Works</h2>
        <div className="feature-grid">
          <div className="feature">
            <div className="feature-icon">1</div>
            <h3>Choose a Challenge</h3>
            <p>Browse our library of skill-building challenges across various categories.</p>
          </div>
          <div className="feature">
            <div className="feature-icon">2</div>
            <h3>Complete Daily Tasks</h3>
            <p>Follow simple, structured daily tasks designed to build your skills step by step.</p>
          </div>
          <div className="feature">
            <div className="feature-icon">3</div>
            <h3>Track Your Progress</h3>
            <p>Mark tasks as complete and watch your progress grow day by day.</p>
          </div>
          <div className="feature">
            <div className="feature-icon">4</div>
            <h3>Earn Achievements</h3>
            <p>Complete challenges to earn badges and celebrate your accomplishments.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home; 