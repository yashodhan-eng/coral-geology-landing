import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { adCampaignService } from "@/lib/api";

declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params?: Record<string, any>) => void;
    grecaptcha: {
      ready: (callback: () => void) => void;
      render: (container: HTMLElement, options: {
        sitekey: string;
        callback?: (token: string) => void;
        'error-callback'?: () => void;
        size?: 'normal' | 'compact';
        theme?: 'light' | 'dark';
      }) => number;
      reset: (widgetId: number) => void;
      getResponse: (widgetId: number) => string;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

// Email validation regex (browser-compatible)
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// Step 1 validation - only parent name
const step1Schema = z.object({
  parentName: z.string()
    .trim()
    .min(2, { message: "Parent name must be at least 2 characters" })
    .max(100, { message: "Parent name must be less than 100 characters" }),
});

// Step 2 validation - only email
const step2Schema = z.object({
  email: z.string()
    .trim()
    .min(1, { message: "Email is required" })
    .max(255, { message: "Email must be less than 255 characters" })
    .refine((email) => EMAIL_REGEX.test(email), {
      message: "Please enter a valid email address",
    }),
});

// Complete form data type
const enrollmentSchema = z.object({
  parentName: z.string()
    .trim()
    .min(2, { message: "Parent name must be at least 2 characters" })
    .max(100, { message: "Parent name must be less than 100 characters" }),
  email: z.string()
    .trim()
    .min(1, { message: "Email is required" })
    .max(255, { message: "Email must be less than 255 characters" })
    .refine((email) => EMAIL_REGEX.test(email), {
      message: "Please enter a valid email address",
    }),
});

type EnrollmentFormData = z.infer<typeof enrollmentSchema>;

interface EnrollmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EnrollmentModal = ({ open, onOpenChange }: EnrollmentModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaLoaded = useRef(false);
  const recaptchaWidgetId = useRef<number | null>(null);
  const recaptchaContainerRef = useRef<HTMLDivElement>(null);
  const retryCountRef = useRef(0);

  const form = useForm<EnrollmentFormData>({
    resolver: zodResolver(enrollmentSchema),
    defaultValues: {
      parentName: "",
      email: "",
    },
  });

  // Load reCAPTCHA script once (v2 checkbox)
  useEffect(() => {
    if (!recaptchaLoaded.current) {
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        recaptchaLoaded.current = true;
      };
      document.body.appendChild(script);
    }
  }, []);

  // Render/re-render reCAPTCHA when modal opens and on step 2
  useEffect(() => {
    if (!open) {
      // Reset when modal closes
      setRecaptchaToken(null);
      setCurrentStep(1);
      form.reset();
      if (recaptchaWidgetId.current !== null && window.grecaptcha) {
        try {
          window.grecaptcha.reset(recaptchaWidgetId.current);
        } catch (error) {
          // Ignore reset errors
        }
        // Keep widget id so we can just reset on reopen (avoid re-render errors)
      }
      return;
    }

    // Only render reCAPTCHA on step 2
    if (currentStep !== 2) {
      return;
    }

    // Render when modal opens
    const siteKey = '6Lcnpv4rAAAAAOGN8RszPxz9mpL94Ql4FersrRc7'; // Test key
    
    const renderRecaptcha = () => {
      if (!recaptchaContainerRef.current) {
        console.warn('reCAPTCHA container not found');
        return;
      }

      // Do not clear container to avoid re-render issues

      if (!window.grecaptcha) {
        console.warn('grecaptcha not available yet');
        return;
      }

      window.grecaptcha.ready(() => {
        if (!recaptchaContainerRef.current) {
          console.warn('Container ref is null when trying to render');
          return;
        }

        try {
          // If widget already exists, just reset it and return (don't re-render)
          if (recaptchaWidgetId.current !== null) {
            try {
              window.grecaptcha.reset(recaptchaWidgetId.current);
              console.log('reCAPTCHA widget reset (already rendered)');
              return;
            } catch (e) {
              console.error('Error resetting reCAPTCHA:', e);
              // If reset fails, clear the widget ID and try to render fresh
              recaptchaWidgetId.current = null;
            }
          }

          // Only render if widget doesn't exist yet
          console.log('Rendering reCAPTCHA with siteKey:', siteKey);
          console.log('Container element:', recaptchaContainerRef.current);
          
          const widgetId = window.grecaptcha.render(recaptchaContainerRef.current, {
            sitekey: siteKey,
            callback: (token: string) => {
              console.log('reCAPTCHA completed, token received');
              setRecaptchaToken(token);
            },
            'error-callback': () => {
              console.error('reCAPTCHA error callback');
              setRecaptchaToken(null);
              toast.error('reCAPTCHA verification failed. Please try again.');
            },
            size: 'normal',
            theme: 'light',
          });
          recaptchaWidgetId.current = widgetId;
          console.log('reCAPTCHA rendered successfully with widgetId:', widgetId);
        } catch (error) {
          console.error('Error rendering reCAPTCHA:', error);
          toast.error('Failed to load reCAPTCHA. Please refresh the page.');
        }
      });
    };

    // Wait for grecaptcha to be available with retry limit
    retryCountRef.current = 0;
    const maxRetries = 20; // Max 2 seconds of retries
    
    const checkAndRender = () => {
      if (window.grecaptcha && window.grecaptcha.ready) {
        retryCountRef.current = 0; // Reset on success
        renderRecaptcha();
      } else if (retryCountRef.current < maxRetries) {
        retryCountRef.current++;
        setTimeout(checkAndRender, 100);
      } else {
        console.error('reCAPTCHA failed to load after multiple retries');
        toast.error('reCAPTCHA failed to load. Please refresh the page.');
      }
    };

    // Start checking after a short delay to ensure DOM is ready
    const timeoutId = setTimeout(checkAndRender, 300);
    return () => {
      clearTimeout(timeoutId);
      retryCountRef.current = 0;
    };
  }, [open, currentStep, form]);

  const handleNextStep = async () => {
    // Validate step 1 (parent name)
    const result = await form.trigger("parentName");
    if (result) {
      setCurrentStep(2);
    }
  };

  const handleBackStep = () => {
    setCurrentStep(1);
  };

  const onSubmit = async (data: EnrollmentFormData) => {
    // Check if reCAPTCHA is completed
    if (!recaptchaToken) {
      toast.error('Please complete the reCAPTCHA verification');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Get fresh reCAPTCHA token right before submission (tokens can expire)
      let freshToken = recaptchaToken;
      if (recaptchaWidgetId.current !== null && window.grecaptcha) {
        try {
          const currentToken = window.grecaptcha.getResponse(recaptchaWidgetId.current);
          if (currentToken) {
            freshToken = currentToken;
            console.log('Using fresh reCAPTCHA token for submission');
          } else {
            // Token expired, reset and ask user to complete again
            setIsSubmitting(false);
            window.grecaptcha.reset(recaptchaWidgetId.current);
            setRecaptchaToken(null);
            toast.error('reCAPTCHA token expired. Please complete the verification again.');
            return;
          }
        } catch (error) {
          console.error('Error getting reCAPTCHA response:', error);
          // Continue with stored token
        }
      }

      // Close modal and show loader
      onOpenChange(false);
      setShowLoader(true);

      // Get tracking parameters from current URL
      const currentUrl = new URLSearchParams(window.location.search);
      const source = currentUrl.get('source') || '';
      const referrerId = currentUrl.get('referrerId') || '';

      // Build redirect URL with all query parameters
      const query = new URLSearchParams({
        name: data.parentName,
        email: data.email,
        source: source,
        referrerId: referrerId,
        landing_variant: 'GeologyLanding',
        redirectTo: 'https://www.coralacademy.com/class/geologybyamalia-047f95a1-a506-421b-8f13-a986ac1eb225',
        recaptchaToken: freshToken,
        landing_secret: 'ca_landing_2025_3xD9pQ1Z'
      }).toString();

      // Track GA4 conversion event
      if (window.gtag) {
        window.gtag('event', 'conversion', {
          event_category: 'form_submission',
          event_label: 'enrollment_form_submit',
          value: 1
        });
      }

      // Show success message
      toast.success('Registration successful! Redirecting...');

      // Redirect to thank-you page after short delay
      setTimeout(() => {
        window.location.href = `https://coralacademy.com/thank-you-landing?${query}`;
      }, 1500);
    } catch (error: any) {
      console.error("Submission error:", error);
      setIsSubmitting(false);
      setShowLoader(false);
      
      // Reset reCAPTCHA on error so user can retry
      setTimeout(() => {
        if (recaptchaWidgetId.current !== null && window.grecaptcha) {
          try {
            window.grecaptcha.reset(recaptchaWidgetId.current);
            console.log('reCAPTCHA reset successfully');
          } catch (resetError) {
            console.error('Error resetting reCAPTCHA:', resetError);
            recaptchaWidgetId.current = null;
          }
        }
      }, 100);
      
      setRecaptchaToken(null);
      toast.error('Submission failed. Please try again.');
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-[85vw] max-w-[340px] sm:max-w-md border-2 border-primary/20 shadow-coral-lg rounded-2xl sm:rounded-3xl max-h-[90vh] overflow-y-auto p-0"
        onInteractOutside={(event) => {
        const target = event.target as HTMLElement;
        // Prevent closing when user interacts with reCAPTCHA
        if (target.closest('.grecaptcha-badge') || target.tagName === 'IFRAME') {
          event.preventDefault();
        }
      }}
      // optional: disable escape close while captcha is open
      onEscapeKeyDown={(event) => {
        // Optionally disable closing on Escape if you want
        // event.preventDefault();
      }}
    >
          <div className="p-4 sm:p-8">
            <DialogHeader className="mb-3 sm:mb-6">
              <DialogTitle className="text-xl sm:text-2xl font-bold text-center">
                TRY FOR <span className="text-primary">FREE</span>
              </DialogTitle>
              <DialogDescription className="text-center text-xs sm:text-sm">
                {currentStep === 1 
                  ? "Start your child's geology journey today. Hurry, spots are filling up fast!"
                  : "Almost there! Just one more step to secure your spot."
                }
              </DialogDescription>
              <div className="mt-4 space-y-2">
                <p className="text-center text-sm font-medium text-muted-foreground">
                  Step {currentStep} of 2
                </p>
                <div className="flex justify-center gap-2">
                  <div className={`h-2 w-8 rounded-full transition-all ${currentStep === 1 ? 'bg-primary' : 'bg-primary/30'}`} />
                  <div className={`h-2 w-8 rounded-full transition-all ${currentStep === 2 ? 'bg-primary' : 'bg-primary/30'}`} />
                </div>
              </div>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
                {/* Step 1: Parent Name */}
                {currentStep === 1 && (
                  <div className="animate-fade-in">
                    <FormField
                      control={form.control}
                      name="parentName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">Parent Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter your full name" 
                              {...field} 
                              className="rounded-xl h-10 sm:h-11 text-sm"
                              autoFocus
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="button"
                      onClick={handleNextStep}
                      className="w-full py-5 sm:py-6 text-base sm:text-lg font-semibold bg-primary hover:bg-primary/90 shadow-coral transition-all duration-300 rounded-xl mt-3 sm:mt-4"
                    >
                      Next
                    </Button>
                  </div>
                )}

                {/* Step 2: Email & reCAPTCHA */}
                {currentStep === 2 && (
                  <div className="animate-fade-in">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">Email Address</FormLabel>
                          <FormControl>
                            <Input 
                              type="email"
                              placeholder="your.email@example.com" 
                              {...field}
                              className="rounded-xl h-10 sm:h-11 text-sm"
                              autoFocus
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    {/* reCAPTCHA Container */}
                    <div className="flex justify-center my-2 min-h-[78px]">
                      <div 
                        ref={recaptchaContainerRef}
                        id="recaptcha-container"
                        className="flex justify-center"
                      />
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        type="button"
                        onClick={handleBackStep}
                        variant="outline"
                        className="py-5 sm:py-6 text-base sm:text-lg font-semibold rounded-xl"
                      >
                        Back
                      </Button>
                      <Button 
                        type="submit" 
                        className="flex-1 py-5 sm:py-6 text-base sm:text-lg font-semibold bg-primary hover:bg-primary/90 shadow-coral transition-all duration-300 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isSubmitting || !recaptchaToken}
                      >
                        {isSubmitting ? "Enrolling..." : "Book your spot now"}
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>

      {/* Full-screen loader */}
      {showLoader && (
        <div className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center gap-8 animate-fade-in">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Thank you for your interest!
            </h2>
          </div>
          
          {/* Orange loader spinner */}
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
          
          <p className="text-lg text-muted-foreground animate-pulse">
            Redirecting you to the class page...
          </p>
        </div>
      )}
    </>
  );
};

export default EnrollmentModal;
