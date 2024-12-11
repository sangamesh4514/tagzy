import React, { useEffect, useRef, useState } from 'react';
import './CategorySection.css';

interface Category {
  id: number;
  title: string;
  description: string;
  items: string[];
  moreDescription: string;
}

const categories: Category[] = [
  {
    id: 1,
    title: "Health and Wellness",
    description: "If your work involves improving physical, mental, or emotional well-being, this is your category. It includes a wide range of services such as:",
    items: [
         "Fitness trainers (personal trainers, yoga instructors, pilates coaches)",
         "Nutritionists and dieticians",
         "Mental health professionals (therapists, counselors, psychologists)",
         "Massage therapists, acupuncturists, and other holistic health practitioners",
         "Wellness coaches (guiding clients to a healthier lifestyle)",
         "Chiropractors, physical therapists, or rehabilitation specialists",
    ],
    moreDescription: 'If your services revolve around helping people achieve optimal health, mental clarity, or physical fitness, Health and Wellness is the category for you.'
  },
  {
    id: 2,
    title: "Tutor and Coaches",
    description: "This category is ideal for anyone providing educational or personal development services. If you offer services that help others improve skills or gain knowledge, this is your fit. This can include:",
    items: [
         "Tutors in various subjects (math, science, languages, test preparation)",
         "Life coaches, career coaches, or personal development coaches",
         "Language teachers",
         "Business coaches and entrepreneurship mentors",
         "Sports coaches (e.g., football, tennis, swimming)",
         "Music teachers (guitar, piano, singing lessons"
    ],
    moreDescription: 'If you are focused on teaching, guiding, or coaching individuals or groups to improve their knowledge, skills, or performance, choose Tutor and Coaches.'
  },{
    id: 3,
    title: "Parlour and Spa",
    description: "This category is tailored for anyone offering services related to beauty, grooming, relaxation, and personal care. If your work involves helping clients look and feel their best, this is your category. This can include:",
    items: [
         "Hair stylists and barbers",
         "Makeup artists",
         "Estheticians (facials, skincare treatments, body wraps)",
         "Massage therapists",
         "Nail technicians (manicures, pedicures, nail art)",
         "Waxing and threading professionals",
         "Spa service providers (aromatherapy, hot stone treatments"
    ],
    moreDescription: 'If your business involves beauty treatments, relaxation, or personal care, then Parlour and Spa is where you should list your services.'

  },{
    id: 4,
    title: "Task Master",
    description: "This category is perfect for businesses or individuals providing hands-on support with day-to-day tasks. If you help clients with practical services that assist in managing their daily responsibilities or maintain their homes, choose this category. This includes:",
    items: [
         "House cleaners and maid services",
         "Personal assistants and errand runners",
         "Handymen or general contractors (for small home repairs or maintenance)",
         "Organizing experts (home organization, decluttering)",
         "Pet sitters and dog walkers",
         "Delivery services (grocery, package, moving)"
    ],
    moreDescription: 'If your services focus on assisting clients with their everyday tasks, household maintenance, or helping them save time by completing specific chores, Task Master is the category for you.'

  },{
    id: 5,
    title: "Design and Construction",
    description: "This category is best for professionals who are involved in the design, planning, or building of physical structures. It’s for people who work in architecture, construction, and interior design. This includes:",
    items: [
         "Architects",
         "Interior designers",
         "General contractors or construction companies",
         "Electricians, plumbers, and other tradespeople",
         "Landscape designers or garden designers",
         "Renovation specialists and remodeling contractors",
         "3D renderers or visualization artists"
    ],
    moreDescription: 'If your work involves creating, designing, or building physical spaces, from homes to offices to public structures, Design and Construction is the category you should choose.'

  },{
    id: 6,
    title: "Vehicle and Transportations",
    description: "This category applies to services related to vehicles, transportation, or moving people and goods. If your business involves any aspect of vehicle maintenance, repair, or transportation, this is where your services belong. This includes:",
    items: [
         "Auto repair shops or mechanics",
         "Car detailing or vehicle cleaning",
         "Car rental services",
         "Chauffeurs and private drivers",
         "Taxi or ride-share drivers",
         "Moving services (for relocating or transporting goods)",
         "Vehicle sales or auto dealerships"
    ],
    moreDescription: 'If your work is related to transportation, vehicle maintenance, or providing services around cars, trucks, or other forms of transport, Vehicle and Transportation is the right category.'

  }
];

const CategorySection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} id='category' className={`category-section ${isVisible ? 'visible' : ''}`}>
      <h2 className="section-title">Choose Your Category that best fits your business</h2>
      
      <div className="categories-grid">
        {categories.map((category) => (
          <div key={category.id} className="category-card">
            <h3 style={{textDecoration: 'underline'}}>{category.title}</h3>
            <p>{category.description}</p>
            <ul>
              {category.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;

