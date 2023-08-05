export const load = async ({ locals }) => {


  const {data, error } = await locals.supabase.rpc("get_event_type_aggs")

  return {
    eventAggs: data
  }
};