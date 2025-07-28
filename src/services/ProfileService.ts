import { supabase } from "../lib/supabase";

export interface IProfile {
  id: number;
  user_id: string;
  profile_url: string;
  bio: string;
  website: string;
}

const table = "shopping-profile";
export const storageProfile = "storage-profile";

export const getProfileById = async (
  user_id: string
): Promise<IProfile | boolean> => {
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .eq("user_id", user_id) // Replace with the actual user ID
    .maybeSingle();
  if (error) return false;
  return data;
};

export const insertProfileById = async (
  props: Partial<IProfile>
): Promise<IProfile> => {
  const { data, error } = await supabase
    .from(table)
    .insert([props])
    .select()
    .single();
  if (error) throw error.message;
  return data;
};

export const updateProfileById = async (
  user_id: string,
  profile: Partial<IProfile>
): Promise<IProfile> => {
  const { data, error } = await supabase
    .from(table)
    .update(profile)
    .eq("user_id", user_id)
    .select()
    .single();
  if (error) throw error.message;

  return data;
};

export const uploadFile = async (file: any) => {
  const filePath = `public/${file.name}`; // Path in the bucket
  const { data, error } = await supabase.storage
    .from(table) // Replace with your bucket name
    .upload(filePath, file, {
      cacheControl: "3600", // Cache duration in seconds
      upsert: false, // Set to true to overwrite existing files
      contentType: file.type, // Optional: specify MIME type (e.g., 'image/jpeg')
    });

  if (error) {
    // console.error("Upload error:", error.message);
    return null;
  }
  // console.log("File uploaded:", data);
  return data;
};
