import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LearningOutcomes from "@/components/LearningOutcomes";
import VideoSection from "@/components/VideoSection";
import CTABanner from "@/components/CTABanner";
import EnrollmentModal from "@/components/EnrollmentModal";
import { trackPageView } from "@/lib/mixpanel";

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Track page view on mount
  useEffect(() => {
    trackPageView("Home Page", {
      page_path: window.location.pathname,
      page_title: document.title,
    });
  }, []);

  const handleEnrollClick = () => {
    setIsModalOpen(true);
  };

  return (
    <main className="min-h-screen">
      <Header />
      <Hero onEnrollClick={handleEnrollClick} />
      <LearningOutcomes />
      <VideoSection />
      <CTABanner onEnrollClick={handleEnrollClick} />
      <EnrollmentModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </main>
  );
};

export default Index;
