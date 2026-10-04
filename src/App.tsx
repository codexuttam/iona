import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import { expState, updateState, subscribeToState } from './components/experience/ExperienceState';
import Experience from './components/experience/Experience';
import Navbar from './components/navigation/Navbar';
import SideProgress from './components/navigation/SideProgress';
import Footer from './components/navigation/Footer';
import Loader from './components/ui/Loader';
import {
  HeroSection,
  WaterSection,
  AlkalineSection,
  IonisedSection,
  ProcessSection,
  ProductSection,
  FinalSection,
} from './components/sections/StorySections';

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 1. Accessibility: Detect user motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    updateState({ reducedMotion: mediaQuery.matches });
    
    const handleMotionChange = (e: MediaQueryListEvent) => {
      updateState({ reducedMotion: e.matches });
    };
    mediaQuery.addEventListener('change', handleMotionChange);

    // 2. Mouse position tracking for cursor interactivity
    const handleMouseMove = (e: MouseEvent) => {
      // Map coordinates to range [-1, 1]
      const targetX = (e.clientX / window.innerWidth) * 2 - 1;
      const targetY = -(e.clientY / window.innerHeight) * 2 + 1;
      
      updateState((prev) => ({
        mouse: {
          ...prev.mouse,
          targetX,
          targetY,
        },
      }));
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 3. Listen to load state
    const unsubscribe = subscribeToState((state) => {
      setIsLoaded(state.isLoaded);
    });

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('mousemove', handleMouseMove);
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    // Setup animations only once the app is loaded and DOM elements exist
    if (!isLoaded) return;

    // 4. Initialize Lenis Smooth Scrolling
    const lenis = new Lenis({
      duration: 1.4, // Fluid cinematic dampening
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    // Update ScrollTrigger on Lenis scroll
    lenis.on('scroll', ScrollTrigger.update);

    // Coordinate GSAP and Lenis ticker frames
    const gsapTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(gsapTicker);
    gsap.ticker.lagSmoothing(0);

    // 5. Establish ScrollTrigger synchronization with our 3D State
    const scrollST = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.8,
      onUpdate: (self) => {
        const progress = self.progress; // 0 to 1
        const totalSections = 7;
        const val = progress * (totalSections - 1);
        const sectionIndex = Math.min(Math.floor(val), totalSections - 1);
        const sectionProgress = val - sectionIndex;

        // Populate state values
        const progresses = Array(totalSections).fill(0);
        progresses[sectionIndex] = sectionProgress;
        
        updateState({
          scrollProgress: progress,
          currentSection: sectionIndex,
          sectionProgresses: progresses,
        });
      },
    });

    // 6. Smooth Background Color Choreography Timeline
    // Colors evolve gradually throughout the scroll
    const bgTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
      },
    });

    bgTimeline
      .to(containerRef.current, { backgroundColor: '#EFFAF9', ease: 'none', duration: 1 }) // Section 1 (Water)
      .to(containerRef.current, { backgroundColor: '#E5F7F6', ease: 'none', duration: 1 }) // Section 2 (Alkaline)
      .to(containerRef.current, { backgroundColor: '#D6F1F2', ease: 'none', duration: 1 }) // Section 3 (Ionised)
      .to(containerRef.current, { backgroundColor: '#C5E9ED', ease: 'none', duration: 1 }) // Section 4 (Process)
      .to(containerRef.current, { backgroundColor: '#B6E2E9', ease: 'none', duration: 1 }) // Section 5 (Product)
      .to(containerRef.current, { backgroundColor: '#F7FCFC', ease: 'none', duration: 1 }); // Section 6 (Final)

    // 7. Cinematic DOM Elements Scroll Animation
    const sectionIds = ['#hero', '#water', '#alkaline', '#ionised', '#process', '#product', '#final'];
    const activeSTs: ScrollTrigger[] = [];

    sectionIds.forEach((id) => {
      const sec = document.querySelector(id);
      if (!sec) return;

      const heading = sec.querySelector('h1, h2');
      const paragraph = sec.querySelector('p');
      const extraCards = sec.querySelectorAll('.p-4, .p-5, .relative > div');

      // Animating the heading with dynamic clip-path reveal + translateY + blur
      if (heading) {
        gsap.fromTo(
          heading,
          {
            opacity: 0,
            y: 80,
            filter: 'blur(8px)',
            clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sec,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Animating paragraphs
      if (paragraph) {
        gsap.fromTo(
          paragraph,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            delay: heading ? 0.2 : 0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sec,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Animating inner details cards (for process and specs)
      if (extraCards.length > 0) {
        gsap.fromTo(
          extraCards,
          {
            opacity: 0,
            y: 40,
            scale: 0.96,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1.0,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sec,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });

    // Cleanup functions
    return () => {
      lenis.destroy();
      gsap.ticker.remove(gsapTicker);
      scrollST.kill();
      bgTimeline.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [isLoaded]);

  return (
    <>
      {/* Luxury Loading Screen */}
      <Loader />

      {/* Main Orchestration Wrapper */}
      <div 
        ref={containerRef} 
        id="app-scroll-container" 
        className="w-full bg-[#F8FEFD] min-h-screen overflow-x-hidden relative transition-colors duration-300"
      >
        {/* Persistent WebGL 3D Canvas */}
        <Experience />

        {/* Brand Header Navigation */}
        <Navbar />

        {/* Left Side Navigation Progress */}
        <SideProgress />

        {/* DOM Storytelling Layout (z-indexed above the Canvas) */}
        <main className="relative z-20 flex flex-col w-full">
          <HeroSection />
          <WaterSection />
          <AlkalineSection />
          <IonisedSection />
          <ProcessSection />
          <ProductSection />
          <FinalSection />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
