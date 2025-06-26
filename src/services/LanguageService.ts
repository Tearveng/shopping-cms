import { supabase } from "../lib/supabase.ts";

export interface ILanguage {
  id?: number;
  title: string;
  alias: string;
  created_at?: string;
  user_id: string;
}

export const insertLanguages = async (
  props: ILanguage[]
): Promise<ILanguage[]> => {
  const { data, error } = await supabase
    .from("language_cms")
    .insert(props)
    .select();

  if (error) throw error.message;
  return data;
};

export const getLanguages = async (user_id: string): Promise<ILanguage[]> => {
  const { data, error } = await supabase
    .from("language_cms")
    .select("*")
    .order("created_at", { ascending: true })
    .eq("user_id", user_id) // Replace with the actual user ID
    .select();
  if (error) throw error.message;
  return data;
};

export const updateLanguage = async (prop: ILanguage) => {
  const { data, error } = await supabase
    .from("language_cms")
    .update(prop)
    .eq("id", prop.id)
    .select();
  if (error) throw error.message;

  return data;
};

export const deleteLanguage = async (id: number): Promise<boolean> => {
  const { error } = await supabase.from("language_cms").delete().eq("id", id);
  if (error) throw error.message;
  return true;
};
