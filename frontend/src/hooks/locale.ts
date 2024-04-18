import fr from "../locale/fr.json";

export type LanguageDictionary = typeof fr;

export function useDict() {
  return fr;
}