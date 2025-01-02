import React from "react";
import "./style.css"; // Add custom CSS for styling
import { Helmet } from "react-helmet";
import Header from "src/common/components/Header";
import Footer from "src/common/components/Footer";

const TermsAndConditions = () => {
  return (
    <>
      <Helmet>
        <title>Terms Of Use - TagZy</title>
        <meta
          name="description"
          content="Read TagZy's privacy terms of use to understand how we collect, use, and protect your personal information when you use our local services marketplace."
        />
        <meta
          name="keywords"
          content="Terms of use, TagZy, data protection, user privacy, local services marketplace"
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.tagzy.in/privacyPolicy" />
        <meta property="og:title" content="Terms of use - TagZy" />
        <meta
          property="og:description"
          content="Learn about TagZy's commitment to protecting your privacy and personal information."
        />

        {/* Canonical URL */}
        <link rel="canonical" href="https://www.tagzy.in/privacyPolicy" />

        {/* Additional Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="TagZy" />
      </Helmet>
      <Header />
      <div className="privacy-container">
        <div className="privacy-content">
          <div className="logo-container">
            <img src="/logo.png" alt="TagZy Logo" className="logo" />
          </div>
          <h1>
            {" "}
            <span style={{ fontFamily: "serif" }}>TagZy Terms of use</span>
          </h1>
          <p>
            <span style={{ fontFamily: "serif" }}>Introduction : </span> Kindly
            go through the 'Terms of Use' below. The mentioned points will give
            you a basic idea of terms and conditions existing in the company.{" "}
            <span style={{ fontFamily: "serif" }}>TagZy</span> offers its
            services (collectively referred to as "Media").
          </p>
          <h3>
            {" "}
            <span style={{ fontFamily: "serif" }}>
              I. YOUR ACCEPTANCE OF THIS AGREEMENT
            </span>
          </h3>
          <p>
            This is an agreement between you ("you" or "your") and TagZy
            ("TagZy," "we," or "our") that governs your use of the search
            services offered by Tagzy through its website www.tagzy.in
            ("Website") and app For Android User - https://bit.ly/4gwNZgg For
            IOS User - https://bit.ly/4fcnhID, using which TagZy may provide the
            search services ("Platform"). When you access or use the Platform,
            you agree to be bound by these Terms and Conditions ("Terms").
          </p>

          <h3>
            {" "}
            <span style={{ fontFamily: "serif" }}>II. CHANGES</span>
          </h3>
          <p>
            We may periodically change the Terms and the Site without notice,
            and you are responsible for checking these Terms periodically for
            revisions. All amended Terms become effective upon our posting to
            the Site, and any use of the site after such revisions have been
            posted signifies your consent to the changes.
          </p>

          <h3>
            {" "}
            <span style={{ fontFamily: "serif" }}>III. HOW YOU MAY USE OUR MATERIALS
            </span>
          </h3>
          <p>
          We use a diverse range of information, text, photographs, designs, graphics, images, sound and video recordings, animation, content, advertisement and other materials and effects (collectively "Materials") for the search services on the Platform. We provide the Materials through the Platform FOR YOUR PERSONAL AND NON-COMMERCIAL USE ONLY.
While every attempt has been made to ascertain the authenticity of the Platform content, TagZy is not liable for any kind of damages, losses or action arising directly or indirectly, due to access and/or use of the content in the Platform including but not limited to decisions based on the content in the Platform which results in any loss of revenue, profits, property etc.
Accordingly, you may view, use, copy, and distribute the Materials found on the Platform for internal, non-commercial, informational purposes only. You are prohibited from data mining, scraping, crawling, or using any process or processes that send automated queries to TagZy. You may not use the Platform or any of them to compile a collection of listings, including a competing listing product or service. You may not use the Platforms or any Materials for any unsolicited commercial e-mail. Except as authorized in this paragraph, you are not being granted a license under any copyright, trademark, patent or other intellectual property right in the Materials or the products, services, processes or technology described therein. All such rights are retained by TagZy, its subsidiaries, parent companies, and/or any third party owner of such rights.

          </p>

          <h3>
            {" "}
            <span style={{ fontFamily: "serif" }}>IV. HOW YOU MAY USE OUR MARKS 
            </span>
          </h3>
          <p>
          The Tagzy company names and logos and all related products and service names, design marks, and slogans are trademarks and service marks owned by and used under license from Tagzy or its wholly-owned subsidiaries. All other trademarks and service marks herein are the property of their respective owners. All copies that you make of the Materials on the Platform must bear any copyright, trademark, or other proprietary notice located on the respective Platform that pertains to the material being copied.
You are not authorized to use any Tagzy name or mark in any advertising, publicity, or in any other commercial manner without the prior written consent of Tagzy. Requests for authorization should be made to info@tagzy.in .

          </p>


          <h3>
            {" "}
            <span style={{ fontFamily: "serif" }}>V. HOW WE MAY USE INFORMATION YOU PROVIDE TO US

            </span>
          </h3>
          <p>
          Do not send us any confidential or proprietary information. Except for any personally identifiable information that we agree to keep confidential as provided in our Privacy Policy, any material, including, but not limited to any feedback, data, answers, questions, comments, suggestions, ideas or the like, which you send us will be treated as being non-confidential and nonproprietary. We assume no obligation to protect confidential or proprietary information (other than personally identifiable information) from disclosure and will be free to reproduce, use, and distribute the information to others without restriction. We will also be free to use any ideas, concepts, know-how or techniques contained in information that you send us for any purpose whatsoever including but not limited to developing, manufacturing and marketing products and services incorporating such information.

          </p>


          
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TermsAndConditions;
