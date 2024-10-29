import { Button } from "../ui/button";
import BoxReveal from "../magicui/box-reveal";
import IntroducingBadge from "./IntroducingBadge";

export default async function BoxRevealDemo() {
  return (
    <div className="flex flex-col size-full max-w-lg items-start justify-center overflow-hidden pt-8">
      <IntroducingBadge />
      <BoxReveal boxColor={"#096c6c"} duration={0.75}>
        <p className="text-[3.5rem] font-semibold">
          TagZy
          {/* <span className="text-[#096c6c]">.</span> */}
        </p>
      </BoxReveal>

      <BoxReveal boxColor={"#096c6c"} duration={0.75}>
        <h2 className="mt-[.5rem] text-[2rem]">
          Marketplace for{" "}
          <span className="text-[#096c6c]">Local Services</span>
          {/* <span className="text-teal-600">Local Services</span> */}
        </h2>
      </BoxReveal>

      <BoxReveal boxColor={"#096c6c"} duration={0.75}>
        <div className="mt-6">
          <p>
            -&gt; 30+ services with multiple type of categories like
            <span className="font-semibold text-[#096c6c]"> Parlour & Spa</span>,
            <span className="font-semibold text-[#096c6c]"> Task Master</span>,
            <span className="font-semibold text-[#096c6c]"> Health & Wellness</span>,
            <span className="font-semibold text-[#096c6c]"> Food & Drink</span>,
            and
            <span className="font-semibold text-[#096c6c]"> Soo On...</span>
            . <br />
            -&gt; Eazy to book, Eazy to use <br />
          </p>
        </div>
      </BoxReveal>

      <BoxReveal boxColor={"#096c6c"} duration={0.75}>
        {/* <Button className="mt-[1.6rem] bg-[#096c6c]">Explore</Button> */}
        <Button className="bg-teal-600 text-white hover:bg-teal-600 text-white rounded-full">Explore</Button>
      </BoxReveal>
    </div>
  );
}
