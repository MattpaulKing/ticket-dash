export const load = async ({ locals }: {locals: App.Locals}) => {
    const getAnnouncedLastThreeDays = async () => {
        return await locals.supabase.rpc("get_announced_last_three_days")
    }

    //TODO: Clean up this code to do a query for announced lately and the state / eventType aggregates
    //Stream in the aggregates afterwards
    //
    return {
       streamed: {
            announcedLastThreeDays: getAnnouncedLastThreeDays(),
        }
    }
}



