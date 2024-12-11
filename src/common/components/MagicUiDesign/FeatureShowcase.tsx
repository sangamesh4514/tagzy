import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Calendar, Star, MapPin } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Easy Search",
    description: "Find the perfect service provider in seconds",
  },
  {
    icon: Calendar,
    title: "Quick Booking",
    description: "Schedule appointments with just a few taps",
  },
  {
    icon: Star,
    title: "Verified Providers",
    description: "All service providers are vetted and rated",
  },
  {
    icon: MapPin,
    title: "Local Services",
    description: "Discover quality services in your neighborhood",
  },
];

export default function FeatureShowcase() {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <div
      style={{ padding: "2rem 0rem 0.75rem" }}
      className="relative z-10 flex flex-col items-center space-y-8 rounded-lg"
    >
      <h2 className="feature_showcase_header text-3xl font-serif m-0">
        Why Choose TagZy ?
      </h2>
      <div className="feature_showcase_mutiple_box grid grid-cols-2 gap-4">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className={`p-4 rounded-lg cursor-pointer border-2 border-colorA ${
              activeFeature === index
                ? "bg-colorA text-white"
                : "bg-white text-colorA"
            }`}
            whileHover={{ scale: 1.05 }}
            onClick={() => setActiveFeature(index)}
          >
            <feature.icon className="w-8 h-8 mb-2" />
            <h4 className="font-semibold">{feature.title}</h4>
          </motion.div>
        ))}
      </div>
      <motion.div
        key={activeFeature}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center text-teal-800"
      >
        <p className="feature_showcase_description">
          {features[activeFeature].description}
        </p>
      </motion.div>
    </div>
  );
}
