import Iphone15Pro from "src/magicUi/ui/iphone-15-pro";
import { cn } from "src/lib/utils";
import AnimatedGridPattern from "src/magicUi/ui/animated-grid-pattern";
import BoxRevealWrapper from "../Test";
import { MarqueeDemo } from "./MarqueeDemo";
import FeatureShowcase from "./FeatureShowcase";

export function AnimatedGridPatternDemo() {
  return (
    <div className="relative w-full items-center justify-center overflow-hidden bg-background md:shadow-xl"> {/* h-lvh */}
      {/* <p className="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-black dark:text-white">
        Animated Grid Pattern
      </p> */}
      <div className="flex px-16 py-8">
      <BoxRevealWrapper />
      <Iphone15Pro
        className="size-auto z-10"
        src="/assets/home.jpeg"
      />
      </div>
      <MarqueeDemo />
      <FeatureShowcase />
      
      <AnimatedGridPattern
        numSquares={25} // Number of squares in the pattern 
        maxOpacity={0.2} // Maximum opacity of the pattern
        duration={3}
        repeatDelay={0.5}
        className={cn(
            "[mask-image:linear-gradient(to_bottom_left,white,transparent,white)] ",
          )}
          width={80}
          height={80}
          strokeDasharray={1}
      />
    </div>
  );
}
