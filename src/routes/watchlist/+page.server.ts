import { error } from "@sveltejs/kit"

export const load = async ({ locals }: { locals: App.Locals }) => {

  const {data: watchlistEventIds, error: watchlistError} = await locals.supabase.from('Watchlist').select("eventId")
  if (watchlistError) {
    throw error(403, "Watchlist wasn't found, please try again")
  }
  const {data: events, error: eventsError} = await locals.supabase.from("sgEvents").select("*").in('eventId', watchlistEventIds.map( (id) => id.eventId))
  if (eventsError) {
    throw error(403, "Related events weren't found, please try again")
  }
   
  return {
    watchlistEventIds,
    events,
  }
}
