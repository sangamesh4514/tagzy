import React from "react";
import { Helmet } from "react-helmet";
import Header from "src/common/components/Header";
import Footer from "src/common/components/Footer";
import CareerPage from "src/common/components/CareerPage";

const Careers = () => {
  return (
    <>
      <Helmet>
        <title>Careers - TagZy</title>
        <meta
          name="description"
          content="Read TagZy's privacy policy to understand how we collect, use, and protect your personal information when you use our local services marketplace."
        />
        <meta
          name="keywords"
          content="privacy policy, TagZy, data protection, user privacy, local services marketplace"
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.tagzy.in/careers" />
        <meta property="og:title" content="Privacy Policy - TagZy" />
        <meta
          property="og:description"
          content="Learn about TagZy's commitment to protecting your privacy and personal information."
        />

        {/* Canonical URL */}
        <link rel="canonical" href="https://www.tagzy.in/careers" />

        {/* Additional Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="TagZy" />
      </Helmet>
      <Header />
      <CareerPage />;
      <Footer />
    </>
  );
};

export default Careers;
