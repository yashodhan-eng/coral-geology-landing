import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params?: Record<string, any>) => void;
    clarity?: (command: string, ...args: any[]) => void;
  }
}

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
          onClick={() => {
            console.log('🔵 Footer CTA clicked - Sending to Clarity');
            
            // Track GA4 event
            if (window.gtag) {
              window.gtag('event', 'cta_click', {
                event_category: 'engagement',
                event_label: 'footer_try_free',
                button_location: 'footer_section'
              });
            }
            
            // Track Microsoft Clarity event
            if (window.clarity) {
              console.log('✅ Clarity event sent: cta_click_footer');
              window.clarity('event', 'cta_click_footer');
              window.clarity('set', 'button_clicked', 'footer_try_free');
            } else {
              console.warn('⚠️ Clarity not loaded');
            }
            
            onEnrollClick();
          }}
          data-track-id="cta-footer-try-free"
          className="bg-background text-primary hover:bg-background/90 px-6 sm:px-8 py-4 sm:py-5 md:py-6 text-sm sm:text-base md:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto"
        >
          TRY FOR FREE
        </Button>
      </div>
    </section>
  );
};

export default CTABanner;
