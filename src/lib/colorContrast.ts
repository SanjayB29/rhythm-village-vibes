/**
 * Color Contrast Utility Functions
 * Implements WCAG 2.1 color contrast calculations and automatic color adjustment
 */

/**
 * Converts RGB color to relative luminance
 * @param r Red value (0-255)
 * @param g Green value (0-255)
 * @param b Blue value (0-255)
 * @returns Relative luminance value (0-1)
 */
export function getRelativeLuminance(r: number, g: number, b: number): number {
  // Normalize RGB values to 0-1 range
  const [rs, gs, bs] = [r, g, b].map((val) => {
    const normalized = val / 255;
    // Apply gamma correction
    return normalized <= 0.03928
      ? normalized / 12.92
      : Math.pow((normalized + 0.055) / 1.055, 2.4);
  });

  // Calculate relative luminance using WCAG formula
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculates contrast ratio between two colors
 * @param l1 Luminance of first color
 * @param l2 Luminance of second color
 * @returns Contrast ratio (1-21)
 */
export function getContrastRatio(l1: number, l2: number): number {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Parses various color formats and returns RGB values
 * @param color Color string (hex, rgb, rgba, hsl, hsla)
 * @returns RGB object or null if parsing fails
 */
export function parseColor(color: string): { r: number; g: number; b: number } | null {
  // Create a temporary element to leverage browser's color parsing
  const temp = document.createElement('div');
  temp.style.color = color;
  document.body.appendChild(temp);
  const computed = window.getComputedStyle(temp).color;
  document.body.removeChild(temp);

  // Parse rgb/rgba format
  const match = computed.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (match) {
    return {
      r: parseInt(match[1]),
      g: parseInt(match[2]),
      b: parseInt(match[3]),
    };
  }

  return null;
}

/**
 * Extracts the dominant background color from an element
 * Handles gradients, images, and solid colors
 * @param element HTML element to analyze
 * @returns RGB object representing the dominant color
 */
export function getBackgroundColor(element: HTMLElement): { r: number; g: number; b: number } {
  const styles = window.getComputedStyle(element);
  const bgColor = styles.backgroundColor;
  const bgImage = styles.backgroundImage;

  // If there's a background image or gradient, sample the center pixel
  if (bgImage && bgImage !== 'none') {
    return sampleElementColor(element);
  }

  // Parse solid background color
  const parsed = parseColor(bgColor);
  if (parsed && (parsed.r !== 0 || parsed.g !== 0 || parsed.b !== 0 || bgColor.includes('rgba'))) {
    return parsed;
  }

  // If transparent or no background, check parent elements
  const parent = element.parentElement;
  if (parent && parent !== document.body) {
    return getBackgroundColor(parent);
  }

  // Default to white if no background found
  return { r: 255, g: 255, b: 255 };
}

/**
 * Samples the color at the center of an element using canvas
 * Useful for gradients and background images
 * @param element HTML element to sample
 * @returns RGB object of the sampled color
 */
export function sampleElementColor(element: HTMLElement): { r: number; g: number; b: number } {
  try {
    const rect = element.getBoundingClientRect();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return { r: 255, g: 255, b: 255 };
    }

    canvas.width = rect.width;
    canvas.height = rect.height;

    // Draw the element onto canvas
    const html2canvas = (window as any).html2canvas;
    if (html2canvas) {
      // If html2canvas is available, use it for better accuracy
      html2canvas(element, { canvas, logging: false }).then((canvas: HTMLCanvasElement) => {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const centerX = Math.floor(canvas.width / 2);
          const centerY = Math.floor(canvas.height / 2);
          const pixel = ctx.getImageData(centerX, centerY, 1, 1).data;
          return { r: pixel[0], g: pixel[1], b: pixel[2] };
        }
      });
    }

    // Fallback: sample from computed background
    const bgColor = window.getComputedStyle(element).backgroundColor;
    const parsed = parseColor(bgColor);
    return parsed || { r: 255, g: 255, b: 255 };
  } catch (error) {
    console.warn('Error sampling element color:', error);
    return { r: 255, g: 255, b: 255 };
  }
}

/**
 * Determines the optimal text color (black or white) for a given background
 * Ensures WCAG AA compliance (4.5:1 contrast ratio)
 * @param backgroundColor RGB object of background color
 * @returns Optimal text color as RGB object with enhanced properties
 */
export function getOptimalTextColor(backgroundColor: {
  r: number;
  g: number;
  b: number;
}): {
  r: number;
  g: number;
  b: number;
  isLight: boolean;
  luminance: number;
  contrastRatio: number;
} {
  const bgLuminance = getRelativeLuminance(
    backgroundColor.r,
    backgroundColor.g,
    backgroundColor.b
  );

  // Calculate contrast ratios for white and black text
  const whiteLuminance = 1; // White has luminance of 1
  const blackLuminance = 0; // Black has luminance of 0

  const whiteContrast = getContrastRatio(whiteLuminance, bgLuminance);
  const blackContrast = getContrastRatio(blackLuminance, bgLuminance);

  // WCAG AA requires 4.5:1 for normal text, 3:1 for large text
  const minContrast = 4.5;

  // Choose the color with better contrast
  if (whiteContrast >= blackContrast && whiteContrast >= minContrast) {
    return {
      r: 255,
      g: 255,
      b: 255,
      isLight: true,
      luminance: bgLuminance,
      contrastRatio: whiteContrast
    };
  } else if (blackContrast >= minContrast) {
    return {
      r: 0,
      g: 0,
      b: 0,
      isLight: false,
      luminance: bgLuminance,
      contrastRatio: blackContrast
    };
  }

  // If neither meets the minimum, choose the one with better contrast
  const useWhite = whiteContrast > blackContrast;
  return useWhite
    ? {
        r: 255,
        g: 255,
        b: 255,
        isLight: true,
        luminance: bgLuminance,
        contrastRatio: whiteContrast
      }
    : {
        r: 0,
        g: 0,
        b: 0,
        isLight: false,
        luminance: bgLuminance,
        contrastRatio: blackContrast
      };
}

/**
 * Calculates optimal font weight based on background luminance
 * Lighter backgrounds need heavier fonts for better visibility
 * @param bgLuminance Background luminance (0-1)
 * @param isLight Whether text color is light
 * @returns Font weight value (400-800)
 */
export function getOptimalFontWeight(bgLuminance: number, isLight: boolean): number {
  if (isLight) {
    // White text on dark background - use medium to bold
    // Darker backgrounds need bolder text
    if (bgLuminance < 0.1) return 700; // Very dark
    if (bgLuminance < 0.2) return 600; // Dark
    return 500; // Medium dark
  } else {
    // Black text on light background - use bold to extra bold
    // Lighter backgrounds need much bolder text for visibility
    if (bgLuminance > 0.8) return 800; // Very light
    if (bgLuminance > 0.6) return 700; // Light
    if (bgLuminance > 0.4) return 600; // Medium light
    return 500; // Medium
  }
}

/**
 * Generates optimal text shadow based on background and text color
 * @param isLight Whether text color is light
 * @param bgLuminance Background luminance (0-1)
 * @returns CSS text-shadow string
 */
export function getOptimalTextShadow(isLight: boolean, bgLuminance: number): string {
  if (isLight) {
    // White text on dark background
    const opacity = Math.max(0.3, 1 - bgLuminance * 2);
    const blur = bgLuminance < 0.1 ? 3 : 2;
    return `0 ${blur}px ${blur * 2}px rgba(0, 0, 0, ${opacity}), 0 1px 2px rgba(0, 0, 0, ${opacity * 0.8})`;
  } else {
    // Black text on light background - needs stronger shadow
    const opacity = Math.min(0.4, bgLuminance * 0.5);
    const blur = bgLuminance > 0.8 ? 4 : 3;
    return `0 ${blur}px ${blur * 2}px rgba(255, 255, 255, ${opacity}), 0 1px 3px rgba(255, 255, 255, ${opacity * 0.9}), 0 0 1px rgba(0, 0, 0, 0.1)`;
  }
}

/**
 * Gets enhanced hover color with better visibility
 * @param color RGB object
 * @param isLight Whether the color is light
 * @param bgLuminance Background luminance for context
 * @returns Adjusted RGB object
 */
export function getEnhancedHoverColor(
  color: { r: number; g: number; b: number },
  isLight: boolean,
  bgLuminance: number
): { r: number; g: number; b: number } {
  if (isLight) {
    // White text - make slightly darker on hover
    const adjustment = Math.floor(30 + (bgLuminance * 20));
    return {
      r: Math.max(180, color.r - adjustment),
      g: Math.max(180, color.g - adjustment),
      b: Math.max(180, color.b - adjustment),
    };
  } else {
    // Black text - make slightly lighter on hover for better visibility
    const adjustment = Math.floor(40 + ((1 - bgLuminance) * 30));
    return {
      r: Math.min(80, color.r + adjustment),
      g: Math.min(80, color.g + adjustment),
      b: Math.min(80, color.b + adjustment),
    };
  }
}

/**
 * Calculates letter spacing for optimal readability
 * @param fontWeight Font weight value
 * @param isLight Whether text is light colored
 * @returns Letter spacing in em units
 */
export function getOptimalLetterSpacing(fontWeight: number, isLight: boolean): number {
  // Heavier fonts need more letter spacing
  if (fontWeight >= 700) {
    return isLight ? 0.02 : 0.03;
  } else if (fontWeight >= 600) {
    return isLight ? 0.01 : 0.02;
  }
  return isLight ? 0 : 0.01;
}

/**
 * Converts RGB to CSS color string
 * @param r Red value (0-255)
 * @param g Green value (0-255)
 * @param b Blue value (0-255)
 * @returns CSS rgb() string
 */
export function rgbToString(r: number, g: number, b: number): string {
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
}

/**
 * Gets a slightly adjusted color for hover states
 * @param color RGB object
 * @param isLight Whether the color is light
 * @returns Adjusted RGB object
 */
export function getHoverColor(
  color: { r: number; g: number; b: number },
  isLight: boolean
): { r: number; g: number; b: number } {
  const adjustment = isLight ? -30 : 30;
  return {
    r: Math.max(0, Math.min(255, color.r + adjustment)),
    g: Math.max(0, Math.min(255, color.g + adjustment)),
    b: Math.max(0, Math.min(255, color.b + adjustment)),
  };
}

// Made with Bob
