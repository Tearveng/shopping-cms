import { supabase } from "../lib/supabase";

export interface ShoppingItemCategory {
  id: number;
  created_at: string;
  images: Object[];
  parent_category: string;
  title: string;
  user_id: string;
}
export interface IShoppingAllItems {
  id?: number;
  title: string;
  subtitle: string;
  condition: string;
  category_id: string;
  parent_key: string;
  price: number;
  images?: Array<any>;
  user_id: string;
  created_at?: string;
  category: ShoppingItemCategory;
}

export interface IShoppingAllItemsPayload {
  parent_key: string[];
  category_ids: number[];
  limit: number;
}

const tableName = "shopping_all_items";
export const storageAllItems = "storage-all-items";

export const insertShoppingAllItems = async (
  props: IShoppingAllItems[]
): Promise<IShoppingAllItems[]> => {
  const { data, error } = await supabase.from(tableName).insert(props).select();

  if (error) throw error.message;
  return data;
};

export const updateShoppingAllItems = async (prop: IShoppingAllItems) => {
  const { data, error } = await supabase
    .from(tableName)
    .update(prop)
    .eq("id", prop.id)
    .select();
  if (error) throw error.message;

  return data;
};

export const getShoppingAllItems = async (
  user_id: string
): Promise<IShoppingAllItems[]> => {
  const { data, error } = await supabase
    .from(tableName)
    .select("*")
    .order("created_at", { ascending: false })
    .eq("user_id", user_id) // Replace with the actual user ID
    .select();
  if (error) throw error.message;
  return data;
};

export const getShoppingAllItemsPublic = async (
  props?: IShoppingAllItemsPayload
): Promise<IShoppingAllItems[]> => {
  let query = supabase
    .from(tableName)
    .select("*")
    .order("created_at", { ascending: false });
  if (props?.parent_key && props?.parent_key.length > 0) {
    query = query.in("parent_key", [props.parent_key[0]]);
  }
  if (props?.category_ids && props?.category_ids.length > 0) {
    query = query.in("category_id", props.category_ids);
  }
  query = query.limit(props?.limit ?? 20);
  const { data, error } = await query;
  if (error) throw error.message;
  return data;
};

export const getShoppingAllItemsById = async (
  id: number
): Promise<IShoppingAllItems> => {
  const { data, error } = await supabase
    .from(tableName)
    .select(
      `
      *,
      category:category_id (*)
    `
    )
    .eq("id", id) // Replace with the actual user ID
    .maybeSingle();
  if (error) throw error.message;
  return data;
};

export const deleteShoppingAllItems = async (id: number): Promise<boolean> => {
  const { error } = await supabase.from(tableName).delete().eq("id", id);
  if (error) throw error.message;
  return true;
};

export const getImageUrl = async (fileName: string, user_id: string) => {
  const { data } = supabase.storage
    .from("portfolio-cms")
    .getPublicUrl(`${user_id}/${fileName}`);
  return data.publicUrl;
};
