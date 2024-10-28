import { Button } from "../ui/button";
import BoxReveal from "../magicui/box-reveal";

export default async function BoxRevealDemo() {
  return (
    <div className="flex flex-col size-full max-w-lg items-start justify-center overflow-hidden pt-8">
      <BoxReveal boxColor={"#096c6c"} duration={0.75}>
        <p className="text-[3.5rem] font-semibold">
          TagZy<span className="text-[#096c6c]">.</span>
        </p>
      </BoxReveal>

      <BoxReveal boxColor={"#096c6c"} duration={0.75}>
        <h2 className="mt-[.5rem] text-[2rem]">
          Marketplace for{" "}
          <span className="text-[#096c6c]">Local Services</span>
        </h2>
      </BoxReveal>

      <BoxReveal boxColor={"#096c6c"} duration={0.75}>
        <div className="mt-6">
          <p>
            -&gt; 20+ free and open-source animated components built with
            <span className="font-semibold text-[#096c6c]"> React</span>,
            <span className="font-semibold text-[#096c6c]"> Typescript</span>,
            <span className="font-semibold text-[#096c6c]"> Tailwind CSS</span>,
            and
            <span className="font-semibold text-[#096c6c]"> Framer Motion</span>
            . <br />
            -&gt; 100% open-source, and customizable. <br />
          </p>
        </div>
      </BoxReveal>

      <BoxReveal boxColor={"#096c6c"} duration={0.75}>
        <Button className="mt-[1.6rem] bg-[#096c6c]">Explore</Button>
      </BoxReveal>
    </div>
  );
}
