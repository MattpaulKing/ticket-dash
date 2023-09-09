import { error } from "@sveltejs/kit"

export const load = async ({ locals, setHeaders }: {locals: App.Locals, setHeaders: (headers: Record<string, string>) => void}) => {
  setHeaders({
     "cache-control": "max-age=360"
   })
    const getAnnouncedLastThreeDays = async () => {
        return await locals.supabase.rpc("get_announced_last_three_days")
    }

    const { data: lastWeekEvents, error: lastWeekErr } = await locals.supabase.rpc("get_announced_last_week")
    if (lastWeekErr) {
      throw error(500, "Error loading last week's events. Please try again")
    }

    //TODO: Clean up this code to do a query for announced lately and the state / eventType aggregates
    //Stream in the aggregates afterwards
    //
    return {
      lastWeekEvents,
       streamed: {
            announcedLastThreeDays: getAnnouncedLastThreeDays(),
        }
    }
}



