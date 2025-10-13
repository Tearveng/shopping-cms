import type { ShoppingAllItems } from "./ShoppingAllItems";

export interface ShoppingItemDetail extends ShoppingAllItems {
  category: {
    id: number;
    created_at: string;
    images: Object[];
    parent_category: string;
    title: string;
    user_id: string;
  };
}
