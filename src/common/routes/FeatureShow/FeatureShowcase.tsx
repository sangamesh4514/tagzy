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
    title: "Project Invitation",
    description:
    "The selected service provider receives an invitation to join the project. They can accept or decline based on their availability.",
    imageUrl: "/assets/businessAccount/projectStep2Invitation.jpeg",
  },
  {
    id: 2,
    title: "Step 1: Project Created",
    description:
    "When a customer books a service, a new project is created on Tagzy to streamline communication and task management.",
    imageUrl: "/assets/businessAccount/projectStep1.jpeg",
},
{
    id: 3,
    title: "Step 2: Invitation Accepted",
    description:
    "The selected service provider receives an invitation to join the project. Once accepted, they are officially assigned to the project and can begin coordinating with the customer.",
    imageUrl: "/assets/businessAccount/projectStep2.jpeg",
},
{
    id: 4,
    title: "Step 3: Work in Progress",
    description:
    "Once accepted, the project moves to the 'Work in Progress' stage, where the service provider begins delivering the requested service.",
    imageUrl: "/assets/businessAccount/projectStep3.jpeg",
},
{
    id: 5,
    title: "Step 4: Project Completed",
    description:
    "After the work is completed, the project is marked as finished, and the customer can rate their experience to help others make informed decisions.",
    imageUrl: "/assets/businessAccount/projectStep4.jpeg",
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
            <Iphone15Pro
                  className="phone-image size-auto"
                  src={features[0].imageUrl}
                />
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
