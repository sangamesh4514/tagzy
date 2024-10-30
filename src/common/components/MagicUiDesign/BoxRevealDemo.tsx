import { Button } from "../ui/button";
import BoxReveal from "../magicui/box-reveal";
import IntroducingBadge from "./IntroducingBadge";
import "./BoxRevealDemo.css";

export default async function BoxRevealDemo() {
  const handleClick = () => {
    document.getElementById("marqueeContainer")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="box-reveal-container">
      <IntroducingBadge />
      <BoxReveal boxColor={"#096c6c"} duration={0.75}>
        <p className="main-heading">
          TagZy
        </p>
      </BoxReveal>

      <BoxReveal boxColor={"#096c6c"} duration={0.75}>
        <h2 className="sub-heading">
          Marketplace for{" "}
          <span className="highlight">Local Services</span>
        </h2>
      </BoxReveal>

      <BoxReveal boxColor={"#096c6c"} duration={0.75}>
        <div className="info-text">
          <p>
            -&gt; 30+ services with multiple type of categories like
            <span className="highlight"> Parlour & Spa</span>,
            <span className="highlight"> Task Master</span>,
            <span className="highlight"> Health & Wellness</span>,
            <span className="highlight"> Food & Drink</span>,
            and
            <span className="highlight"> Soo On...</span>
            . <br />
            -&gt; Eazy to book, Eazy to use <br />
          </p>
        </div>
      </BoxReveal>

      <BoxReveal boxColor={"#096c6c"} duration={0.75}>
        <Button className="explore-button" onClick={handleClick}>Explore</Button>
      </BoxReveal>
    </div>
  );
}
