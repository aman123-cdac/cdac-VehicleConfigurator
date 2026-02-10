import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const carImages = [
  "https://imgd.aeplcdn.com/370x208/cw/ec/38219/Mahindra-XUV300-Exterior-147500.jpg?wm=0&q=80",
  "https://www.reliancegeneral.co.in/siteassets/rgiclassets/images/blogs-images/top-5-fastest-cars-in-the-world2.webp",
  "https://stimg.cardekho.com/images/carexteriorimages/630x420/Mahindra/XUV-3XO/10184/1751288551835/front-left-side-47.jpg",
  "https://www.mad4wheels.com/img/free-car-images/mobile/22119/genesis-g90-wingback-concept-2025-thumb.jpg",
];

export default function EnhancedHero() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const navigate = useNavigate();

  // Auto slide with pause functionality
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const goToSlide = (index) => {
    setCurrent(index);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % carImages.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + carImages.length) % carImages.length);
  };

  return (
    <section className="relative h-[90vh] overflow-hidden bg-gray-900">
      {/* Carousel Images with AnimatePresence */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${carImages[current]})` }}
        />
      </AnimatePresence>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-4">
        <div className="text-center max-w-5xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Design Your Dream Vehicle
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl sm:text-2xl text-gray-200 mb-10 leading-relaxed max-w-3xl mx-auto"
          >
            Build, customize, and price your perfect vehicle in minutes with our
            advanced configuration platform.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              onClick={() => {
                const target = "/welcome";
                if (!localStorage.getItem("token")) {
                  navigate("/signin", { state: { redirectTo: target } });
                } else {
                  navigate(target);
                }
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              Get Started Free
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/signin")}
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 px-8 py-6 text-lg"
            >
              Sign In
            </Button>
          </motion.div>

          {/* Carousel Controls */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex items-center justify-center gap-6 mt-12"
          >
            {/* Previous Button */}
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>

            {/* Indicators */}
            <div className="flex gap-2">
              {carImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === current
                      ? "bg-blue-500 w-8"
                      : "bg-white/40 w-2 hover:bg-white/60"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>

            {/* Play/Pause Button */}
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all"
              aria-label={isPaused ? "Play" : "Pause"}
            >
              {isPaused ? (
                <Play className="w-5 h-5 text-white" />
              ) : (
                <Pause className="w-5 h-5 text-white" />
              )}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Progress Bar */}
      {!isPaused && (
        <motion.div
          key={current}
          className="absolute bottom-0 left-0 h-1 bg-blue-500"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 4, ease: "linear" }}
        />
      )}
    </section>
  );
}
