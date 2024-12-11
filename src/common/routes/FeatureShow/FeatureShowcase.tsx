import React, { useEffect, useRef, useState } from "react";
import "./FeatureShowcase.css";
import Iphone15Pro from "src/magicUi/ui/iphone-15-pro";

interface Feature {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

const features: Feature[] = [
  {
    id: 1,
    title: "AI-Powered Scheduling",
    description:
      "Our app uses advanced AI to optimize your calendar, suggesting the best times for meetings and tasks based on your preferences and habits.",
    imageUrl: "/assets/home.jpeg",
  },
  {
    id: 2,
    title: "Smart Time Blocking",
    description:
      "Automatically block out time for focused work, breaks, and personal activities to maintain a balanced and productive schedule.",
    imageUrl: "/assets/home.jpeg",
  },
  {
    id: 3,
    title: "Intelligent Reminders",
    description:
      "Receive context-aware notifications that adapt to your schedule, ensuring you never miss important events or deadlines.",
    imageUrl: "/assets/home.jpeg",
  },
  {
    id: 4,
    title: "Team Collaboration",
    description:
      "Effortlessly coordinate schedules with team members and clients, finding optimal meeting times across different time zones.",
    imageUrl: "/assets/home.jpeg",
  },
];

const FeatureShowcase: React.FC = () => {
  const [visibleFeatures, setVisibleFeatures] = useState<number[]>([]);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = Number(entry.target.getAttribute("data-id"));
          if (entry.isIntersecting && !visibleFeatures.includes(id)) {
            setVisibleFeatures((prev) => [...prev, id]);
          } else if (!entry.isIntersecting && visibleFeatures.includes(id)) {
            setVisibleFeatures((prev) =>
              prev.filter((featureId) => featureId !== id)
            );
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    featureRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [visibleFeatures]);

  return (
    <div className="feature-showcase">
      <div className="feature-grid">
        {/* Main Feature */}
        <div
          ref={(el) => (featureRefs.current[0] = el)}
          data-id="1"
          className={`feature-main ${
            visibleFeatures.includes(1) ? "visible" : ""
          }`}
          style={{flexDirection: 'column'}}
        >
          <div className="feature-image">
            <Iphone15Pro
              className="phone-image w-full h-64 sm:h-96 rounded-xl object-cover object-top"
              src={features[0].imageUrl}
            />
          </div>
          <div className="feature-content">
            <h2 className="features_title">{features[0].title}</h2>
            <p className="features_description">{features[0].description}</p>
          </div>
        </div>

        {/* Secondary Features */}
        <div className="feature-secondary-grid">
          {features.slice(1).map((feature, index) => (
            <div
              key={feature.id}
              ref={(el) => (featureRefs.current[index + 1] = el)}
              data-id={feature.id}
              className={`feature-item ${
                visibleFeatures.includes(feature.id) ? "visible" : ""
              }`}
            >
              <div className="feature-content">
                <h3 className="features_title_h3">{feature.title}</h3>
                <p className="features_description">{feature.description}</p>
              </div>
              <div className="feature-image">
                <Iphone15Pro
                  className="phone-image size-auto"
                  src={feature.imageUrl}
                />
                {/* <img src={feature.imageUrl} alt={feature.title} /> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureShowcase;
