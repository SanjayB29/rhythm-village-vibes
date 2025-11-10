import { Card } from "@/components/ui/card";
import { Coffee, Wine, Utensils } from "lucide-react";
import masalaTeaImg from "@/assets/masala-tea.jpg";
import blueLagoonImg from "@/assets/blue-lagoon.jpg";
import friedRiceImg from "@/assets/fried-rice.jpg";

const Menu = () => {
  const menuCategories = [
    {
      icon: Coffee,
      title: "Beverages",
      items: [
        { name: "Masala Tea", price: "₹30", image: masalaTeaImg, popular: true },
        { name: "Matka Chai", price: "₹40", popular: true },
        { name: "Iced Coffee", price: "₹80" },
        { name: "Filter Coffee", price: "₹50" },
      ],
    },
    {
      icon: Wine,
      title: "Mocktails & Refreshments",
      items: [
        { name: "Blue Lagoon Mocktail", price: "₹120", image: blueLagoonImg, popular: true },
        { name: "Virgin Mojito", price: "₹100" },
        { name: "Fresh Lime Soda", price: "₹60" },
        { name: "Seasonal Fruit Juice", price: "₹80" },
      ],
    },
    {
      icon: Utensils,
      title: "Food",
      items: [
        { name: "Fried Rice", price: "₹150", image: friedRiceImg, popular: true },
        { name: "Hakka Noodles", price: "₹140", popular: true },
        { name: "French Fries", price: "₹80" },
        { name: "Paneer Tikka", price: "₹180" },
        { name: "Biscuits", price: "₹20" },
      ],
    },
  ];

  return (
    <section id="menu" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Our Menu
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our selection of delicious food and beverages, crafted with love and served with care
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid gap-12">
          {menuCategories.map((category, index) => (
            <div key={index} className="animate-slide-up" style={{ animationDelay: `${index * 150}ms` }}>
              <div className="flex items-center gap-3 mb-6">
                <category.icon className="w-8 h-8 text-primary" />
                <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                  {category.title}
                </h3>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.items.map((item, itemIndex) => (
                  <Card
                    key={itemIndex}
                    className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card border-border group"
                  >
                    {item.image && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        {item.popular && (
                          <span className="absolute top-2 right-2 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                            Popular
                          </span>
                        )}
                      </div>
                    )}
                    <div className="p-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold text-lg text-card-foreground">
                          {item.name}
                        </h4>
                        <span className="text-primary font-bold">{item.price}</span>
                      </div>
                      {item.popular && !item.image && (
                        <span className="inline-block mt-2 bg-secondary/20 text-secondary px-2 py-1 rounded text-xs font-medium">
                          Popular Choice
                        </span>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Prices are approximate and subject to change. Please ask our staff for the current menu.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Menu;
