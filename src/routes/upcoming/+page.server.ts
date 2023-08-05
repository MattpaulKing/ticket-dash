import { format } from 'date-fns';

export const load = async ({ locals }) => {

    const startRange = format(new Date(), 'yyyy-MM-dd')
    const { data: closestEvents, error: closestEventsError } = await locals.supabase.from('sgEvents').select("*").gte('eventDate', startRange).order('eventDate', {ascending: true}).limit(5000)
    const { data: priceDiffs, error: priceDiffError } = await locals.supabase.rpc("get_price_diff_from_yesterday")
    const { data: priceDiffsLastWeek, error: priceDiffLastWeekError } = await locals.supabase.rpc("get_price_diff_from_last_week")
    const { data: genreMedianPrices, error: genreMedianPricesError } = await locals.supabase.rpc("get_genre_median_prices_by_date")

    return {
        closestEvents,
        priceDiffs,
        priceDiffsLastWeek,
        genreMedianPrices,
    }
};