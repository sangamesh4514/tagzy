import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../styles/ImageCarousel.css';

interface ImageCarouselProps {
  images: string[];
}

export function ImageCarousel({ images }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  if (images.length === 0) {
    return null;
  }

  return (
    <div className="image-carousel">
      <button className="carousel-button left" onClick={goToPrevious} hidden={images.length === 1}>
        <ChevronLeft />
      </button>
      <img
        src={images[currentIndex]}
        alt={images[currentIndex]}
        className="carousel-image"
      />
      <button className="carousel-button right" onClick={goToNext} hidden={images.length === 1}>
        <ChevronRight />
      </button>
    </div>
  );
}

