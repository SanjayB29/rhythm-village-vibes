import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-bg.jpg";
import interiorImg from "@/assets/interior.jpg";
import nightImg from "@/assets/night-ambience.jpg";
import masalaTeaImg from "@/assets/masala-tea.jpg";
import blueLagoonImg from "@/assets/blue-lagoon.jpg";
import friedRiceImg from "@/assets/fried-rice.jpg";

const Gallery = () => {
  const images = [
    { src: heroImg, title: "Outdoor Ambience" },
    { src: nightImg, title: "Evening Vibes" },
    { src: interiorImg, title: "Cozy Interior" },
    { src: masalaTeaImg, title: "Masala Tea" },
    { src: blueLagoonImg, title: "Blue Lagoon Mocktail" },
    { src: friedRiceImg, title: "Fried Rice" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section id="gallery" className="py-20 bg-cream-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Gallery
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Take a glimpse into our cozy space, delicious offerings, and vibrant atmosphere
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main Carousel */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-8 group">
            <img
              src={images[currentIndex].src}
              alt={images[currentIndex].title}
              className="w-full h-[400px] md:h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <p className="text-white text-2xl font-bold p-6">
                {images[currentIndex].title}
              </p>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`relative rounded-lg overflow-hidden aspect-square hover:opacity-100 transition-all ${
                  currentIndex === index
                    ? "ring-4 ring-primary opacity-100"
                    : "opacity-60"
                }`}
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
