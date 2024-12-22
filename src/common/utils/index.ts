import { languageCodeToName } from "../constant";
import { Service } from "../types";

export const convertLanguageCodesToNames = (
  languageCodes: string[]
): string[] => {
  return languageCodes.map(
    (code) => languageCodeToName[+code - 1] || `Unknown Language (${code})`
  );
};

export const getAverageRating = (data?: Service[]): { sumRating: number; sumRatingCount: number } => {
  if (!data || data.length === 0) {
    return { sumRating: 0, sumRatingCount: 0 };
  }

  return data.reduce(
    (acc, item) => ({
      sumRating: acc.sumRating + item.rating,
      sumRatingCount: acc.sumRatingCount + item.ratingCount,
    }),
    { sumRating: 0, sumRatingCount: 0 }
  );
};
