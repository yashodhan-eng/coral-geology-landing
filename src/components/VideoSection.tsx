import { useState } from "react";
import { Play } from "lucide-react";
import heroVideo from "@/assets/hero-video.mp4";
import videoThumbnail from "@/assets/geology-thumbnail.webp";

const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-4 lg:max-w-7xl">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-5 md:mb-6">
              See What Our Classes Look Like
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Watch a glimpse of our interactive geology classes where kids explore, discover, and have fun!
            </p>
          </div>

          {/* Video Player */}
          <div className="relative aspect-video rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl bg-black">
            {!isPlaying ? (
              <>
                <img
                  src={videoThumbnail}
                  alt="Class preview"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={handlePlayClick}
                  className="absolute inset-0 flex items-center justify-center group"
                  aria-label="Play video"
                >
                  <div className="bg-primary/90 hover:bg-primary text-primary-foreground rounded-full p-6 sm:p-8 md:p-10 lg:p-12 transition-all group-hover:scale-110 shadow-2xl">
                    <Play className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 fill-current" />
                  </div>
                </button>
              </>
            ) : (
              <video
                src={heroVideo}
                controls
                autoPlay
                className="w-full h-full"
              >
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
