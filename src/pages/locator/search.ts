import { Location } from "../../others/contexts/api";

export function fuzzySearch(needle: string, elements: Location[]): Location[] {
  return (
    elements.filter((element) => {
      if (element.id === "") return false;
      const haystack = element.name.toLowerCase();
      let n = -1;
      const searchTerm = needle.toLowerCase();

      for (let index = 0; index < searchTerm.length; index++) {
        const element = searchTerm[index];
        if (!~(n = haystack.indexOf(element, n + 1))) {
          return false;
        }
      }

      return true;
    }) || []
  );
}
