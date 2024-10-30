import { Button } from "../ui/button";
import BoxReveal from "../magicui/box-reveal";
import IntroducingBadge from "./IntroducingBadge";
import "./BoxRevealDemo.css";
import { ArrowBigDownDash, Download, Smartphone } from "lucide-react";

export default async function BoxRevealDemo() {
  const handleClick = () => {
    document
      .getElementById("marqueeContainer")
      ?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="box-reveal-container">
      <IntroducingBadge />
      <BoxReveal boxColor={"#096c6c"} duration={0.75}>
        <p className="main-heading" style={{ fontFamily: "serif" }}>
          TagZy
        </p>
      </BoxReveal>

      <BoxReveal boxColor={"#096c6c"} duration={0.75}>
        <h2 className="sub-heading">
          Marketplace for <span className="highlight">Local Services</span>
        </h2>
      </BoxReveal>

      <BoxReveal boxColor={"#096c6c"} duration={0.75}>
        <div className="info-text">
          <p>
            -&gt; 30+ services with multiple type of categories like
            <span className="highlight"> Parlour & Spa</span>,
            <span className="highlight"> Task Master</span>,
            <span className="highlight"> Health & Wellness</span>,
            <span className="highlight"> Food & Drink</span>, and
            <span className="highlight"> Soo On...</span>
            . <br />
            -&gt; Eazy to book, Eazy to use <br />
          </p>
        </div>
      </BoxReveal>

      <BoxReveal boxColor={"#096c6c"} duration={0.75}>
        <Button className="explore-button" onClick={handleClick}>
          Explore
        </Button>
      </BoxReveal>
      <div className="appLink" style={{display: 'flex', alignItems: 'center'}}>
        <h3 className="text-lg font-semibold text-gray-900" style={{display: 'flex', gap: '10px', whiteSpace: 'nowrap'}}>Available On <Download /></h3>
        <div className="flex flex-col gap-5" >
          <a
            href="https://apps.apple.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/assets/appstore.jpeg"
              alt="Download on the App Store"
              className="h-10"
              width="140px"
              style={{height: 'auto'}}
            />
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.tagzy.hire_pro"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/assets/playStore.jpeg"
              alt="Get it on Google Play"
              className="h-10"
              width="140px"
              style={{height: 'auto'}}
            />
          </a>
        </div>
      </div>
    </div>
  );
}
