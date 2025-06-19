import { supabase } from "../lib/supabase";

export interface ISubdomain {
  id?: number;
  subdomain: string;
  created_at?: string;
  user_id: string;
}

export const insertSubdomain = async (
  props: ISubdomain
): Promise<ISubdomain[]> => {
  const { data, error } = await supabase
    .from("subdomain_cms")
    .insert([props])
    .select();

  if (error) throw error.message;
  return data;
};

export const getSubdomainById = async (
  user_id: string
): Promise<ISubdomain> => {
  const { data, error } = await supabase
    .from("subdomain_cms")
    .select("*")
    .eq("user_id", user_id) // Replace with the actual user ID
    .maybeSingle();
  if (error) throw error.message;
  return data;
};

export const getSubdomainBySubdomain = async (
  subdomain: string
): Promise<ISubdomain> => {
  const { data, error } = await supabase
    .from("subdomain_cms")
    .select("*")
    .eq("subdomain", subdomain) // Replace with the actual user ID
    .maybeSingle();
  if (error) throw error.message;
  return data;
};

export const updateSubdomainById = async (
  user_id: string,
  subdomain: Partial<ISubdomain>
): Promise<ISubdomain> => {
  const { data, error } = await supabase
    .from("subdomain_cms")
    .update(subdomain)
    .eq("user_id", user_id)
    .select()
    .single();
  if (error) throw error.message;

  return data;
};
