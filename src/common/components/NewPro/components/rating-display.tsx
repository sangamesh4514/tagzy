import { Star } from "lucide-react";
import "./rating.css";

interface RatingProps {
  rating: number;
  ratingCount?: number;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
}

export default function Rating({
  rating,
  ratingCount = 0,
  size = "md",
  showCount = true,
}: RatingProps) {
  const normalizedRating = Math.min(5, Math.max(0, rating)); // Clamp to [0, 5]
  const roundedRating =
    normalizedRating % 1 > 0.4
      ? Math.ceil(normalizedRating)
      : Math.floor(normalizedRating);

  const stars = Array(5).fill(0);

  return (
    <div className="rating-container">
      <div className={`stars-container size-${size}`}>
        {stars.map((_, index) => {
          const starValue = index + 1;

          return (
            <div key={index} className="star-wrapper">
              <Star className="star-background" />

              <div
                className="star-fill"
                style={{
                  width: roundedRating >= starValue ? "100%" : "0%",
                }}
              >
                {/* <Star /> */}
                <Star fill='#facc15'/>
              </div>
            </div>
          );
        })}
      </div>

      {showCount && ratingCount > 0 && (
        <span className="rating-count">({ratingCount})</span>
      )}
    </div>
  );
}
