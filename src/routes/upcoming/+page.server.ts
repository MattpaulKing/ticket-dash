export const load = async ({ locals }: {locals: App.Locals}) => {
    const getAnnouncedLastThreeDays = async () => {
        return await locals.supabase.rpc("get_announced_last_three_days")
    }
    return {
       streamed: {
            announcedLastThreeDays: getAnnouncedLastThreeDays(),
        }
    }
}



