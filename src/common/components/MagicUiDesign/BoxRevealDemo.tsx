import BoxReveal from "../magicui/box-reveal";
import IntroducingBadge from "./IntroducingBadge";
import "./BoxRevealDemo.css";

export default async function BoxRevealDemo() {
  
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
            -&gt; Verified services with multiple type of categories like
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

      {/* <BoxReveal boxColor={"#096c6c"} duration={0.75}>
        <Button className="explore-button" onClick={handleClick}>
          Explore
        </Button>
      </BoxReveal> */}

      <BoxReveal boxColor={"#096c6c"} duration={0.75}>
        <div
          className="appLink"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f9fafb",
            padding: "10px 20px", // Reducing padding to avoid excess inner space
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            gap: "15px", // Reducing gap slightly for tighter layout
            maxWidth: "350px",
            margin: "0 auto",
          }}
        >
          <a
            href="https://apps.apple.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.2s ease-in-out",
              borderRadius: "10px",
              overflow: "hidden",
              width: "140px",
              height: "40px", // Adjust height to avoid inner black padding
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src="/assets/appstore.png"
              alt="Download on the App Store"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "10px",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)",
              }}
            />
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.tagzy.hire_pro"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.2s ease-in-out",
              borderRadius: "10px",
              overflow: "hidden",
              width: "140px",
              height: "40px", // Adjust height to match the image size
              
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src="/assets/playStore.png"
              alt="Get it on Google Play"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "10px",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)",
              }}
            />
          </a>
        </div>
      </BoxReveal>
    </div>
  );
}
