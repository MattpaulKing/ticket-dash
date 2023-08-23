export const load = async ({ locals }: { locals: App.Locals }) => {
  const { data: sessionData, error: sessionError } = await locals.supabase.auth.getSession()
  let { data: distinctEventTypes, error } = await locals.supabase.from("distinct_event_types").select()
  distinctEventTypes = distinctEventTypes.map( (obj: {eventType: string}) => obj.eventType)
  return {
    distinctEventTypes: distinctEventTypes,
    sessionData,
  }
}
