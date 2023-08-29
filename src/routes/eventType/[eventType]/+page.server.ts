import { error } from "@sveltejs/kit"

export const load = async ({ locals, params }: { locals: App.Locals, params: {eventType: string} }) => {
 
  const { data: eventTypeAggs, error: eventTypeError } = await locals.supabase.rpc("get_event_type_aggs", { event_type_selected: params.eventType })
  if (eventTypeError) {
    console.log(eventTypeError)
    throw error(500, "Couldn't find aggregates, please try again later")
  }

  const { data: eventTypeTotalAggs, error: eventTypeTotalError } = await locals.supabase.rpc("get_total_event_type_aggs", { event_type_selected: params.eventType })
  if (eventTypeTotalError) {
    console.log(eventTypeTotalError)
    throw error(500, "Couldn't find total aggregates, please try again later")
  }

const getEventsByType = async () => {
    const { data, error: err } = await locals.supabase.rpc("get_events_by_type", { event_type_selected: params.eventType })
    if (err) {
      throw error(500, err)
    }
    return data
  }

  return { 
    eventTypeAggs,
    eventTypeTotalAggs,
    streamed: {
      events: getEventsByType(),
    }
  }
}
