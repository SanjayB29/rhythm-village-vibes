import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Thank you for your interest!",
      description: "We'll get back to you soon. For immediate assistance, please call us.",
    });
  };

  return (
    <section id="contact" className="py-20 bg-cream-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Visit us or reserve your table for an unforgettable experience
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="p-8 bg-card border-border shadow-lg">
            <h3 className="text-2xl font-bold text-primary mb-6">
              Reserve a Table
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  placeholder="Your Name"
                  required
                  className="bg-background border-border"
                />
              </div>
              <div>
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  required
                  className="bg-background border-border"
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Email Address"
                  className="bg-background border-border"
                />
              </div>
              <div>
                <Input
                  type="date"
                  required
                  className="bg-background border-border"
                />
              </div>
              <div>
                <Input
                  type="time"
                  required
                  className="bg-background border-border"
                />
              </div>
              <div>
                <Textarea
                  placeholder="Special requests or occasion details"
                  rows={3}
                  className="bg-background border-border"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Request Reservation
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                *This is a request form. We'll confirm your reservation via phone.
              </p>
            </form>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="p-6 bg-card border-border shadow-lg">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg mb-2 text-foreground">Location</h4>
                  <p className="text-muted-foreground">
                    Tiruvalam Main Road, Ammundi Village
                    <br />
                    Vellore, Tamil Nadu 632519
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Plus Code: X66Q+FQ Vellore
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card border-border shadow-lg">
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg mb-2 text-foreground">Phone</h4>
                  <a
                    href="tel:+919597952688"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    095979 52688
                  </a>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card border-border shadow-lg">
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg mb-2 text-foreground">Hours</h4>
                  <p className="text-muted-foreground">
                    Tuesday - Sunday: 10:00 AM - 9:30 PM
                    <br />
                    <span className="text-destructive font-medium">Monday: Closed</span>
                  </p>
                </div>
              </div>
            </Card>

            {/* Google Maps Embed */}
            <div className="rounded-lg overflow-hidden shadow-lg h-64">
              <iframe
                title="Rhythm Freezy House Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3884.4!2d78.9892!3d12.9611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU3JzQwLjAiTiA3OMKwNTknMjEuMSJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
