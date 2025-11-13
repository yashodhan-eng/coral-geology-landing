import { Lightbulb, MessageSquare, TrendingUp, ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const learningPoints = [
  {
    icon: Lightbulb,
    description: "Explore geology, volcanology, paleontology, and more in exciting weekly themes that build a foundation in earth history and core science concepts.",
  },
  {
    icon: MessageSquare,
    description: "Share rock collections, discuss discoveries, and engage in guided conversations about Earth's fascinating geological features and prehistoric life.",
  },
  {
    icon: TrendingUp,
    description: "Participate in at-home science experiments and creative art projects that extend learning beyond the classroom, making geology come alive.",
  },
];

const schedule = [
  {
    week: "Week 1",
    company: "Plate Tectonics & Seismology",
    topics: "How Earth's plates move and cause earthquakes",
  },
  {
    week: "Week 2",
    company: "The Shapes of Landforms",
    topics: "Mountains, valleys, plains & Earth's geography",
  },
  {
    week: "Week 3",
    company: "Speleology (Cave Science)",
    topics: "Formation of caves and underground systems",
  },
  {
    week: "Week 4",
    company: "Ask a Geologist",
    topics: "Q&A session exploring your geology questions",
  },
];

const LearningOutcomes = () => {
  return (
    <section className="py-8 sm:py-10 md:py-12 lg:py-16 px-4 bg-gradient-to-b from-background to-coral-secondary/10">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-5 sm:mb-6 md:mb-8 fade-in-up">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
            What Kids Learn
          </h2>
        </div>
        
        <div className="space-y-3 sm:space-y-4 fade-in">
          {/* Learning Points */}
          {learningPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <div 
                key={index}
                className="flex gap-2.5 sm:gap-3 md:gap-4 items-start bg-card p-3 sm:p-4 md:p-5 rounded-lg border border-border"
              >
                <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-primary/10 rounded-lg flex items-center justify-center mt-0.5">
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-primary" />
                </div>
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
                  {point.description}
                </p>
              </div>
            );
          })}

          {/* Schedule Section */}
          <Card className="p-3 sm:p-4 md:p-5 border-primary/20 overflow-hidden">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="schedule" className="border-none">
                <AccordionTrigger className="hover:no-underline py-0">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-base sm:text-lg md:text-xl">📅</span>
                    </div>
                    <h3 className="text-sm sm:text-base md:text-lg font-semibold text-foreground text-left leading-tight">
                      Upcoming Geology Topics Schedule
                    </h3>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-3 sm:pt-4">
                  <div className="space-y-2.5 sm:space-y-3">
                    {schedule.map((item, index) => (
                      <div 
                        key={index}
                        className="flex gap-2 sm:gap-3 items-center"
                      >
                        <div className="flex-shrink-0 w-12 sm:w-14 md:w-16 text-xs sm:text-sm md:text-base font-semibold text-primary text-center">
                          {item.week}
                        </div>
                        <div className="flex-1 border-l-2 border-primary/20 pl-2 sm:pl-3 py-1.5 sm:py-2">
                          <p className="font-semibold text-xs sm:text-sm md:text-base text-foreground">
                            {item.company}
                          </p>
                          <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground leading-tight">
                            {item.topics}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LearningOutcomes;
