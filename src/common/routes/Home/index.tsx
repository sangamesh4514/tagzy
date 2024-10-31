import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { Helmet } from "react-helmet";
import { AnimatedGridPatternDemo } from "src/common/components/MagicUiDesign/AnimatedGridPatternDemo";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>TagZy - Your Marketplace for Local Services</title>
        <meta
          name="description"
          content="TagZy connects you with trusted local service providers in India. Find and book services for home, health, education, and more in your area."
        />
        <meta
          name="keywords"
          content="local services, marketplace, home services, health services, education services, TagZy, India"
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.tagzy.in/" />
        <meta
          property="og:title"
          content="TagZy - Your Marketplace for Local Services in India"
        />
        <meta
          property="og:description"
          content="Find and book trusted local services for all your needs with TagZy."
        />
        {/* <meta property="og:image" content="https://www.tagzy.in/og-image.jpg" /> */}

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.tagzy.in/" />
        <meta
          property="twitter:title"
          content="TagZy - Your Marketplace for Local Services in India"
        />
        <meta
          property="twitter:description"
          content="Find and book trusted local services for all your needs with TagZy."
        />
        <meta
          property="twitter:image"
          content="https://www.tagzy.in/apple-touch-icon.png"
          // content="https://www.tagzy.in/twitter-image.jpg"
        />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest"></link>

        {/* Canonical URL */}
        <link rel="canonical" href="https://www.tagzy.in/" />

        {/* Additional Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="TagZy" />
      </Helmet>
      <Header />
      <AnimatedGridPatternDemo />
      <Footer />
    </>
  );
};

export default Home;
