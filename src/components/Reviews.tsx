import { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Reviews = () => {
  const reviews = [
    {
      name: "Arun Kumar",
      rating: 5,
      text: "Amazing ambience! Perfect place for a peaceful evening. The masala tea is absolutely delicious.",
      date: "2 weeks ago",
    },
    {
      name: "Priya Sharma",
      rating: 5,
      text: "Celebrated my birthday here. The staff was very cooperative and the outdoor seating is beautiful!",
      date: "1 month ago",
    },
    {
      name: "Rajesh M",
      rating: 4,
      text: "Great food and lovely village vibes. The Blue Lagoon mocktail is a must-try!",
      date: "3 weeks ago",
    },
    {
      name: "Divya R",
      rating: 5,
      text: "Such a cozy place! Perfect for hanging out with friends. Love the natural décor and friendly service.",
      date: "1 week ago",
    },
    {
      name: "Karthik S",
      rating: 4,
      text: "Good food, nice ambience, and reasonable prices. The fried rice was excellent!",
      date: "2 months ago",
    },
  ];

  const [currentReview, setCurrentReview] = useState(0);

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section id="reviews" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            What Our Guests Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Read reviews from our happy customers on Google
          </p>
          <div className="flex items-center justify-center gap-2">
            <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
            <span className="text-2xl font-bold text-foreground">4.2</span>
            <span className="text-muted-foreground">/ 5.0</span>
            <span className="text-sm text-muted-foreground ml-2">
              (1,189+ reviews)
            </span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="p-8 md:p-12 bg-card border-border shadow-lg relative">
            <div className="mb-6 flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < reviews[currentReview].rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <p className="text-lg md:text-xl text-card-foreground mb-6 italic">
              "{reviews[currentReview].text}"
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-foreground">
                  {reviews[currentReview].name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {reviews[currentReview].date}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevReview}
                  className="hover:bg-accent"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextReview}
                  className="hover:bg-accent"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>

          <div className="mt-8 text-center">
            <a
              href="https://maps.google.com/?q=X66Q+FQ+Vellore,+Tamil+Nadu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 font-medium underline"
            >
              View all reviews on Google Maps →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
