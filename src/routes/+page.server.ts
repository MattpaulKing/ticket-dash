import type { TMonthlyAggType, TTotalAggType } from "$lib/types/MonthlyEventAggs";
import { error } from "@sveltejs/kit";

export const config = {
  runtime: 'nodejs18.x',
};

export const load = async ({ locals }: { locals: App.Locals }) => {

    const { data: totalEventTypeAggs, error: totalEventTypeAggsError }: { data: TTotalAggType[], error: any } = await locals.supabase.rpc("get_total_listing_by_type")
    if (totalEventTypeAggsError) {
        console.log(totalEventTypeAggsError)
        throw error(500, totalEventTypeAggsError)
    }

    totalEventTypeAggs.sort((a: TTotalAggType, b: TTotalAggType) => b.rank - a.rank)

    const monthlyEventTypeAggs = async () => {
      random_bytes(1024)
      return await locals.supabase.rpc("get_event_type_by_calendar_month", {
        event_type_a: totalEventTypeAggs[0].eventType,
        event_type_b: totalEventTypeAggs[1].eventType,
        event_type_c: totalEventTypeAggs[2].eventType,
        event_type_d: totalEventTypeAggs[3].eventType,
      })
    }

    const events = async () => {
        return await locals.supabase.rpc("get_event_type_table", { lim: 20, skip: 0 })
    }

    const { data, error } = await locals.supabase.from("sgEvents").select("eventId").gte("created_at", "2023-08-23") 

    return {
        data,
        totalEventTypeAggs,
        streamed: {
            events: events(),
            monthlyEventTypeAggs: monthlyEventTypeAggs(), 
        },
    }
};


