import { parse } from 'date-fns'
import { error } from '@sveltejs/kit'

export const load = async ({ locals }: { locals: App.Locals }) => {

  const session = await locals.getSession()

  const getWatchlistIds = async () => {
    const query = await locals.supabase.from("Watchlist").select("eventId")
    if (query.error) {
      throw error(500, "Watchlist couldn't be loaded, please try again")
    }
    return query.data
  }
  
    //TODO: this takes too long rethink how to query...
  const getDistinctTitles = async () => {
    const { data, error: err } = await locals.supabase.from("distinct_titles").select()
    if (err) {
      throw error(500, err)
    }
    return data.map( (obj: {title: string}) => obj.title )
  }

  const getDistinctEventTypes = async () => {
    const { data, error: err } = await locals.supabase.rpc("types_by_score")
    if (err) {
      throw error(500, err)
    }
    return data.map( (obj: {eventType: string, eventScore: number}) => obj.eventType)
  }

  const getDistinctStates = async () => {
    const { data, error: err } = await locals.supabase.from("distinct_states").select()
    if (err) {
      throw error(500, err)
    }
    return data.map( (obj: {state: string | null}) => obj.state )
  }

  const getMinMaxDates = async () => {
    const query =  await locals.supabase.rpc("get_min_max_event_dates")
    if (query.error) {
      throw error(500, query.error)
    }
    return [
      query.data[0].min_date, query.data[0].max_date
    ]
  }

  const getTypeAggsByInterval = async (interval: "MONTH" | "DAY") => {
    const query = await locals.supabase.rpc("type_aggs_by_interval", { interval_selected: interval })
    if (query.error) {
      throw error(500, query.error)
    }
    return query.data
  }

  const getStateAggsByInterval = async (interval: "MONTH" | "DAY") => {
    const query = await locals.supabase.rpc("type_aggs_by_interval", { interval_selected: interval })
    if (query.error) {
      throw error(500, query.error)
    }
    return query.data
  }

  return {
    session, 
    watchlistIds: getWatchlistIds(),
    filterOptions: {
      distinctTitles: getDistinctTitles(),
      distinctEventTypes: getDistinctEventTypes(), 
      distinctStates: getDistinctStates(),
      minMaxDates: getMinMaxDates(),
      typeAggsByMonth: getTypeAggsByInterval("MONTH"),
      stateAggsByMonth: getStateAggsByInterval("DAY"),
    }
  }
}
