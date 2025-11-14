import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import TestimonialCarousel from "@/components/TestimonialCarousel";
interface HeroProps {
  onEnrollClick: () => void;
}
const Hero = ({
  onEnrollClick
}: HeroProps) => {
  return <section className="relative min-h-screen flex items-center bg-gradient-to-br from-background via-background to-primary/5 overflow-hidden">
      <div className="container mx-auto px-4 pt-0 sm:pt-1 md:pt-2 lg:pt-3 pb-8 sm:pb-10 md:pb-16 lg:pb-24 lg:max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
          {/* Left Column - Main Content */}
          <div className="w-full lg:flex-1 lg:max-w-3xl space-y-4 sm:space-y-5 md:space-y-7 lg:space-y-10 text-center md:text-center lg:text-left">
            {/* Trust Signals - Top Priority */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 sm:gap-4 lg:gap-5">
              <div className="flex items-center gap-2.5 md:gap-3 bg-white px-4 py-2.5 md:px-5 md:py-3 rounded-full shadow-md">
                <span className="text-sm md:text-base lg:text-lg font-bold text-foreground">Excellent</span>
                <div className="flex gap-0.5">
                  {[...Array(4)].map((_, i) => <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-[#00b67a] text-[#00b67a]" />)}
                  <div className="relative w-4 h-4 md:w-5 md:h-5">
                    <Star className="absolute inset-0 w-4 h-4 md:w-5 md:h-5 text-[#00b67a]" />
                    <div className="absolute inset-0 overflow-hidden" style={{
                    width: '70%'
                  }}>
                      <Star className="w-4 h-4 md:w-5 md:h-5 fill-[#00b67a] text-[#00b67a]" />
                    </div>
                  </div>
                </div>
                <span className="text-sm md:text-base lg:text-lg font-semibold text-[#00b67a]">4.7/5</span>
                <div className="w-px h-5 md:h-6 bg-border"></div>
                <span className="text-sm md:text-base lg:text-lg font-bold text-foreground">Trustpilot</span>
              </div>
              
              <div className="inline-flex items-center gap-1.5 bg-primary/10 px-4 py-2 md:px-6 md:py-2.5 lg:px-8 lg:py-3 rounded-full border border-primary/20 md:shadow-sm whitespace-nowrap">
                <span className="text-xs sm:text-sm md:text-base font-semibold text-primary">Weekly Live Online Classes for Ages 8-13</span>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight md:tracking-tight">
              Geology Adventures: Discover Earth's Deep Secrets
            </h1>

            {/* Description - Condensed on Mobile */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto md:mx-auto lg:mx-0 leading-relaxed md:leading-relaxed">
              <span className="block sm:hidden">Expert-guided geology sessions with immersive experiments that create exceptional learning week after week.</span>
              <span className="hidden sm:block">
                Each week, learners explore new themes in geology & earth science. They will share rock collections, join discussions, and enjoy science experiments and art activities, blending the excitement of a science class with hands-on exploration.
              </span>
            </p>

            {/* CTA Button */}
            <button onClick={onEnrollClick} className="w-full sm:w-full md:w-auto md:px-10 lg:px-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 sm:py-5 md:py-6 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all text-base sm:text-lg md:text-xl lg:animate-pulse lg:hover:animate-none">
              TRY FOR FREE
            </button>

            {/* Class Schedule */}
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
              <span className="text-foreground font-semibold">Every Monday</span> • 5 PM – 5:50 PM (PST) • Online
            </p>

            {/* Mobile Testimonial Carousel - Compact Version */}
            <div className="block lg:hidden pt-2">
              <div className="bg-muted/20 -mx-4 px-4 py-4 rounded-lg border-y border-primary/10">
                <TestimonialCarousel compact={true} />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 md:gap-10 lg:gap-12 pt-2 sm:pt-3 md:pt-4">
              <div className="text-center md:text-center lg:text-left">
                <div className="text-base sm:text-xl md:text-3xl lg:text-4xl font-bold text-primary">100+ years</div>
                <div className="text-[10px] sm:text-xs md:text-base lg:text-lg text-muted-foreground mt-1 md:mt-2 leading-tight mx-[10px]">Teacher experience</div>
              </div>
              <div className="text-center md:text-center lg:text-left md:border-l md:border-r md:border-primary/20 lg:border-0">
                <div className="text-base sm:text-xl md:text-3xl lg:text-4xl font-bold text-primary">Stanford</div>
                <div className="text-[10px] sm:text-xs md:text-base lg:text-lg text-muted-foreground mt-1 md:mt-2 leading-tight mx-[10px] lg:mx-0">Alum, Founder & Mom of 2</div>
              </div>
              <div className="text-center md:text-center lg:text-left">
                <div className="text-base sm:text-xl md:text-3xl lg:text-4xl font-bold text-primary">1000+</div>
                <div className="text-[10px] sm:text-xs md:text-base lg:text-lg text-muted-foreground mt-1 md:mt-2 leading-tight">Families love us</div>
              </div>
            </div>
          </div>

          {/* Right Column - Desktop Testimonials Only */}
          <div className="hidden lg:block lg:flex-1 lg:max-w-md">
            <TestimonialCarousel compact={false} />
          </div>
        </div>
      </div>

      {/* Decorative Elements - Desktop Only */}
      <div className="hidden lg:block absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="hidden lg:block absolute bottom-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
    </section>;
};
export default Hero;