import { useState, useEffect, useCallback, useRef } from 'react';
import {
  getBackgroundColor,
  getOptimalTextColor,
  rgbToString,
  getEnhancedHoverColor,
  getOptimalFontWeight,
  getOptimalTextShadow,
  getOptimalLetterSpacing,
} from '@/lib/colorContrast';

interface AdaptiveColorResult {
  textColor: string;
  hoverColor: string;
  isLight: boolean;
  backgroundColor: string;
  fontWeight: number;
  textShadow: string;
  letterSpacing: number;
  luminance: number;
  contrastRatio: number;
}

/**
 * Custom hook for adaptive navbar color based on background
 * Continuously monitors the background and adjusts text color for optimal contrast
 * @param enabled Whether the adaptive color system is enabled
 * @param updateInterval Interval in milliseconds to check for background changes (default: 100ms)
 * @returns Object containing optimal text colors and background info
 */
export function useAdaptiveNavbarColor(
  enabled: boolean = true,
  updateInterval: number = 100
): AdaptiveColorResult {
  const [textColor, setTextColor] = useState<string>('rgb(255, 255, 255)');
  const [hoverColor, setHoverColor] = useState<string>('rgb(200, 200, 200)');
  const [isLight, setIsLight] = useState<boolean>(true);
  const [backgroundColor, setBackgroundColor] = useState<string>('rgb(0, 0, 0)');
  const [fontWeight, setFontWeight] = useState<number>(600);
  const [textShadow, setTextShadow] = useState<string>('none');
  const [letterSpacing, setLetterSpacing] = useState<number>(0);
  const [luminance, setLuminance] = useState<number>(0);
  const [contrastRatio, setContrastRatio] = useState<number>(21);
  
  const rafIdRef = useRef<number | null>(null);
  const lastUpdateRef = useRef<number>(0);
  const lastBgColorRef = useRef<string>('');

  const updateColors = useCallback(() => {
    if (!enabled) return;

    try {
      // Get the element behind the navbar (typically the hero section)
      const navbar = document.querySelector('nav');
      if (!navbar) return;

      const navbarRect = navbar.getBoundingClientRect();
      
      // Find the element at the center of the navbar
      const centerX = navbarRect.left + navbarRect.width / 2;
      const centerY = navbarRect.top + navbarRect.height / 2;
      
      // Temporarily hide navbar to get the element behind it
      const originalPointerEvents = navbar.style.pointerEvents;
      navbar.style.pointerEvents = 'none';
      
      const elementBehind = document.elementFromPoint(centerX, centerY) as HTMLElement;
      
      navbar.style.pointerEvents = originalPointerEvents;

      if (!elementBehind) return;

      // Get the background color of the element behind the navbar
      const bgColor = getBackgroundColor(elementBehind);
      const bgColorString = rgbToString(bgColor.r, bgColor.g, bgColor.b);

      // Only update if the background color has changed significantly
      if (bgColorString === lastBgColorRef.current) return;
      
      lastBgColorRef.current = bgColorString;

      // Calculate optimal text color with enhanced properties
      const optimalColor = getOptimalTextColor(bgColor);
      const textColorString = rgbToString(
        optimalColor.r,
        optimalColor.g,
        optimalColor.b
      );

      // Calculate enhanced hover color
      const hover = getEnhancedHoverColor(
        optimalColor,
        optimalColor.isLight,
        optimalColor.luminance
      );
      const hoverColorString = rgbToString(hover.r, hover.g, hover.b);

      // Calculate optimal font weight
      const weight = getOptimalFontWeight(optimalColor.luminance, optimalColor.isLight);

      // Calculate optimal text shadow
      const shadow = getOptimalTextShadow(optimalColor.isLight, optimalColor.luminance);

      // Calculate optimal letter spacing
      const spacing = getOptimalLetterSpacing(weight, optimalColor.isLight);

      // Update state
      setTextColor(textColorString);
      setHoverColor(hoverColorString);
      setIsLight(optimalColor.isLight);
      setBackgroundColor(bgColorString);
      setFontWeight(weight);
      setTextShadow(shadow);
      setLetterSpacing(spacing);
      setLuminance(optimalColor.luminance);
      setContrastRatio(optimalColor.contrastRatio);
    } catch (error) {
      console.warn('Error updating adaptive navbar colors:', error);
    }
  }, [enabled]);

  const animationLoop = useCallback(() => {
    const now = Date.now();
    
    // Throttle updates to the specified interval
    if (now - lastUpdateRef.current >= updateInterval) {
      updateColors();
      lastUpdateRef.current = now;
    }

    rafIdRef.current = requestAnimationFrame(animationLoop);
  }, [updateColors, updateInterval]);

  useEffect(() => {
    if (!enabled) {
      // Reset to default values when disabled
      setTextColor('rgb(255, 255, 255)');
      setHoverColor('rgb(200, 200, 200)');
      setIsLight(true);
      setFontWeight(600);
      setTextShadow('0 2px 4px rgba(0, 0, 0, 0.3)');
      setLetterSpacing(0);
      return;
    }

    // Initial update
    updateColors();

    // Start animation loop for continuous monitoring
    rafIdRef.current = requestAnimationFrame(animationLoop);

    // Listen for scroll events for immediate updates
    const handleScroll = () => {
      updateColors();
    };

    // Listen for resize events
    const handleResize = () => {
      updateColors();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [enabled, updateColors, animationLoop]);

  return {
    textColor,
    hoverColor,
    isLight,
    backgroundColor,
    fontWeight,
    textShadow,
    letterSpacing,
    luminance,
    contrastRatio,
  };
}

/**
 * Hook for detecting when navbar overlaps with different sections
 * Useful for triggering color changes based on section backgrounds
 */
export function useNavbarSectionDetection() {
  const [currentSection, setCurrentSection] = useState<string>('');

  useEffect(() => {
    const detectSection = () => {
      const navbar = document.querySelector('nav');
      if (!navbar) return;

      const navbarRect = navbar.getBoundingClientRect();
      const sections = document.querySelectorAll('section[id]');

      for (const section of sections) {
        const sectionRect = section.getBoundingClientRect();
        
        // Check if navbar overlaps with this section
        if (
          navbarRect.top < sectionRect.bottom &&
          navbarRect.bottom > sectionRect.top
        ) {
          const sectionId = section.getAttribute('id') || '';
          if (sectionId !== currentSection) {
            setCurrentSection(sectionId);
          }
          break;
        }
      }
    };

    detectSection();
    window.addEventListener('scroll', detectSection, { passive: true });
    window.addEventListener('resize', detectSection, { passive: true });

    return () => {
      window.removeEventListener('scroll', detectSection);
      window.removeEventListener('resize', detectSection);
    };
  }, [currentSection]);

  return currentSection;
}

// Made with Bob
