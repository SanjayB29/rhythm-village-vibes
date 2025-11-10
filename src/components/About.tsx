import { Star, Users, Car, Accessibility } from "lucide-react";
import { Card } from "@/components/ui/card";

const About = () => {
  const features = [
    {
      icon: Star,
      title: "4.2★ Rating",
      description: "1,189+ Happy Customers",
    },
    {
      icon: Users,
      title: "Perfect for Groups",
      description: "Ideal for hangouts & celebrations",
    },
    {
      icon: Car,
      title: "Drive-through",
      description: "Multiple service options",
    },
    {
      icon: Accessibility,
      title: "Accessible",
      description: "Wheelchair friendly with ample parking",
    },
  ];

  return (
    <section id="about" className="py-20 bg-cream-light">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              About Us
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Nestled in the peaceful surroundings of Ammundi Village, Rhythm Freezy House offers a unique dining experience with natural beauty and cozy ambience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card border-border animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <feature.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-lg font-semibold mb-2 text-card-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>

          <div className="bg-card rounded-2xl p-8 md:p-12 shadow-lg border border-border">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                  A Village Oasis
                </h3>
                <p className="text-muted-foreground mb-4">
                  Our restaurant combines rustic charm with modern comfort, featuring beautiful outdoor seating surrounded by greenery and creative natural design elements.
                </p>
                <p className="text-muted-foreground mb-4">
                  Whether you're here for a quiet chai, a birthday celebration, or an evening with friends, we provide the perfect setting with light music and a relaxing atmosphere.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-accent rounded-full text-sm font-medium text-accent-foreground">
                    Dine-in
                  </span>
                  <span className="px-3 py-1 bg-accent rounded-full text-sm font-medium text-accent-foreground">
                    Drive-through
                  </span>
                  <span className="px-3 py-1 bg-accent rounded-full text-sm font-medium text-accent-foreground">
                    Delivery
                  </span>
                  <span className="px-3 py-1 bg-accent rounded-full text-sm font-medium text-accent-foreground">
                    Live Music
                  </span>
                </div>
              </div>
              <div>
                <div className="bg-accent/50 rounded-xl p-6 border border-border">
                  <h4 className="text-xl font-semibold mb-4 text-foreground">Opening Hours</h4>
                  <div className="space-y-2 text-muted-foreground">
                    <p className="flex justify-between">
                      <span>Tuesday - Sunday</span>
                      <span className="font-medium">10:00 AM - 9:30 PM</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Monday</span>
                      <span className="font-medium text-destructive">Closed</span>
                    </p>
                  </div>
                  <div className="mt-6 pt-6 border-t border-border">
                    <p className="text-sm text-muted-foreground">Price Range</p>
                    <p className="text-2xl font-bold text-primary">₹200 - ₹400</p>
                    <p className="text-xs text-muted-foreground">per person</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
