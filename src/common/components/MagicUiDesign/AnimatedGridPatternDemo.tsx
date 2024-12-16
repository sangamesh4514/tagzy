import Iphone15Pro from "src/magicUi/ui/iphone-15-pro";
import { cn } from "src/lib/utils";
import AnimatedGridPattern from "src/magicUi/ui/animated-grid-pattern";
import BoxRevealWrapper from "../AsyncComponent";
import { MarqueeDemo } from "./MarqueeDemo";
import FeatureShowcase from "./FeatureShowcase";
import "./style.css";
import FAQ from "../FAQ";
import { useNavigate } from "react-router-dom";
import BannerCarousel from "../../../common/routes/Banner/BannerCarousel";

export function AnimatedGridPatternDemo() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/provider");
    window.scrollTo(0, 0);
  };
  return (
    <div className="relative w-full overflow-hidden bg-background md:shadow-xl">
      <div className="flex px-16 py-8 custom-flex">
        <BoxRevealWrapper />
        <Iphone15Pro
          className="dummyIphone size-auto z-10"
          src="/assets/homepageApp.jpeg"
        />
      </div>
      <MarqueeDemo />
      <FeatureShowcase />
      <div className="provider_banner"  onClick={handleClick}>
        Ready to start your journey as a provider ?
        <div className="provider_banner_inner">
         <BannerCarousel />
         </div>

      </div>

      <FAQ />
      <AnimatedGridPattern
        numSquares={25} // Number of squares in the pattern
        maxOpacity={0.2} // Maximum opacity of the pattern
        duration={3}
        repeatDelay={0.5}
        className={cn(
          "[mask-image:linear-gradient(to_bottom_left,white,transparent,white)] "
        )}
        width={80}
        height={80}
        strokeDasharray={1}
      />
    </div>
  );
}
