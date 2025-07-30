import { supabase } from "../lib/supabase";

export interface IShoppingCategory {
  id?: number;
  title: string;
  images?: Array<any>;
  user_id: string;
  created_at?: string;
}

const table = "shopping_category";
export const storageCategory = "storage-category";

export const insertShoppingCategory = async (
  props: IShoppingCategory[]
): Promise<IShoppingCategory[]> => {
  const { data, error } = await supabase.from(table).insert(props).select();

  if (error) throw error.message;
  return data;
};

export const updateShoppingCategory = async (prop: IShoppingCategory) => {
  const { data, error } = await supabase
    .from(table)
    .update(prop)
    .eq("id", prop.id)
    .select();
  if (error) throw error.message;

  return data;
};

export const getShoppingCategory = async (
  user_id: string
): Promise<IShoppingCategory[]> => {
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .order("created_at", { ascending: true })
    .eq("user_id", user_id) // Replace with the actual user ID
    .select();
  if (error) throw error.message;
  return data;
};

export const getShoppingCategoryPublic = async (): Promise<IShoppingCategory[]> => {
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .order("created_at", { ascending: true })
    .select();
  if (error) throw error.message;
  return data;
};

export const getShoppingCategoryById = async (
  id: number
): Promise<IShoppingCategory> => {
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .eq("id", id) // Replace with the actual user ID
    .maybeSingle();
  if (error) throw error.message;
  return data;
};

export const deleteShoppingCategory = async (id: number): Promise<boolean> => {
  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) throw error.message;
  return true;
};

export const getImageUrl = async (fileName: string, user_id: string) => {
  const { data } = supabase.storage
    .from("portfolio-cms")
    .getPublicUrl(`${user_id}/${fileName}`);
  return data.publicUrl;
};
