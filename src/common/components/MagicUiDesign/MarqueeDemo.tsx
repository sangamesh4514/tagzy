import { cn } from "../../../lib/utils";
import Marquee from "../../../magicUi/ui/marquee";


const reviews = [
  {
    name: "Health & Wellness",
    body: "Take care of your health with our wellness services.",
    img: "/assets/doctor.png",
  },
  {
    name: "Tutors & Coaches",
    body: "Learn and grow with our expert tutors and coaches.",
    img: "/assets/image 9.png",
  },
  {
    name: "Parlour & Spa",
    body: "Pamper yourself with our beauty and relaxation services.",
    img: "/assets/image 47.png",
  },
  {
    name: "Task Master",
    body: "Get help with your daily tasks and errands.",
    img: "/assets/image 40.png",
  },
  {
    name: "Food & Drink",
    body: "Enjoy delicious meals and beverages from local providers.",
    img: "/assets/image 61.png",
  },
  {
    name: "Home Services",
    body: "Keep your home in top shape with our maintenance services.",
    img: "/assets/image 35.png",
  },
  {
    name: "Pet Care",
    body: "Ensure your furry friends are well taken care of.",
    img: "/assets/image 46.png",
  },
  {
    name: "Art & Creativity",
    body: "Explore your creative side with our artistic services.",
    img: "/assets/image 31.png",
  },
  {
    name: "Home Improvement",
    body: "Upgrade and renovate your living space with professional services.",
    img: "/assets/image 38.png",
  },
  {
    name: "Vehicle & Transportation",
    body: "Get assistance with vehicle maintenance and transportation services.",
    img: "/assets/image 52.png",
  },
  {
    name: "Cleaning Services",
    body: "Offering professional cleaning for homes, offices, and specialized cleaning needs.",
    img: "/assets/image 42.png",
  },
  {
    name: "Event Planning",
    body: "Plan and organize memorable events with our expert services.",
    img: "/assets/image 58.png",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  body,
}: {
  img: string;
  name: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4 reviewCard",
        // light styles
        "border-gray-950/[.1] bg-white",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="" width="60" height="60" alt="proImage" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          {/* <p className="text-xs font-medium dark:text-white/40">{username}</p> */}
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function MarqueeDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden" id="marqueeContainer">
      <h2 className="text-3xl z-10 font-bold text-teal-800 mb-4 heading">Discover Our Service Categories</h2>
      <Marquee pauseOnHover className="z-10 pb-4 [--duration:40s] marqueeBox">
        {firstRow.map((review) => (
          <ReviewCard key={review.name} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className=" z-10 [--duration:40s] marqueeBox">
        {secondRow.map((review) => (
          <ReviewCard key={review.name} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}
