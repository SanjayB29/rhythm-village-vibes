import { MapPin, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/outdoor-seating-3.jpg";

const Hero = () => {
  const handleCallNow = () => {
    window.location.href = "tel:+919597952688";
  };

  const handleGetDirections = () => {
    window.open("https://maps.google.com/?q=X66Q+FQ+Vellore,+Tamil+Nadu", "_blank");
  };

  const scrollToMenu = () => {
    const menuSection = document.getElementById("menu");
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
            Sip, Chill & Celebrate
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-cream-light drop-shadow-md">
            at Rhythm Freezy House
          </p>
          <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto text-gray-200">
            Experience the perfect blend of cozy ambience, delicious food, and peaceful vibes in the heart of Vellore
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <Button
              size="lg"
              onClick={scrollToMenu}
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              View Menu
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleGetDirections}
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 shadow-lg"
            >
              Get Directions
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={handleCallNow}
              className="bg-secondary hover:bg-secondary/90 shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              Call Now
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <MapPin className="w-6 h-6 mx-auto mb-2" />
              <p className="text-sm font-medium">Tiruvalam Main Road</p>
              <p className="text-xs text-gray-200">Ammundi Village, Vellore</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <Phone className="w-6 h-6 mx-auto mb-2" />
              <p className="text-sm font-medium">Call Us</p>
              <p className="text-xs text-gray-200">095979 52688</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <Clock className="w-6 h-6 mx-auto mb-2" />
              <p className="text-sm font-medium">Open Daily</p>
              <p className="text-xs text-gray-200">10 AM - 9:30 PM</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
