import { supabase } from "../lib/supabase.ts";

export interface IShoppingContact {
  id?: number;
  title: string;
  subtitle: string;
  link: string;
  created_at?: string;
  user_id: string;
}

const table = "shopping_contact";

export const insertShoppingContacts = async (
  props: IShoppingContact[]
): Promise<IShoppingContact[]> => {
  const { data, error } = await supabase.from(table).insert(props).select();

  if (error) throw error.message;
  return data;
};

export const getShoppingContacts = async (
  user_id: string
): Promise<IShoppingContact[]> => {
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .order("created_at", { ascending: true })
    .eq("user_id", user_id) // Replace with the actual user ID
    .select();
  if (error) throw error.message;
  return data;
};

export const getShoppingContactsPublic = async (): Promise<
  IShoppingContact[]
> => {
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .order("created_at", { ascending: true })
    .select();
  if (error) throw error.message;
  return data;
};

export const updateShoppingContacts = async (prop: IShoppingContact) => {
  const { data, error } = await supabase
    .from(table)
    .update(prop)
    .eq("id", prop.id)
    .select();
  if (error) throw error.message;

  return data;
};

export const deleteShoppingContact = async (id: number): Promise<boolean> => {
  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) throw error.message;
  return true;
};
