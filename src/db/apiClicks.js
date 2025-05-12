import supabase from "./supabase";

export async function getClicks(urlIds) {
    const { data, error } = await supabase.from("clicks").select("*").in("url_id", urlIds)
    if (error) {
        console.error("Unable to load clicks");

        throw new Error(error.message)
    }
    return data;

}