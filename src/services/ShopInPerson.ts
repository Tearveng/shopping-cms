import { supabase } from "../lib/supabase";

export interface IShoppingShopInPerson {
  id?: number;
  title: string;
  images?: Array<any>;
  user_id: string;
  created_at?: string;
}

const table = "shopping_shop_in_person";
export const storageShopInPerson = "storage-shop-in-person";

export const insertShoppingShopInPerson = async (
  props: IShoppingShopInPerson[]
): Promise<IShoppingShopInPerson[]> => {
  const { data, error } = await supabase.from(table).insert(props).select();

  if (error) throw error.message;
  return data;
};

export const updateShoppingShopInPerson = async (
  prop: IShoppingShopInPerson
) => {
  const { data, error } = await supabase
    .from(table)
    .update(prop)
    .eq("id", prop.id)
    .select();
  if (error) throw error.message;

  return data;
};

export const getShoppingShopInPerson = async (
  user_id: string
): Promise<IShoppingShopInPerson[]> => {
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .order("created_at", { ascending: true })
    .eq("user_id", user_id) // Replace with the actual user ID
    .select();
  if (error) throw error.message;
  return data;
};

export const getShoppingShopInPersonPublic = async (): Promise<
  IShoppingShopInPerson[]
> => {
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .order("created_at", { ascending: true })
    .select();
  if (error) throw error.message;
  return data;
};

export const getShoppingShopInPersonById = async (
  id: number
): Promise<IShoppingShopInPerson> => {
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .eq("id", id) // Replace with the actual user ID
    .maybeSingle();
  if (error) throw error.message;
  return data;
};

export const deleteShoppingShopInPerson = async (
  id: number
): Promise<boolean> => {
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
