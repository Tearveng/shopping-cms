import { supabase } from "../lib/supabase";

export interface IShoppingTopDesigners {
  id?: number;
  title: string;
  images?: Array<any>;
  user_id: string;
  created_at?: string;
}

export const insertShoppingTopDesigners = async (
  props: IShoppingTopDesigners[]
): Promise<IShoppingTopDesigners[]> => {
  const { data, error } = await supabase
    .from("shopping_top_designers")
    .insert(props)
    .select();

  if (error) throw error.message;
  return data;
};

export const updateShoppingTopDesigners = async (prop: IShoppingTopDesigners) => {
  const { data, error } = await supabase
    .from("shopping_top_designers")
    .update(prop)
    .eq("id", prop.id)
    .select();
  if (error) throw error.message;

  return data;
};

export const getShoppingTopDesigners = async (
  user_id: string
): Promise<IShoppingTopDesigners[]> => {
  const { data, error } = await supabase
    .from("shopping_top_designers")
    .select("*")
    .order("created_at", { ascending: true })
    .eq("user_id", user_id) // Replace with the actual user ID
    .select();
  if (error) throw error.message;
  return data;
};

export const getShoppingTopDesignersById = async (
  id: number
): Promise<IShoppingTopDesigners> => {
  const { data, error } = await supabase
    .from("shopping_top_designers")
    .select("*")
    .eq("id", id) // Replace with the actual user ID
    .maybeSingle();
  if (error) throw error.message;
  return data;
};

export const deleteShoppingTopDesigner = async (id: number): Promise<boolean> => {
  const { error } = await supabase.from("shopping_top_designers").delete().eq("id", id);
  if (error) throw error.message;
  return true;
};

export const getImageUrl = async (fileName: string, user_id: string) => {
  const { data } = supabase.storage
    .from("portfolio-cms")
    .getPublicUrl(`${user_id}/${fileName}`);
  return data.publicUrl;
};
