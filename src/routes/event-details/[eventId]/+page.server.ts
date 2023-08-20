import { error } from "@sveltejs/kit";

export const load = async ({ locals, params }: { locals: App.Locals, params: {eventId: number}}) => {
    const eventId = params.eventId

    const {data: eventDetails, error: eventDetailsError} = await locals.supabase.from("sgEvents").select("*").eq("eventId", eventId).order('created_at', { ascending: false }).limit(1).single()
    if (eventDetailsError) {
        throw error(500, "Unable to find event")
    }

    const streamedEventTypeDetails = async () => {
        return await locals.supabase.rpc("get_event_type_by_date", {event_type_a: eventDetails.eventType})
    }
    

    const streamedDetails = async () => {
        return await locals.supabase.from("sgEvents").select("*").eq("eventId", eventId).order('created_at', { ascending: true })
    }
    return {
        eventDetails,
        streamed: {
           events: streamedDetails(),
           eventAggs: streamedEventTypeDetails(),
        }
    }
};
