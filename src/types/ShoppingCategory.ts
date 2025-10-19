export interface ShoppingCategory {
  id: number;
  key: string;
  title: string;
  amount: number;
  check: boolean;
  parent_category: string;
  images: [];
  user_id: string;
  created_at: string;
}

export interface ShoppingParentKey {
  [k: string]: ShoppingCategory[];
}
