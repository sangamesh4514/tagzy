import { languageCodeToName } from "../constant";

export const convertLanguageCodesToNames = (languageCodes: string[]): string[] => {
  return languageCodes.map(
    (code) => languageCodeToName[+code - 1] || `Unknown Language (${code})`
  );
};
