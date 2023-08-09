import { error } from "@sveltejs/kit";

export const load = async ({ locals }) => {

  const { data: totalEventTypeAggs, error: totalEventTypeAggsError } = await locals.supabase.rpc("get_total_listing_by_type")

  if (totalEventTypeAggsError) {
    console.log(totalEventTypeAggsError)
    throw error(500, totalEventTypeAggsError)
  }
  totalEventTypeAggs.sort((a, b) => b.rank - a.rank)
  const { data: monthlyEventTypeAggs, error: monthlyEventTypeAggsError } = await locals.supabase.rpc("get_event_type_by_calendar_month", {
    event_type_a: totalEventTypeAggs[0].eventType,
    event_type_b: totalEventTypeAggs[1].eventType,
    event_type_c: totalEventTypeAggs[2].eventType,
    event_type_d: totalEventTypeAggs[3].eventType,
  })

  return {
    monthlyEventTypeAggs,
    totalEventTypeAggs
  }
};
