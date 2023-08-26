import type { Functions } from "$lib/types/db.types";
import { error as svelteError } from "@sveltejs/kit";

export const load = async ({ locals }: { locals: App.Locals }) => {

    const { 
      data: totalEventTypeAggs,
      error: totalEventTypeAggsError
    }: { 
      data: Functions<'get_total_listing_by_type'>, 
      error: any
    } = await locals.supabase.rpc("get_total_listing_by_type")
    
    if (totalEventTypeAggsError) {
        throw svelteError(500, totalEventTypeAggsError)
    }
    totalEventTypeAggs.sort((a, b) => b.rank - a.rank)

    const splitMonthlyEventAggs = []
		const { data: monthlyEventAggs, error } = await locals.supabase.rpc("get_event_type_by_calendar_month", {
          event_type_a: totalEventTypeAggs[0].eventType,
          event_type_b: totalEventTypeAggs[1].eventType,
          event_type_c: totalEventTypeAggs[2].eventType,
          event_type_d: totalEventTypeAggs[3].eventType,
        })
      if (error) {
			  svelteError(500, 'Error fetching monthly events');
		  }
		  for (let i = 0; i < 4; ++i) {
			  splitMonthlyEventAggs.push(
				  monthlyEventAggs.filter((agg) => agg.eventType === totalEventTypeAggs[i].eventType).sort((a, b) => {
						a.seriesRank - b.seriesRank;
					})
			  );
		  }
		  

    const events = async () => {
        return await locals.supabase.rpc("get_event_type_table", { lim: 20, skip: 0 })
    }

    return {
        totalEventTypeAggs,
        monthlyEventAggs,
        splitMonthlyEventAggs,
        streamed: {
            events: events(),
        },
    }
};


