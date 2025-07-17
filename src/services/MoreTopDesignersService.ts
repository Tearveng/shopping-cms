import { supabase } from "../lib/supabase";

export interface IShoppingMoreTopDesigners {
  id?: number;
  title: string;
  images?: Array<any>;
  user_id: string;
  created_at?: string;
}

const tableName = "shopping_more_top_designers"

export const insertShoppingMoreTopDesigners = async (
  props: IShoppingMoreTopDesigners[]
): Promise<IShoppingMoreTopDesigners[]> => {
  const { data, error } = await supabase
    .from(tableName)
    .insert(props)
    .select();

  if (error) throw error.message;
  return data;
};

export const updateShoppingMoreTopDesigners = async (prop: IShoppingMoreTopDesigners) => {
  const { data, error } = await supabase
    .from(tableName)
    .update(prop)
    .eq("id", prop.id)
    .select();
  if (error) throw error.message;

  return data;
};

export const getShoppingMoreTopDesigners = async (
  user_id: string
): Promise<IShoppingMoreTopDesigners[]> => {
  const { data, error } = await supabase
    .from(tableName)
    .select("*")
    .order("created_at", { ascending: true })
    .eq("user_id", user_id) // Replace with the actual user ID
    .select();
  if (error) throw error.message;
  return data;
};

export const getShoppingMoreTopDesignersById = async (
  id: number
): Promise<IShoppingMoreTopDesigners> => {
  const { data, error } = await supabase
    .from("tableName")
    .select("*")
    .eq("id", id) // Replace with the actual user ID
    .maybeSingle();
  if (error) throw error.message;
  return data;
};

export const deleteShoppingMoreTopDesigner = async (id: number): Promise<boolean> => {
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
