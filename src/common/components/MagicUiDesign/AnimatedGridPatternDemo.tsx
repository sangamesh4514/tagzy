import Iphone15Pro from "src/magicUi/ui/iphone-15-pro";
import { cn } from "src/lib/utils";
import AnimatedGridPattern from "src/magicUi/ui/animated-grid-pattern";
import BoxRevealWrapper from "../AsyncComponent";
import { MarqueeDemo } from "./MarqueeDemo";
import FeatureShowcase from "./FeatureShowcase";
import "./style.css";
import FAQ from "../FAQ";
import { useNavigate } from "react-router-dom";

export function AnimatedGridPatternDemo() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/provider");
  };
  return (
    <div className="relative w-full overflow-hidden bg-background md:shadow-xl">
      <div className="flex px-16 py-8 custom-flex">
        <BoxRevealWrapper />
        <Iphone15Pro
          className="dummyIphone size-auto z-10"
          src="/assets/home.jpeg"
        />
      </div>
      <MarqueeDemo />
      <FeatureShowcase />
      <div
        style={{
          borderRadius: "50px",
          fontFamily: "serif",
          margin: "2rem 0px",
          cursor: "pointer",
          color: "white",
          backgroundColor: "#096c6c",
          fontSize: "50px",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          display: "flex",
          height: "200px",
          letterSpacing: "2px",
          position: "relative",
          zIndex: "1",
        }}
        onClick={handleClick}
      >
        Ready to start your journey as a provider ?
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
