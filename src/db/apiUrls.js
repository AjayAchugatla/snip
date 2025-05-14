import supabase, { supabaseUrl } from "./supabase";

export async function getUrls(user_id) {
    const { data, error } = await supabase.from("urls").select("*").eq("user_id", user_id)
    if (error) {
        console.error("Unable to load urls");

        throw new Error(error.message)
    }
    return data;

}

export async function deleteUrl(id) {
    const { error } = await supabase.from("urls").delete().eq("id", id)
    if (error) {
        console.error("Unable to delete url");

        throw new Error(error.message)
    }
}

export async function createUrl({ title, longUrl, custom_url, user_id, qrcode }) {
    const shorturl = Math.random().toString(36).substring(2, 6)
    const fileName = `qr-${shorturl}`
    const { error: storageError } = await supabase.storage
        .from("qrs")
        .upload(fileName, qrcode);

    const qr = `${supabaseUrl}/storage/v1/object/public/qrs/${fileName}`
    if (storageError) throw new Error(storageError.message)
    const { data, error } = await supabase.from("urls").insert([
        {
            title,
            original_url: longUrl,
            custom_url: custom_url || null,
            user_id,
            short_url: shorturl,
            qr,
        }]).select()
    if (error) {
        console.error("Unable to create short url");
        throw new Error(error.message)
    }

    return data
}

export async function getLongUrl(url) {
    const { data, error } = await supabase
        .from("urls")
        .select("id,original_url")
        .or(`short_url.eq.${url},custom_url.eq.${url}`)
        .single()
    if (error) {
        console.error("Unable fetching long url");
        throw new Error(error.message)
    }
    return data;
}

export async function getUrl({ id, user_id }) {
    const { data, error } = await supabase
        .from("urls")
        .select("*")
        .eq("id", id)
        .eq("user_id", user_id)
        .single()
    if (error) {
        console.error("short url not found");
        throw new Error(error.message)
    }
    return data;
}