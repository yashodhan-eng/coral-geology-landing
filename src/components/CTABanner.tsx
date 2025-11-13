import { Button } from "@/components/ui/button";

interface CTABannerProps {
  onEnrollClick: () => void;
}

const CTABanner = ({ onEnrollClick }: CTABannerProps) => {
  return (
    <section className="py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-6 bg-gradient-to-r from-primary via-primary/90 to-primary">
      <div className="container max-w-4xl mx-auto text-center space-y-4 sm:space-y-5 md:space-y-6 fade-in-up">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary-foreground leading-tight px-2">
          Start your child's geology adventure today — Free Trial Available!
        </h3>
        
        <Button 
          size="lg"
          onClick={onEnrollClick}
          className="bg-background text-primary hover:bg-background/90 px-6 sm:px-8 py-4 sm:py-5 md:py-6 text-sm sm:text-base md:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto"
        >
          TRY FOR FREE
        </Button>
      </div>
    </section>
  );
};

export default CTABanner;
