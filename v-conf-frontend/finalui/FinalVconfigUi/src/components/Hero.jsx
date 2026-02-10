// import { useEffect, useState } from "react";

// const carImages = [
//   "https://imgd.aeplcdn.com/370x208/cw/ec/38219/Mahindra-XUV300-Exterior-147500.jpg?wm=0&q=80",
//   "https://www.reliancegeneral.co.in/siteassets/rgiclassets/images/blogs-images/top-5-fastest-cars-in-the-world2.webp",
//   "https://stimg.cardekho.com/images/carexteriorimages/630x420/Mahindra/XUV-3XO/10184/1751288551835/front-left-side-47.jpg",
//   "https://www.mad4wheels.com/img/free-car-images/mobile/22119/genesis-g90-wingback-concept-2025-thumb.jpg",
// ];

// export default function Hero() {
//   const [current, setCurrent] = useState(0);

//   // Auto slide every 2 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % carImages.length);
//     }, 2000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section className="relative h-[90vh] overflow-hidden bg-gray-900">
//       {/* Carousel Images */}
//       {carImages.map((img, index) => (
//         <div
//           key={index}
//           className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
//             index === current ? "opacity-100" : "opacity-0"
//           }`}
//           style={{ backgroundImage: `url(${img})` }}
//         />
//       ))}

//       {/* Dark Overlay */}
//       <div className="absolute inset-0 bg-black/55"></div>

//       {/* Content */}
//       <div className="relative z-10 flex h-full items-center justify-center px-4">
//         <div className="text-center max-w-4xl">
//           <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
//             Design Your Dream Vehicle
//           </h1>
//           <p className="text-xl sm:text-2xl text-gray-200 mb-10 leading-relaxed">
//             Build, customize, and price your perfect vehicle in minutes.
//           </p>

//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg">
//               Get Started Free
//             </button>
//             <button className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg border-2 border-gray-200 hover:border-gray-300 transition-colors">
//               Sign In
//             </button>
//           </div>

//           {/* Carousel Indicators */}
//           <div className="flex justify-center gap-2 mt-10">
//             {carImages.map((_, index) => (
//               <div
//                 key={index}
//                 className={`h-2 w-8 rounded-full transition-all ${
//                   index === current ? "bg-blue-500" : "bg-white/40"
//                 }`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const carImages = [
  "https://imgd.aeplcdn.com/370x208/cw/ec/38219/Mahindra-XUV300-Exterior-147500.jpg?wm=0&q=80",
  "https://www.reliancegeneral.co.in/siteassets/rgiclassets/images/blogs-images/top-5-fastest-cars-in-the-world2.webp",
  "https://stimg.cardekho.com/images/carexteriorimages/630x420/Mahindra/XUV-3XO/10184/1751288551835/front-left-side-47.jpg",
  "https://www.mad4wheels.com/img/free-car-images/mobile/22119/genesis-g90-wingback-concept-2025-thumb.jpg",
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carImages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[90vh] overflow-hidden bg-gray-900">
      {/* Carousel Images */}
      {carImages.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/55"></div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-4">
        <div className="text-center max-w-4xl">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Design Your Dream Vehicle
          </h1>

          <p className="text-xl sm:text-2xl text-gray-200 mb-10 leading-relaxed">
            Build, customize, and price your perfect vehicle in minutes.
          </p>

          {/* Buttons with Routing */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                const target = "/welcome";
                if (!localStorage.getItem("token")) {
                  navigate("/signin", { state: { redirectTo: target } });
                } else {
                  navigate(target);
                }
              }}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg"
            >
              Get Started Free
            </button>

            <button
              onClick={() => navigate("/signin")}
              className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg border-2 border-gray-200 hover:border-gray-300 transition-colors"
            >
              Sign In
            </button>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-10">
            {carImages.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-8 rounded-full transition-all ${
                  index === current ? "bg-blue-500" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
