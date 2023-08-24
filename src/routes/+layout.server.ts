import type { LayoutServerLoad } from "./$types"
export const load: LayoutServerLoad  = async ({ locals }: { locals: App.Locals }) => {

  const { data: sessionData, error: sessionError } = await locals.supabase.auth.getSession()

  let { data: distinctEventTypes, error } = await locals.supabase.from("distinct_event_types").select()
  distinctEventTypes = distinctEventTypes.map( (obj: {eventType: string}) => obj.eventType)
  let { data: distinctStates, statesError } = await locals.supabase.from("distinct_states").select()
  distinctStates = distinctStates.map( (obj: {state: string}) => obj.state)

  return {
    distinctEventTypes,
    distinctStates,
    sessionData,
  }
}
