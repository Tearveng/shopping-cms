import { supabase } from "../lib/supabase";

export interface IEducation {
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

export const insertEducation = async (
  props: IEducation[]
): Promise<IEducation[]> => {
  const { data, error } = await supabase
    .from("education_cms")
    .insert(props)
    .select();

  if (error) throw error.message;
  return data;
};

export const updateEducation = async (prop: IEducation) => {
  const { data, error } = await supabase
    .from("education_cms")
    .update(prop)
    .eq("id", prop.id)
    .select();
  if (error) throw error.message;

  return data;
};

export const getEducations = async (user_id: string): Promise<IEducation[]> => {
  const { data, error } = await supabase
    .from("education_cms")
    .select("*")
    .order("created_at", { ascending: true })
    .eq("user_id", user_id) // Replace with the actual user ID
    .select();
  if (error) throw error.message;
  return data;
};

export const getEducationsPublic = async (): Promise<IEducation[]> => {
  const { data, error } = await supabase
    .from("education_cms")
    .select("*")
    .order("created_at", { ascending: true })
    .select();
  if (error) throw error.message;
  return data;
};

export const getEducationById = async (id: number): Promise<IEducation> => {
  const { data, error } = await supabase
    .from("education_cms")
    .select("*")
    .eq("id", id) // Replace with the actual user ID
    .maybeSingle();
  if (error) throw error.message;
  return data;
};

export const deleteEducation = async (id: number): Promise<boolean> => {
  const { error } = await supabase.from("education_cms").delete().eq("id", id);
  if (error) throw error.message;
  return true;
};

export const getImageUrl = async (fileName: string, user_id: string) => {
  const { data } = supabase.storage
    .from("portfolio-cms")
    .getPublicUrl(`${user_id}/${fileName}`);
  return data.publicUrl;
};
