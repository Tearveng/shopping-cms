import { supabase } from "../lib/supabase";

export interface IShoppingBanner {
  id?: number;
  title: string;
  subtitle: string;
  description: string;
  images?: Array<any>;
  user_id: string;
  created_at?: string;
}

export const insertShoppingBanner = async (
  props: IShoppingBanner[]
): Promise<IShoppingBanner[]> => {
  const { data, error } = await supabase
    .from("shopping_banner")
    .insert(props)
    .select();

  if (error) throw error.message;
  return data;
};

export const updateShoppingBanner = async (prop: IShoppingBanner) => {
  const { data, error } = await supabase
    .from("shopping_banner")
    .update(prop)
    .eq("id", prop.id)
    .select();
  if (error) throw error.message;

  return data;
};

export const getShoppingBanners = async (
  user_id: string
): Promise<IShoppingBanner[]> => {
  const { data, error } = await supabase
    .from("shopping_banner")
    .select("*")
    .order("created_at", { ascending: true })
    .eq("user_id", user_id) // Replace with the actual user ID
    .select();
  if (error) throw error.message;
  return data;
};

export const getShoppingBannerById = async (
  id: number
): Promise<IShoppingBanner> => {
  const { data, error } = await supabase
    .from("shopping_banner")
    .select("*")
    .eq("id", id) // Replace with the actual user ID
    .maybeSingle();
  if (error) throw error.message;
  return data;
};

export const deleteShoppingBanner = async (id: number): Promise<boolean> => {
  const { error } = await supabase.from("shopping_banner").delete().eq("id", id);
  if (error) throw error.message;
  return true;
};

export const getImageUrl = async (fileName: string, user_id: string) => {
  const { data } = supabase.storage
    .from("portfolio-cms")
    .getPublicUrl(`${user_id}/${fileName}`);
  return data.publicUrl;
};
