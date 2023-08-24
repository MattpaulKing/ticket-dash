import type { TMonthlyAggType, TTotalAggType } from "$lib/types/MonthlyEventAggs";
import { error } from "@sveltejs/kit";

export const config = {
  runtime: 'edge',
};

export const load = async ({ locals }: { locals: App.Locals }) => {

    const { data: totalEventTypeAggs, error: totalEventTypeAggsError }: { data: TTotalAggType[], error: any } = await locals.supabase.rpc("get_total_listing_by_type")
    if (totalEventTypeAggsError) {
        console.log(totalEventTypeAggsError)
        throw error(500, totalEventTypeAggsError)
    }

    totalEventTypeAggs.sort((a: TTotalAggType, b: TTotalAggType) => b.rank - a.rank)
    const {data: monthlyEventTypeAggs, error: monthlyEventTypeAggsError }: {data: TMonthlyAggType, error: any } = await locals.supabase.rpc("get_event_type_by_calendar_month", {
            event_type_a: totalEventTypeAggs[0].eventType,
            event_type_b: totalEventTypeAggs[1].eventType,
            event_type_c: totalEventTypeAggs[2].eventType,
            event_type_d: totalEventTypeAggs[3].eventType,
        })

    const events = async () => {
        return await locals.supabase.rpc("get_event_type_table", { lim: 20, skip: 0 })
    }

    return {
        totalEventTypeAggs,
        monthlyEventTypeAggs,
        streamed: {
            events: events(),
        },
    }
};


