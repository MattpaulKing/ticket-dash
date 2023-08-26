export const load = async ({ locals }: {locals: App.Locals}) => {
    const getAnnouncedLastThreeDays = async () => {
        return await locals.supabase.rpc("get_announced_last_three_days")
    }
    const { data, error } = await locals.supabase.from("sgEvents").select("eventId").gte("created_at", "2023-08-23") 

    return {
      data,
       streamed: {
            announcedLastThreeDays: getAnnouncedLastThreeDays(),
        }
    }
}
