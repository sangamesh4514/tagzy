import AnimatedGridPattern from "src/magicUi/ui/animated-grid-pattern";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ScrollSections from "../Section";
import { cn } from "src/lib/utils";
import BannerCarousel from "../Banner/BannerCarousel";
import CategorySection from "../Category/CategorySection";
import FeatureShowcase from "../FeatureShow/FeatureShowcase";
import StickyIcons from "src/common/components/StickyIcons";

const Provider = () => {
  return (
    <>
      <Header />
      <div className="relative">
      <BannerCarousel />
      <ScrollSections />
      <FeatureShowcase />
      <CategorySection />
      <StickyIcons />
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

      <Footer />
    </>
  );
};

export default Provider;
