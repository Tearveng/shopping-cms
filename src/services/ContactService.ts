import { supabase } from "../lib/supabase.ts";

export interface IContact {
  id?: number;
  title: string;
  alias: string;
  url: string;
  created_at?: string;
  user_id: string;
}

export const insertContacts = async (
  props: IContact[]
): Promise<IContact[]> => {
  const { data, error } = await supabase
    .from("contact_cms")
    .insert(props)
    .select();

  if (error) throw error.message;
  return data;
};

export const getContacts = async (user_id: string): Promise<IContact[]> => {
  const { data, error } = await supabase
    .from("contact_cms")
    .select("*")
    .order("created_at", { ascending: true })
    .eq("user_id", user_id) // Replace with the actual user ID
    .select();
  if (error) throw error.message;
  return data;
};

export const updateContacts = async (prop: IContact) => {
  const { data, error } = await supabase
    .from("contact_cms")
    .update(prop)
    .eq("id", prop.id)
    .select();
  if (error) throw error.message;

  return data;
};

export const deleteContact = async (id: number): Promise<boolean> => {
  const { error } = await supabase.from("contact_cms").delete().eq("id", id);
  if (error) throw error.message;
  return true;
};
