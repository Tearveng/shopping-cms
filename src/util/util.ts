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
