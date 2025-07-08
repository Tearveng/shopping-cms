import { supabase } from "../lib/supabase";

export interface IShoppingFeatureCollections {
  id?: number;
  title: string;
  images?: Array<any>;
  user_id: string;
  created_at?: string;
}

export const insertShoppingFeatureCollections = async (
  props: IShoppingFeatureCollections[]
): Promise<IShoppingFeatureCollections[]> => {
  const { data, error } = await supabase
    .from("shopping_feature_collects")
    .insert(props)
    .select();

  if (error) throw error.message;
  return data;
};

export const updateShoppingFeatureCollections = async (prop: IShoppingFeatureCollections) => {
  const { data, error } = await supabase
    .from("shopping_feature_collections")
    .update(prop)
    .eq("id", prop.id)
    .select();
  if (error) throw error.message;

  return data;
};

export const getShoppingFeatureCollections = async (
  user_id: string
): Promise<IShoppingFeatureCollections[]> => {
  const { data, error } = await supabase
    .from("shopping_feature_collections")
    .select("*")
    .order("created_at", { ascending: true })
    .eq("user_id", user_id) // Replace with the actual user ID
    .select();
  if (error) throw error.message;
  return data;
};

export const getShoppingFeatureCollectionsById = async (
  id: number
): Promise<IShoppingFeatureCollections> => {
  const { data, error } = await supabase
    .from("shopping_feature_collections")
    .select("*")
    .eq("id", id) // Replace with the actual user ID
    .maybeSingle();
  if (error) throw error.message;
  return data;
};

export const deleteShoppingFeatureCollections = async (id: number): Promise<boolean> => {
  const { error } = await supabase.from("shopping_feature_collections").delete().eq("id", id);
  if (error) throw error.message;
  return true;
};

export const getImageUrl = async (fileName: string, user_id: string) => {
  const { data } = supabase.storage
    .from("portfolio-cms")
    .getPublicUrl(`${user_id}/${fileName}`);
  return data.publicUrl;
};
