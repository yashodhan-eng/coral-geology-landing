import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";

const testimonials = [
  {
    text: "My son started a rock collection after the first class and now explains plate tectonics to anyone who will listen!",
    author: "Sarah L.",
    location: "New York",
    rating: 5,
  },
  {
    text: "My daughter loves the hands-on experiments and can't wait to share her fossils every week!",
    author: "Jennifer M.",
    location: "California",
    rating: 5,
  },
  {
    text: "Finally, a science class that makes geology fun and accessible for kids.",
    author: "Michael R.",
    location: "Texas",
    rating: 4.7,
  },
  {
    text: "Teacher Amalia makes learning about rocks and Earth's history so engaging and memorable.",
    author: "Lisa P.",
    location: "Florida",
    rating: 5,
  },
  {
    text: "My son can't wait for Thursday classes - he's become a little geologist!",
    author: "David K.",
    location: "Nevada",
    rating: 4.5,
  },
  {
    text: "Great way to introduce earth science and spark curiosity about our planet.",
    author: "Amanda S.",
    location: "Arizona",
    rating: 4,
  },
  {
    text: "The mineral testing and crystal projects build scientific thinking and observation skills.",
    author: "Robert T.",
    location: "Colorado",
    rating: 5,
  },
];

interface TestimonialCarouselProps {
  compact?: boolean;
}

const TestimonialCarousel = ({ compact = false }: TestimonialCarouselProps) => {
  const plugin = useRef(
    Autoplay({ delay: compact ? 2000 : 2500, stopOnInteraction: false })
  );

  return (
    <div className="w-full overflow-hidden">
      <Carousel
        opts={{
          align: "start",
          loop: true,
          dragFree: true,
        }}
        plugins={[plugin.current]}
        className="w-full"
      >
        <CarouselContent className={compact ? "-ml-2" : "-ml-2 md:-ml-4"}>
          {testimonials.map((testimonial, index) => (
            <CarouselItem 
              key={index} 
              className={
                compact 
                  ? "pl-2 basis-[85%] sm:basis-[70%]" 
                  : "pl-2 md:pl-4 basis-full"
              }
            >
              <Card className={
                compact
                  ? "p-3 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all h-full"
                  : "p-6 lg:p-8 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 hover:shadow-lg transition-all h-full"
              }>
                <div className={
                  compact
                    ? "space-y-1.5 min-h-[85px] flex flex-col justify-between"
                    : "space-y-4 lg:space-y-5 min-h-[180px] lg:min-h-[200px] flex flex-col justify-between"
                }>
                  <div className="flex gap-0.5 lg:gap-1">
                    {[...Array(5)].map((_, i) => {
                      const fillPercentage = Math.min(Math.max(testimonial.rating - i, 0), 1);
                      return (
                        <span 
                          key={i} 
                          className={compact ? "text-primary text-xs relative" : "text-primary text-lg lg:text-xl relative"}
                        >
                          <span className="text-muted-foreground/30">★</span>
                          <span 
                            className="absolute inset-0 overflow-hidden text-primary"
                            style={{ width: `${fillPercentage * 100}%` }}
                          >
                            ★
                          </span>
                        </span>
                      );
                    })}
                  </div>
                  <p className={
                    compact
                      ? "text-xs text-foreground font-medium leading-snug flex-1"
                      : "text-base lg:text-lg xl:text-xl text-foreground font-medium leading-relaxed flex-1"
                  }>
                    "{testimonial.text}"
                  </p>
                  <div className={
                    compact
                      ? "text-[10px] text-muted-foreground font-medium"
                      : "text-sm lg:text-base text-muted-foreground font-medium"
                  }>
                    <p>— {testimonial.author}</p>
                    <p className="opacity-70">{testimonial.location}</p>
                  </div>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default TestimonialCarousel;
