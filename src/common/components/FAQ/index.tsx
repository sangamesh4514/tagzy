import React, { useState } from 'react';
import { CirclePlus, CircleMinus } from 'lucide-react';

const faqs = [
  {
    question: 'What types of services do you offer?',
    answer: 'We provide a wide range of services including Parlour & Spa, Health & Wellness, Tutors & Coaches, Design & Construction, and Vehicle & Transportation.',
  },
  {
    question: 'Are your service providers verified?',
    answer:
      'Yes, all our service providers undergo a thorough background check and verification process to ensure safety and quality.',
  },
  {
    question: 'How much do the services cost?',
    answer:
      'Pricing depends on the type of service and the specific provider. Detailed pricing will be displayed before you confirm your booking.',
  },
  {
    question: 'Are there any hidden charges?',
    answer:
      'No, all charges are transparently displayed during the booking process. Taxes or additional fees will be clearly mentioned if applicable.',
  },
  {
    question: 'What safety measures do your service providers follow?',
    answer:
      'All our providers adhere to strict hygiene and safety protocols, including the use of masks, gloves, and sanitization tools where necessary.',
  },
  {
    question: 'Are your health and wellness providers certified?',
    answer:
      'Yes, all our therapists, doctors, and wellness professionals hold relevant certifications and licenses.',
  },
  {
    question: 'Can I customize a service?',
    answer:
      'Absolutely! Many of our services can be tailored to your specific needs. Discuss your requirements with the provider during booking.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="flex flex-col items-center justify-center px-4 mb-10"
    >
      <div className="w-[75vw] max-w-4xl">
        <div id="faq-title" className="flex flex-col">
          {/* Small screen */}
          <div className="text-3xl font-display sm:hidden text-center font-bold text-colorA">
            FAQ's
          </div>
          {/* Large screen */}
          <div className="hidden sm:block font-display text-3xl font-bold text-center text-colorA">
            Frequently Asked Questions
          </div>
        </div>
        <div className="mt-8 grid divide-y divide-gray-300">
          {faqs.map((faq, index) => (
            <div key={index} className="py-5">
              <div className="group">
                <div
                  className={`flex items-center justify-between cursor-pointer list-none`}
                  onClick={() => toggleQuestion(index)}
                >
                  <span
                    className={`text-sm transition-all font-semibold text-gray-800`}
                  >
                    {faq.question}
                  </span>
                  <span
                    className={`transition-transform duration-1000 ease-in-out ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  >
                    {openIndex === index ? <CircleMinus /> : <CirclePlus />}
                  </span>
                </div>
                {openIndex === index && (
                  <div className="">
                    <p className="animate-fadeIn text-neutral-600 p-0 mt-1 mb-0">{faq.answer}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
