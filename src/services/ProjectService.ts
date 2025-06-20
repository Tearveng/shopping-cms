import { supabase } from "../lib/supabase";

export interface IProjectExperiences {
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

export const insertProjectExperiences = async (
  props: IProjectExperiences[]
): Promise<IProjectExperiences[]> => {
  const { data, error } = await supabase
    .from("project_cms")
    .insert(props)
    .select();

  if (error) throw error.message;
  return data;
};

export const updateProjectExperiences = async (prop: IProjectExperiences) => {
  const { data, error } = await supabase
    .from("project_cms")
    .update(prop)
    .eq("id", prop.id)
    .select();
  if (error) throw error.message;

  return data;
};

export const getProjectExperiences = async (
  user_id: string
): Promise<IProjectExperiences[]> => {
  const { data, error } = await supabase
    .from("project_cms")
    .select("*")
    .eq("user_id", user_id) // Replace with the actual user ID
    .select();
  if (error) throw error.message;
  return data;
};

export const getProjectExperiencesById = async (
  id: number
): Promise<IProjectExperiences> => {
  const { data, error } = await supabase
    .from("project_cms")
    .select("*")
    .eq("id", id) // Replace with the actual user ID
    .maybeSingle();
  if (error) throw error.message;
  return data;
};

export const deleteProjectExperience = async (id: number): Promise<boolean> => {
  const { error } = await supabase.from("project_cms").delete().eq("id", id);
  if (error) throw error.message;
  return true;
};

export const getImageUrl = async (fileName: string, user_id: string) => {
  const { data } = supabase.storage
    .from("portfolio-cms")
    .getPublicUrl(`${user_id}/${fileName}`);
  return data.publicUrl;
};
