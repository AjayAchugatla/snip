import { UAParser } from "ua-parser-js";
import supabase from "./supabase";

export async function getAllClicks(urlIds) {
    const { data, error } = await supabase.from("clicks").select("*").in("url_id", urlIds)
    if (error) {
        console.error("Unable to load clicks");

        throw new Error(error.message)
    }
    return data;

}

const parser = new UAParser()

export async function storeClicks({ id, originalUrl }) {
    try {
        const res = parser.getResult()
        const device = res.type || "desktop"
        const resp = await fetch("https://ipapi.co/json")
        const { city, country_name: country } = await resp.json()

        await supabase.from("clicks").insert({
            url_id: id,
            city: city,
            country: country,
            device: device
        })

        window.location.href = originalUrl
    } catch (error) {
        console.error("Error recording click")
    }
}

export async function getClicks(url_id) {
    const { data, error } = await supabase
        .from("clicks")
        .select("*")
        .eq("url_id", url_id)
    if (error) {
        console.error("Unable to load stats for the url");
        throw new Error(error.message)
    }
    return data;
}