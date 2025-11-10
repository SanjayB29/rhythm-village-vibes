import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdaptiveNavbarColor } from "@/hooks/useAdaptiveNavbarColor";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Enable adaptive color system with enhanced visibility
  const {
    textColor,
    hoverColor,
    isLight,
    fontWeight,
    textShadow,
    letterSpacing,
    contrastRatio
  } = useAdaptiveNavbarColor(true, 100);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "menu", label: "Menu" },
    { id: "gallery", label: "Gallery" },
    { id: "reviews", label: "Reviews" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled ? "bg-card/95 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
      style={{
        fontFamily: "'Inter', 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif",
      }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => scrollToSection("home")}
            className="text-2xl transition-all duration-500 ease-in-out"
            style={{
              color: textColor,
              fontWeight: fontWeight + 100, // Logo gets extra weight
              textShadow: textShadow,
              letterSpacing: `${letterSpacing}em`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = hoverColor;
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = textColor;
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Rhythm Freezy House
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="transition-all duration-500 ease-in-out relative group"
                style={{
                  color: textColor,
                  fontWeight: fontWeight,
                  textShadow: textShadow,
                  letterSpacing: `${letterSpacing}em`,
                  fontSize: '0.95rem',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = hoverColor;
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.fontWeight = String(Math.min(900, fontWeight + 100));
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = textColor;
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.fontWeight = String(fontWeight);
                }}
              >
                {link.label}
                <span
                  className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                  style={{
                    backgroundColor: textColor,
                    opacity: 0.7,
                    boxShadow: isLight
                      ? '0 0 4px rgba(255, 255, 255, 0.5)'
                      : '0 0 4px rgba(0, 0, 0, 0.3)',
                  }}
                />
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden transition-all duration-500"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              color: textColor,
            }}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className="md:hidden mt-4 pb-4 animate-fade-in rounded-lg"
            style={{
              backgroundColor: isScrolled
                ? 'rgba(255, 255, 255, 0.05)'
                : 'rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div className="flex flex-col gap-4 p-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-left transition-all duration-500 ease-in-out py-2 px-3 rounded-md"
                  style={{
                    color: textColor,
                    fontWeight: fontWeight,
                    textShadow: textShadow,
                    letterSpacing: `${letterSpacing}em`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = hoverColor;
                    e.currentTarget.style.backgroundColor = isLight
                      ? 'rgba(255, 255, 255, 0.1)'
                      : 'rgba(0, 0, 0, 0.1)';
                    e.currentTarget.style.transform = 'translateX(4px)';
                    e.currentTarget.style.fontWeight = String(Math.min(900, fontWeight + 100));
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = textColor;
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.fontWeight = String(fontWeight);
                  }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
