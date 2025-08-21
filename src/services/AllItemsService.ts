import { supabase } from "../lib/supabase";

export interface IShoppingAllItems {
  id?: number;
  title: string;
  subtitle: string;
  condition: string;
  category_id: string;
  price: number;
  images?: Array<any>;
  user_id: string;
  created_at?: string;
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

export const getShoppingAllItemsPublic = async (): Promise<
  IShoppingAllItems[]
> => {
  const { data, error } = await supabase
    .from(tableName)
    .select("*")
    .order("created_at", { ascending: true })
    .select();
  if (error) throw error.message;
  return data;
};

export const getShoppingAllItemsById = async (
  id: number
): Promise<IShoppingAllItems> => {
  const { data, error } = await supabase
    .from(tableName)
    .select("*")
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
