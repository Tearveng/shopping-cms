import { supabase } from "../lib/supabase";

interface IAbout {
    id: number | null;
    user_id: string;
    about: string
    created_at?: string;
}

export const insertAboutMe = async (props: IAbout): Promise<IAbout[]> => {
  const { data, error } = await supabase
    .from("about_cms")
    .insert([props])
    .select();

  if (error) throw error.message;
  return data;
};

export const getAboutMeById = async (user_id: string): Promise<IAbout> => {
  const { data, error } = await supabase
    .from("about_cms")
    .select("*")
    .eq("user_id", user_id) // Replace with the actual user ID
    .maybeSingle();
  if (error) throw error.message;
  return data;
};

export const updateAboutById = async (
  prop: IAbout
): Promise<IAbout> => {
  const { data, error } = await supabase
    .from("about_cms")
    .update(prop)
    .eq("id", prop.id)
    .select()
    .single();
  if (error) throw error.message;

  return data;
};
