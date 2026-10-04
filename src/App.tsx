import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import { updateState, subscribeToState } from './components/experience/ExperienceState';
import Experience from './components/experience/Experience';
import Navbar from './components/navigation/Navbar';
import SideProgress from './components/navigation/SideProgress';
import Footer from './components/navigation/Footer';
import Loader from './components/ui/Loader';
import ContactModal from './components/modals/ContactModal';
import PrivacyModal from './components/modals/PrivacyModal';
import TermsModal from './components/modals/TermsModal';
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
  const [activeModal, setActiveModal] = useState<'contact' | 'privacy' | 'terms' | null>(null);

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

    // 4. Listen to URL hash changes for deep linking to modal pages (#contact, #privacy, #terms)
    const checkHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#contact') setActiveModal('contact');
      else if (hash === '#privacy') setActiveModal('privacy');
      else if (hash === '#terms') setActiveModal('terms');
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('hashchange', checkHash);
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    // 5. Initialize Lenis Smooth Scrolling
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const gsapTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(gsapTicker);
    gsap.ticker.lagSmoothing(0);

    // 6. ScrollTrigger synchronization with 3D State
    const scrollST = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.8,
      onUpdate: (self) => {
        const progress = self.progress;
        const totalSections = 7;
        const val = progress * (totalSections - 1);
        const sectionIndex = Math.min(Math.floor(val), totalSections - 1);
        const sectionProgress = val - sectionIndex;

        const progresses = Array(totalSections).fill(0);
        progresses[sectionIndex] = sectionProgress;
        
        updateState({
          scrollProgress: progress,
          currentSection: sectionIndex,
          sectionProgresses: progresses,
        });
      },
    });

    // 7. Smooth Background Color Choreography Timeline
    const bgTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
      },
    });

    bgTimeline
      .to(containerRef.current, { backgroundColor: '#EFFAF9', ease: 'none', duration: 1 })
      .to(containerRef.current, { backgroundColor: '#E5F7F6', ease: 'none', duration: 1 })
      .to(containerRef.current, { backgroundColor: '#D6F1F2', ease: 'none', duration: 1 })
      .to(containerRef.current, { backgroundColor: '#C5E9ED', ease: 'none', duration: 1 })
      .to(containerRef.current, { backgroundColor: '#B6E2E9', ease: 'none', duration: 1 })
      .to(containerRef.current, { backgroundColor: '#F7FCFC', ease: 'none', duration: 1 });

    // 8. Cinematic DOM Elements Scroll Animation
    const sectionIds = ['#hero', '#water', '#alkaline', '#ionised', '#process', '#product', '#final'];

    sectionIds.forEach((id) => {
      const sec = document.querySelector(id);
      if (!sec) return;

      const heading = sec.querySelector('h1, h2');
      const paragraph = sec.querySelector('p');
      const extraCards = sec.querySelectorAll('.p-4, .p-5, .relative > div');

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

    return () => {
      lenis.destroy();
      gsap.ticker.remove(gsapTicker);
      scrollST.kill();
      bgTimeline.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [isLoaded]);

  const handleCloseModal = () => {
    setActiveModal(null);
    if (['#contact', '#privacy', '#terms'].includes(window.location.hash.toLowerCase())) {
      history.pushState(null, '', window.location.pathname);
    }
  };

  return (
    <>
      {/* 4K Ciao Energy Inspired Luxury Loading Screen */}
      <Loader />

      {/* Luxury Modals & Pages */}
      <ContactModal isOpen={activeModal === 'contact'} onClose={handleCloseModal} />
      <PrivacyModal isOpen={activeModal === 'privacy'} onClose={handleCloseModal} />
      <TermsModal isOpen={activeModal === 'terms'} onClose={handleCloseModal} />

      {/* Main Orchestration Wrapper */}
      <div 
        ref={containerRef} 
        id="app-scroll-container" 
        className="w-full bg-[#F8FEFD] min-h-screen overflow-x-hidden relative transition-colors duration-300"
      >
        {/* Persistent WebGL 3D Canvas */}
        <Experience />

        {/* Brand Header Navigation */}
        <Navbar onOpenModal={(type) => setActiveModal(type)} />

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
          <FinalSection onOpenContact={() => setActiveModal('contact')} />
        </main>

        {/* Footer with modal triggers */}
        <Footer onOpenModal={(type) => setActiveModal(type)} />
      </div>
    </>
  );
}
