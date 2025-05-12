import supabase from "./supabase";

export async function getUrls(user_id) {
    const { data, error } = await supabase.from("urls").select("*").eq("user_id", user_id)
    if (error) {
        console.error("Unable to load urls");

        throw new Error(error.message)
    }
    return data;

}