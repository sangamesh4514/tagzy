import React from "react";
import "./style.css"; // Add custom CSS for styling
import { Helmet } from "react-helmet";

const PrivacyPolicy = () => {
  return (
    <>
    <Helmet>
      <title>Privacy Policy - TagZy</title>
      <meta name="description" content="Read TagZy's privacy policy to understand how we collect, use, and protect your personal information when you use our local services marketplace." />
      <meta name="keywords" content="privacy policy, TagZy, data protection, user privacy, local services marketplace" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.tagzy.in/privacyPolicy" />
      <meta property="og:title" content="Privacy Policy - TagZy" />
      <meta property="og:description" content="Learn about TagZy's commitment to protecting your privacy and personal information." />

      {/* Canonical URL */}
      <link rel="canonical" href="https://www.tagzy.in/privacyPolicy" />

      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="TagZy" />
    </Helmet>
      <div className="privacy-container">
        <div className="privacy-content">
          <div className="logo-container">
            <img src="/logo.png" alt="TagZy Logo" className="logo" />
          </div>
          <h1>
            {" "}
            <span style={{ fontFamily: "serif" }}>TagZy</span> Privacy Policy
          </h1>
          <p>
            At <span style={{ fontFamily: "serif" }}>TagZy</span>, we respect
            and are committed to protecting your privacy. This privacy policy
            outlines how we collect, use, and safeguard your personal
            information when you register for and use the services we provide
            through our app <span style={{ fontFamily: "serif" }}>TagZy</span>{" "}
            ("App"), or through other platforms like telephone search, SMS, WAP,
            or any other medium in which{" "}
            <span style={{ fontFamily: "serif" }}>TagZy</span> offers its
            services (collectively referred to as "Media").
          </p>
          <p>
            When you register for or avail of our services via any of our Media,
            you may be required to provide personal details such as your name,
            residential address, workplace address, email address, date of
            birth, educational qualifications, and similar personal information
            ("Personal Information"). This information is used for three general
            purposes:
          </p>
          <ul>
            <li>To personalize the content you see.</li>
            <li>To fulfill your requests for our services.</li>
            <li>To contact you regarding our services.</li>
          </ul>
          <p>
            Unless explicitly stated otherwise, this policy applies to any
            Personal Information disclosed across any Media.
          </p>
          <h2>Our Commitment to Protecting Your Personal Information</h2>
          <p>
            We are committed to maintaining the privacy and confidentiality of
            the Personal Information you share with us through any of the Media.
            To demonstrate our commitment to protecting your privacy, we have
            established this policy.
          </p>
          <p>
            Please note that this policy does not apply to organizations we do
            not own or manage, or to individuals we do not employ or control.
          </p>
          <h2>How We Use Your Personal Information</h2>
          <p>
            We keep your Personal Information confidential and use it for
            internal purposes such as research, marketing, strategic analysis,
            and business development. We do not sell or rent your Personal
            Information. However, if you are a customer of our search services
            through any of the Media, your Personal Information may be shared
            with our subscribers/advertisers. By using our services, you are
            deemed to have consented to this.
          </p>
          <p>
            Subscribers/advertisers listed with us may contact you based on the
            queries or inquiries you make with us regarding:
          </p>
          <ul>
            <li>Any product or service.</li>
            <li>Any product or service of a subscriber/advertiser.</li>
            <li>
              Any product or service of a particular subscriber/advertiser.
            </li>
          </ul>
          <p>
            We will share your Personal Information under the following
            circumstances:
          </p>
          <ul>
            <li>If we have your explicit or implied consent to do so.</li>
            <li>If required by law, including under a court order.</li>
          </ul>
          <h2>Security of Your Information</h2>
          <p>
            To ensure the confidentiality of your Personal Information, we have
            implemented appropriate physical, electronic, and managerial
            procedures to protect the information we collect online.
          </p>
          <h2>Managing Your Account and Preferences</h2>
          <p>
            We give you the option to edit your account information and
            preferences at any time, including whether you want to receive
            updates from us regarding new services. To safeguard your privacy
            and security, we will take reasonable steps to verify your identity
            before granting access or making changes to your account.
          </p>
          <h2>Your Consent and Disclosure</h2>
          <p>
            You acknowledge that you are disclosing Personal Information
            voluntarily. If you choose not to disclose any Personal Information
            requested by us during the registration process on our APP, or prior
            to using any of our services, you may do so. However, if you do not
            provide the requested information, you may be unable to complete the
            registration process or access our services.
          </p>
          <h2>Corporate Customers</h2>
          <p>
            If you are a corporate customer and we have entered into a
            non-disclosure agreement with you, this policy does not affect that
            contract in any way.
          </p>
          <h2>Contact Us</h2>
          <p>
            If you have any questions or concerns regarding this privacy policy,
            please contact us at info@tagzy.in.
          </p>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
