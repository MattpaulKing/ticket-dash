import { error } from "@sveltejs/kit";

export const load = async ({ locals, url }: { locals: App.Locals, url: URL}) => {
    
    const eventId = url.pathname.slice(15)
    //TODO make a function and sort by created_at DESC
    const {data: eventDetails, error: eventDetailsError} = await locals.supabase.from("sgEvents").select("*").eq("eventId", eventId).order('created_at', { ascending: false }).limit(1).single()
    if (eventDetailsError) {
        throw error(500, "Unable to find event")
    }
    const streamedDetails = async () => {
        return await locals.supabase.from("sgEvents").select("*").eq("eventId", eventId).order('created_at', { ascending: true })
    }
    return {
        eventDetails,
        streamed: {
           events: streamedDetails()
        }
    }
};
