import { supabase } from "../lib/supabase";

export interface IWorkExperiences {
  id?: number;
  start_date: string;
  end_date: string;
  link: string;
  alias: string;
  description: string;
  images?: Array<any>;
  user_id: string;
  created_at?: string;
}

export const insertWorkExperiences = async (
  props: IWorkExperiences[]
): Promise<IWorkExperiences[]> => {
  const { data, error } = await supabase
    .from("work_cms")
    .insert(props)
    .select();

  if (error) throw error.message;
  return data;
};

export const updateWorkExperiences = async (prop: IWorkExperiences) => {
  const { data, error } = await supabase
    .from("work_cms")
    .update(prop)
    .eq("id", prop.id)
    .select();
  if (error) throw error.message;

  return data;
};

export const getWorkExperiences = async (
  user_id: string
): Promise<IWorkExperiences[]> => {
  const { data, error } = await supabase
    .from("work_cms")
    .select("*")
    .eq("user_id", user_id) // Replace with the actual user ID
    .select();
  if (error) throw error.message;
  return data;
};

export const getWorkExperiencesById = async (
  id: number
): Promise<IWorkExperiences> => {
  const { data, error } = await supabase
    .from("work_cms")
    .select("*")
    .eq("id", id) // Replace with the actual user ID
    .maybeSingle();
  if (error) throw error.message;
  return data;
};

export const deleteWorkExperience = async (id: number): Promise<boolean> => {
  const { error } = await supabase.from("work_cms").delete().eq("id", id);
  if (error) throw error.message;
  return true;
};

export const getImageUrl = async (fileName: string, user_id: string) => {
  const { data } = supabase.storage
    .from("portfolio-cms")
    .getPublicUrl(`${user_id}/${fileName}`);
  return data.publicUrl;
};
