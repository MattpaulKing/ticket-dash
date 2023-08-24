import { distinct } from "@tidyjs/tidy"
import type { LayoutServerLoad } from "./$types"
export const load: LayoutServerLoad  = async ({ locals }: { locals: App.Locals }) => {

  //TODO
  // Error handling

  let { data: sessionData, error: sessionError } = await locals.supabase.auth.getSession()

  let {data: distinctTitles, error: errorTitles } = await locals.supabase.from("distinct_titles").select()
  distinctTitles = distinctTitles.map( (obj) => obj.title )
  
  let {data: distinctEventTypes, error: errorTypes } = await locals.supabase.from("distinct_event_types").select()
  distinctEventTypes = distinctEventTypes.map( (obj) => obj.eventType )

  let {data: distinctStates, error: errorStates } = await locals.supabase.from("distinct_states").select()
  distinctStates = distinctStates.map( (obj) => obj.state )
 
  let { data: minMaxDates, error: errorDates } = await locals.supabase.rpc("get_min_max_event_dates").limit(1).single()

  return {
    sessionData,
      distinctTitles,
      distinctEventTypes,
      distinctStates,
      minMaxDates,
  }
}
