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
    title: "Lorem ipsum dolor sit.",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro illum consequuntur minima harum voluptates temporibus quas, omnis quasi excepturi, soluta officia accusamus.",
    imageUrl: "/assets/half.png",
  },
  {
    id: 2,
    title: "Lorem ipsum dolor sit.",
    description:
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro illum consequuntur minima harum voluptates temporibus quas, omnis quasi excepturi, soluta officia accusamus.",
    imageUrl: "/assets/home.jpeg",
  },
  {
    id: 3,
    title: "Lorem ipsum dolor sit.",
    description:
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro illum consequuntur minima harum voluptates temporibus quas, omnis quasi excepturi, soluta officia accusamus.",
    imageUrl: "/assets/home.jpeg",
  },
  {
    id: 4,
    title: "Lorem ipsum dolor sit.",
    description:
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro illum consequuntur minima harum voluptates temporibus quas, omnis quasi excepturi, soluta officia accusamus.",
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
          style={{ flexDirection: "column" }}
        >
          <div className="feature-image" >
            <div className="feature-content">
              <h2 className="features_title">{features[0].title}</h2>
              <p className="features_description">{features[0].description}</p>
            </div>
            <img style={{height: '24rem'}} src={features[0].imageUrl} alt={features[0].title} />
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
