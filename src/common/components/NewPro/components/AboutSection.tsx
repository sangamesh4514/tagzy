import { Mail, Phone } from "lucide-react";
import React from "react";
import { languageCodeToName } from "src/common/constant";
import Rating from "./rating-display";
import { getAverageRating } from "src/common/utils";
import { Service } from "src/common/types";
import "../styles/AboutSection.css";

interface AboutSectionProps {
  description?: string;
  maskedPhoneNumber: string;
  maskedEmail: string;
  experience?: number;
  address?: string;
  languages?: string[];
  services?: Service[];
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  description,
  maskedPhoneNumber,
  maskedEmail,
  experience,
  address,
  languages,
  services,
}) => {
  const rate = getAverageRating(services);

  return (
    <table className="styleAboutSection">
      <tr>
        <td>About Provider</td>
        <td>{description}</td>
      </tr>
      <tr>
        <td>
          <div style={{ display: "flex", gap: "20px" }}>
            <Phone className="h-4 w-4" />
            Mobile Number
          </div>
        </td>
        <td>{maskedPhoneNumber}</td>
      </tr>
      <tr>
        <td>
          <div style={{ display: "flex", gap: "20px" }}>
            <Mail className="h-4 w-4" />
            Email
          </div>
        </td>
        <td>{maskedEmail}</td>
      </tr>
      <tr>
        <td>Experience</td>
        <td>{experience} years of professional experience</td>
      </tr>
      <tr>
        <td>Languages</td>
        <td>
          {languages?.map((language, index) => (
            <div className="language" key={index}>
              {languageCodeToName[+language - 1]}
            </div>
          ))}
        </td>
      </tr>
      <tr>
        <td>Address</td>
        <td>{address}</td>
      </tr>
      <tr>
        <td>Overall Ratings</td>
        <td>
          {
            <Rating
              rating={rate.sumRating}
              ratingCount={rate.sumRatingCount}
              size="lg"
            />
          }
        </td>
      </tr>
    </table>
  );
};
