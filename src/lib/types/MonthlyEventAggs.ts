
export type TTotalAggType = {
    eventType: string;
    totalListingCount: number;
    rank: number;
}

export type TMonthlyAggType = {
    calendarMonth: string | Date;
    eventType: string;
    listingCountSum: number;
    meanPrice: number;
    maxPrice: number;
    seriesRank: number;
    datasetRank: number;
}
