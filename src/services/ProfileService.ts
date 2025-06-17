import { supabase } from "../lib/supabase";

export interface IProfile {
  id: number;
  user_id: string;
  profile_url: string;
  bio: string;
  website: string;
}

export const getProfileById = async (user_id: string): Promise<IProfile> => {
  const { data, error } = await supabase
    .from("profile_cms")
    .select("*")
    .eq("user_id", user_id) // Replace with the actual user ID
    .maybeSingle();
  if (error) throw error.message;
  return data;
};

export const updateProfileById = async (
  user_id: string,
  profile: Partial<IProfile>
): Promise<IProfile> => {
  const { data, error } = await supabase
    .from("profile_cms")
    .update(profile)
    .eq("user_id", user_id)
    .select()
    .single();
  if (error) throw error.message;

  return data;
};
