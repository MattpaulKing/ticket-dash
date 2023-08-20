import { error } from "@sveltejs/kit";

export const load = async ({ locals, params }: { locals: App.Locals, params: {eventId: number}}) => {

    const {data: latestRecord, error: latestRecordError} = await locals.supabase.from("sgEvents").select("*").eq("eventId", params.eventId).order('created_at', { ascending: false }).limit(1).single()
    if (latestRecordError) {
        throw error(500, "Unable to find event")
    }

    const {data: stateAggregate, error: stateAggregateError} = await locals.supabase.rpc("get_single_state_avgs_within_two_week_interval", {state_selected: latestRecord.state}).limit(1).single()
    if (stateAggregateError) {
        throw error(500, "Unable to get State Aggregates")
    }

    const streamedEventTypeDetails = async () => {
        return await locals.supabase.rpc("get_event_type_by_date", {event_type_a: latestRecord.eventType})
    }
    

    const streamedDetails = async () => {
        return await locals.supabase.from("sgEvents").select("*").eq("eventId", params.eventId).order('created_at', { ascending: true })
    }

    const streamedStateEventAggs = async () => {
        return await locals.supabase.rpc("get_state_avgs_within_two_week_interval", {state_selected: latestRecord.state})
    }
    const stateEvents = async () => {
        return await locals.supabase.rpc("get_events_in_state_in_date_range", {event_date: latestRecord.eventDate, event_state: latestRecord.state})
    }
        
    return {
        latestRecord: latestRecord,
        stateAggregate: stateAggregate,
        streamed: {
            eventRecords: streamedDetails(),
            eventTypeAggs: streamedEventTypeDetails(),
            stateAggs: streamedStateEventAggs(),
            stateEvents: stateEvents(),
        }
    }
};
