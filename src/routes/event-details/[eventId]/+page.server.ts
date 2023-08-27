import { error, type Actions, fail } from "@sveltejs/kit";

export const actions = {

  add: async ({ request, params, locals }) => {
    const data = await request.formData()
    const session  = await locals.getSession()
    const { error: err } = await locals.supabase.from("Watchlist").insert({
      eventId: params.eventId,
      sgEventsId: data.get('sgEventsId'),
      userId: session?.user.id
    })
    if (err) {
      return fail(400, {
        message: "Please try again."
      })
    }

    return { success: true }
  },

  remove: async ({ request, params, locals }) => {
    const data = await request.formData()
    const { error: err } = await locals.supabase.from("Watchlist")
      .delete()
      .eq('eventId', params.eventId)
      .eq('sgEventsUpcomingId', data.get('sgEventsId'))

    if (err) {
      return fail(400, {
        message: "Please try again."
      })
    }

    return { success: true }
  },
} satisfies Actions

export const load = async ({ locals, params }: { locals: App.Locals, params: {eventId: number}}) => {

    const {data: latestRecord, error: latestRecordError} = await locals.supabase.from("sgEventsUpcoming").select("*").eq("eventId", params.eventId).order('created_at', { ascending: false }).limit(1).single()
    if (latestRecordError) {
        throw error(500, "Unable to find event")
    }

    const {data: stateAggregate, error: stateAggregateError} = await locals.supabase.rpc("get_latest_state_avgs", {state_selected: latestRecord.state})
    if (stateAggregateError) {
        throw error(500, "Unable to get State Aggregates")
    }
    const session = await locals.getSession()
    const {data: watchlistRecord, error: watchlistErr} = await locals.supabase.from('Watchlist').select("eventId").eq('eventId', params.eventId).eq('userId', session?.user.id).limit(1).single()
    if (watchlistErr) {
      throw error(500, "Could not access watchlist, please try again")
    }

    const streamedEventTypeDetails = async () => {
        return await locals.supabase.rpc("get_event_type_by_day", {event_type_selected: latestRecord.eventType})
    }
    

    const streamedDetails = async () => {
        return await locals.supabase.from("sgEventsUpcoming").select("*").eq("eventId", params.eventId).order('created_at', { ascending: true })
    }

    const streamedStateEventAggs = async () => {
        return await locals.supabase.rpc("get_state_avgs_by_day", {state_selected: latestRecord.state })
    }
    const stateEvents = async () => {
        return await locals.supabase.rpc("get_events_in_state_in_three_day_range", {event_date: latestRecord.eventDate, event_state: latestRecord.state})
    }
        
    return {
        latestRecord: latestRecord,
        stateAggregate: stateAggregate[0],
        watchlistRecord,
        streamed: {
            eventRecords: streamedDetails(),
            eventTypeAggs: streamedEventTypeDetails(),
            stateAggs: streamedStateEventAggs(),
            stateEvents: stateEvents(),
        }
    }
};
