import type { ShoppingParentKey } from "../types/ShoppingCategory";

export function getLastNumber(input: string): number | null {
  const matches = input.match(/\d+$/);
  return matches ? parseInt(matches[0], 10) : null;
}

export function resetAllChecks(obj: ShoppingParentKey) {
  const categories = [
    "watches",
    "bags",
    "designers",
    "accessories",
    "shoes",
    "jewelry",
  ];
  categories.forEach((category) => {
    if (obj[category] && Array.isArray(obj[category])) {
      obj[category].forEach((item) => {
        item.check = false;
      });
    }
  });
};

// replace space character by any characters
export function replaceSpace(str: string, replaceBy: string) {
  if(!str.includes(" ")) return str;

  return str.replace(/\s+/g, replaceBy);
}

export function firstCharUpperCase(str: string) {
  if(str === "") return str;

  // Replace hyphens with spaces
  const stringWithSpaces = str.replace(/-/g, ' ');
  
  // Split into words, capitalize each, then join back
  return stringWithSpaces
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}
