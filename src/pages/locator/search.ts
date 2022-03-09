import { distance } from "fastest-levenshtein";

import { Location } from "../../others/contexts/api";

export function fuzzySearch(needle: string, elements: Location[]): Location[] {
  const MAX_DISTANCE = 4;

  return elements
    .filter((element) => distance(needle, element.name) <= MAX_DISTANCE)
    .sort((a, b) => distance(needle, a.name) - distance(needle, b.name));
}
