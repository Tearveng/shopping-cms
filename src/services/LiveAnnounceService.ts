import { supabase } from "../lib/supabase";

export interface IShoppingLiveAnnounce {
  id?: number;
  title: string;
  description: string;
  link: string;
  images?: Array<any>;
  user_id: string;
  created_at?: string;
}

const table = "shopping_live_announce"
export const storageLiveAnnounce = "storage-live-announce"

export const insertShoppingLiveAnnounce = async (
  props: IShoppingLiveAnnounce[]
): Promise<IShoppingLiveAnnounce[]> => {
  const { data, error } = await supabase
    .from(table)
    .insert(props)
    .select();

  if (error) throw error.message;
  return data;
};

export const updateShoppingLiveAnnounce = async (prop: IShoppingLiveAnnounce) => {
  const { data, error } = await supabase
    .from(table)
    .update(prop)
    .eq("id", prop.id)
    .select();
  if (error) throw error.message;

  return data;
};

export const getShoppingLiveAnnounce = async (
  user_id: string
): Promise<IShoppingLiveAnnounce[]> => {
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .order("created_at", { ascending: true })
    .eq("user_id", user_id) // Replace with the actual user ID
    .select();
  if (error) throw error.message;
  return data;
};

export const getShoppingLiveAnnounceById = async (
  id: number
): Promise<IShoppingLiveAnnounce> => {
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .eq("id", id) // Replace with the actual user ID
    .maybeSingle();
  if (error) throw error.message;
  return data;
};

export const deleteShoppingLiveAnnounce = async (id: number): Promise<boolean> => {
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
