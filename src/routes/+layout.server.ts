import { parse } from 'date-fns'
import { error, type Cookies, type Actions, fail } from '@sveltejs/kit'
import type { Database } from "$lib/types/db"
type DateRange = Database["public"]["Functions"]["get_min_max_event_dates"]["Returns"]

export const load = async ({ locals }: { locals: App.Locals }) => {

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
    filterOptions: {
      distinctTitles: getDistinctTitles(),
      distinctEventTypes: getDistinctEventTypes(), 
      distinctStates: getDistinctStates(),
      minMaxDates: getMinMaxDates(),
    }
  }
}
