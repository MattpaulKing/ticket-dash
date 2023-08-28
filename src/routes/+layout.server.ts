import { parse } from 'date-fns'
import { error, type Cookies } from '@sveltejs/kit'
import type { Database } from "$lib/types/db"
type DateRange = Database["public"]["Functions"]["get_min_max_event_dates"]["Returns"]

export const load = async ({ locals, setHeaders, cookies, isDataRequest }: 
  { locals: App.Locals, cookies: Cookies, isDataRequest: boolean, setHeaders: (headers: Record<string, string>) => void }) => {

  const initialRequest = !isDataRequest
  const cacheValue = initialRequest ? +new Date()  : cookies.get("filters-cache")
  

  if (!initialRequest) {
    const session = await locals.getSession()
    return {
      session
    }
  } else {
    //NOTE: can be a security problem, but this is just a number
    cookies.set("filters-cache", cacheValue, { path: "/", httpOnly: false});
  }
  /*
  setHeaders({
    "cache-control": "max-age=3600"
  })
  */
  const session = await locals.getSession()
  const getDistinctTitles = async () => {
    const { data, error: err } = await locals.supabase.from("distinct_titles").select()
    if (err) {
      throw error(500, err)
    }
    return data.map( (obj: {title: string}) => obj.title )
  }

  const getDistinctEventTypes = async () => {
    const { data, error: err } = await locals.supabase.from("distinct_event_types").select()
    if (err) {
      throw error(500, err)
    }
    return data.map( (obj: {eventType: string}) => obj.eventType)
  }

  const getDistinctStates = async () => {
    const { data, error: err } = await locals.supabase.from("distinct_states").select()
    if (err) {
      throw error(500, err)
    }
    return data.map( (obj: {state: string | null}) => obj.state )
  }

  const getMinMaxDates = async () => {
    const { data, error: err }: { data: DateRange, error: any} = await locals.supabase.rpc("get_min_max_event_dates")
    if (err) {
      throw error(500, err)
    }
    const minMaxDates = [
      parse(data[0].min_date, 'yyyy-mm-dd', new Date()),
      parse(data[0].max_date, 'yyyy-mm-dd', new Date())
    ]
    return minMaxDates
  }

  return {
    session, 
    cacheBust: cacheValue,
    filterOptions: {
      distinctTitles: getDistinctTitles(),
      distinctEventTypes: getDistinctEventTypes(), 
      distinctStates: getDistinctStates(),
      minMaxDates: getMinMaxDates(),
    }
  }
}
