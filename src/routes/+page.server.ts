import type { DbResult, DbResultErr, DbResultOk, Functions, Tables } from "$lib/types/db.types";

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
    console.log(data)
    if (err) {
      console.log(err)
      return fail(400, {
        message: "Please try again."
      })
    }

    return { success: true }
  },

  remove: async ({ request, params, locals }) => {
    //TODO: FIX
    const data = await request.formData()
    const { error: err } = await locals.supabase.from("Watchlist")
      .delete()
      .eq('eventId', params.eventId)
      .eq('sgEventsUpcomingId', data.get('sgEventsId'))

    if (err) {
      return fail(400, {
        message: "Please try again."
      })
    }

    return { success: true }
  },
} satisfies Actions




export const load = async ({ locals }: { locals: App.Locals }) => {

    const { 
      data: totalEventTypeAggs,
      error: err
    }: { 
      data: Functions<'get_total_listing_by_type'>,
      error: DbResultErr
    } = await locals.supabase.rpc("get_total_listing_by_type")
    
    if (err) {
        throw error(500, err)
    }

    const splitMonthlyEventAggs = []
		const { data: monthlyEventAggs, error: err2 }: { data: Functions<"get_event_type_by_calendar_month"> } =
      await locals.supabase.rpc("get_event_type_by_calendar_month", {
          event_type_a: totalEventTypeAggs[0].eventType,
          event_type_b: totalEventTypeAggs[1].eventType,
          event_type_c: totalEventTypeAggs[2].eventType,
          event_type_d: totalEventTypeAggs[3].eventType,
        })
      if (err2) {
			  error(500, 'Error fetching monthly events');
		  }
		  for (let i = 0; i < 4; ++i) {
			  splitMonthlyEventAggs.push(
				  monthlyEventAggs.filter((agg) => agg.eventType === totalEventTypeAggs[i].eventType)
			  );
		  }
    const justAnnouncedByType = async ()  => {
      return await locals.supabase.rpc("just_announced_by_type") as DbResult<Functions<"just_announced_by_type">>
    }

    return {
        totalEventTypeAggs,
        splitMonthlyEventAggs,
        streamed: {
          justAnnouncedByType: justAnnouncedByType(),
        }
    }
};


