import type { DbResult, DbResultErr, Functions } from "$lib/types/db.types";
import { transformDatasetData } from '$lib/components/charts/utils/transformations';
import { error, type Actions, fail } from "@sveltejs/kit";

export const actions = {

  add: async ({ request, locals }) => {
    const data = await request.formData()
    const session  = await locals.getSession()
    const { error: err } = await locals.supabase.from("Watchlist").insert({
      eventId: data.get('eventId'),
      dbId: data.get('dbId'),
      userId: session?.user.id
    })
    if (err) {
        console.log(err)
      return fail(400, {
        message: "Please try again."
      })
    }

    return { success: true }
  },

  remove: async ({ request, locals }) => {
    const data = await request.formData()
    const { error: err } = await locals.supabase.from("Watchlist")
      .delete()
      .eq('eventId', data.get("eventId"))

    if (err) {
      console.log(err)
      return fail(400, {
        message: "Please try again."
      })
    }

    return { success: true }
  },
} satisfies Actions




export const load = async ({ locals, setHeaders }: {locals: App.Locals, setHeaders: (headers: Record<string, string>) => void}) => {
  setHeaders({
     "cache-control": "max-age=360"
   })
    const { 
      data: totalEventTypeAggs,
      error: err
    }: { 
      data: Functions<'get_total_listing_by_type'>,
      error: DbResultErr
    } = await locals.supabase.rpc("get_total_listing_by_type") as DbResult<Functions<'get_total_listing_by_type'>>

    if (err) {
        throw error(500, err)
    }

    const splitMonthlyEventAggs = []
		const { data: monthlyEventAggs, error: err2 }: { data: Functions<"get_event_type_by_calendar_month">, error: DbResultErr } =
      await locals.supabase.rpc("get_event_type_by_calendar_month", {
          event_type_a: totalEventTypeAggs[0].eventType,
          event_type_b: totalEventTypeAggs[1].eventType,
          event_type_c: totalEventTypeAggs[2].eventType,
          event_type_d: totalEventTypeAggs[3].eventType,
        }) as DbResult<Functions<'get_event_type_by_calendar_month'>>
      if (err2) {
			  error(500, 'Error fetching monthly events');
		  }
		  for (let i = 0; i < 4; ++i) {
			  splitMonthlyEventAggs.push(
				  monthlyEventAggs.filter((agg) => agg.eventType === totalEventTypeAggs[i].eventType)
			  );
		  }
    const { data: justAnnouncedByType, error: justAnnouncedErr }: {data: Functions<"just_announced_by_type">, error: DbResultErr} = await locals.supabase.rpc("just_announced_by_type") as DbResult<Functions<"just_announced_by_type">>
    if (justAnnouncedErr) {
      throw error(500, "Error fetching recently announced events")
    }

    const justAnnouncedByTypeDetails = async (distinctJustAnnounced: Functions<"just_announced_by_type">): Promise<Functions<"just_announced_by_type">> => {
      const { data, error } =  await locals.supabase.rpc("just_announced_by_type_details")
      if (error) {
        console.log("Unable to find records for recent events")
      }
      return distinctJustAnnounced.map((distinctEvent) => ({
			...distinctEvent,
			chartData: {
				datasets: [
					{
						label: distinctEvent.title,
						data: transformDatasetData(
							data.filter((record: Functions<"just_announced_by_type">) => record.eventId === distinctEvent.eventId),
							{ x: 'created_at', y: 'averagePrice' }
						)
					}
				]
			}
		}))
    }

    return {
        totalEventTypeAggs,
        splitMonthlyEventAggs,
        justAnnouncedByType,
        streamed: {
          justAnnouncedByTypeDetails: justAnnouncedByTypeDetails(justAnnouncedByType),
        }
    }
};


