export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      local_services: {
        Row: {
          address: string | null
          created_at: string | null
          description: string | null
          id: number
          lat: number | null
          lon: number | null
          service_type: string | null
          title: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          lat?: number | null
          lon?: number | null
          service_type?: string | null
          title?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          lat?: number | null
          lon?: number | null
          service_type?: string | null
          title?: string | null
        }
        Relationships: []
      }
      sgEvents: {
        Row: {
          announceDate: string | null
          averagePrice: number | null
          city: string | null
          country: string | null
          created_at: string | null
          eventDate: string | null
          eventId: number | null
          eventPopularity: number | null
          eventScore: number | null
          eventType: string | null
          highestPrice: number | null
          id: number
          listingCount: number | null
          lowestPrice: number | null
          medianPrice: number | null
          performerIds: number[] | null
          scrapeId: string
          state: string | null
          title: string | null
          venueCapacity: number | null
          venueId: number | null
          venueName: string | null
          venuePopularity: number | null
          venueScore: number | null
          venueUpcomingEventCount: number | null
        }
        Insert: {
          announceDate?: string | null
          averagePrice?: number | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          eventDate?: string | null
          eventId?: number | null
          eventPopularity?: number | null
          eventScore?: number | null
          eventType?: string | null
          highestPrice?: number | null
          id?: number
          listingCount?: number | null
          lowestPrice?: number | null
          medianPrice?: number | null
          performerIds?: number[] | null
          scrapeId: string
          state?: string | null
          title?: string | null
          venueCapacity?: number | null
          venueId?: number | null
          venueName?: string | null
          venuePopularity?: number | null
          venueScore?: number | null
          venueUpcomingEventCount?: number | null
        }
        Update: {
          announceDate?: string | null
          averagePrice?: number | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          eventDate?: string | null
          eventId?: number | null
          eventPopularity?: number | null
          eventScore?: number | null
          eventType?: string | null
          highestPrice?: number | null
          id?: number
          listingCount?: number | null
          lowestPrice?: number | null
          medianPrice?: number | null
          performerIds?: number[] | null
          scrapeId?: string
          state?: string | null
          title?: string | null
          venueCapacity?: number | null
          venueId?: number | null
          venueName?: string | null
          venuePopularity?: number | null
          venueScore?: number | null
          venueUpcomingEventCount?: number | null
        }
        Relationships: []
      }
      sgEventsDB: {
        Row: {
          announceDate: string | null
          averagePrice: number | null
          created_at: string | null
          description: string | null
          eventDate: string | null
          eventScore: number | null
          eventType: string | null
          highestPrice: number | null
          id: number
          listingCount: number | null
          lowestPrice: number | null
          lowestSgPrice: number | null
          medianPrice: number | null
          performerId: number | null
          popularity: number | null
          sgEventId: number | null
          title: string | null
          venueId: number | null
          venueName: string | null
          venueState: string | null
        }
        Insert: {
          announceDate?: string | null
          averagePrice?: number | null
          created_at?: string | null
          description?: string | null
          eventDate?: string | null
          eventScore?: number | null
          eventType?: string | null
          highestPrice?: number | null
          id?: number
          listingCount?: number | null
          lowestPrice?: number | null
          lowestSgPrice?: number | null
          medianPrice?: number | null
          performerId?: number | null
          popularity?: number | null
          sgEventId?: number | null
          title?: string | null
          venueId?: number | null
          venueName?: string | null
          venueState?: string | null
        }
        Update: {
          announceDate?: string | null
          averagePrice?: number | null
          created_at?: string | null
          description?: string | null
          eventDate?: string | null
          eventScore?: number | null
          eventType?: string | null
          highestPrice?: number | null
          id?: number
          listingCount?: number | null
          lowestPrice?: number | null
          lowestSgPrice?: number | null
          medianPrice?: number | null
          performerId?: number | null
          popularity?: number | null
          sgEventId?: number | null
          title?: string | null
          venueId?: number | null
          venueName?: string | null
          venueState?: string | null
        }
        Relationships: []
      }
      sgPerformer: {
        Row: {
          created_at: string | null
          eventDate: string | null
          genre: string | null
          hasUpcomingEvents: boolean
          id: number
          performerId: number | null
          performerName: string | null
          performerScore: number | null
          performerType: string | null
          scrapeId: string | null
          upcomingEventCount: number | null
        }
        Insert: {
          created_at?: string | null
          eventDate?: string | null
          genre?: string | null
          hasUpcomingEvents: boolean
          id?: number
          performerId?: number | null
          performerName?: string | null
          performerScore?: number | null
          performerType?: string | null
          scrapeId?: string | null
          upcomingEventCount?: number | null
        }
        Update: {
          created_at?: string | null
          eventDate?: string | null
          genre?: string | null
          hasUpcomingEvents?: boolean
          id?: number
          performerId?: number | null
          performerName?: string | null
          performerScore?: number | null
          performerType?: string | null
          scrapeId?: string | null
          upcomingEventCount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "sgPerformer_scrapeId_fkey"
            columns: ["scrapeId"]
            referencedRelation: "sgEvents"
            referencedColumns: ["scrapeId"]
          }
        ]
      }
      sgPerformerDB: {
        Row: {
          created_at: string | null
          hasUpcomingEvents: boolean | null
          id: number
          name: string | null
          performerId: number | null
          performerScore: number | null
          type: string | null
          upcomingEventCount: number | null
        }
        Insert: {
          created_at?: string | null
          hasUpcomingEvents?: boolean | null
          id?: number
          name?: string | null
          performerId?: number | null
          performerScore?: number | null
          type?: string | null
          upcomingEventCount?: number | null
        }
        Update: {
          created_at?: string | null
          hasUpcomingEvents?: boolean | null
          id?: number
          name?: string | null
          performerId?: number | null
          performerScore?: number | null
          type?: string | null
          upcomingEventCount?: number | null
        }
        Relationships: []
      }
      StateAggregates: {
        Row: {
          averagePriceAmax: number | null
          averagePriceAmin: number | null
          averagePriceMean: number | null
          averagePriceMedian: number | null
          country: string | null
          created_at: string | null
          eventPopularityAmax: number | null
          eventPopularityAmin: number | null
          eventPopularityMean: number | null
          eventPopularityMedian: number | null
          eventScoreAmax: number | null
          eventScoreAmin: number | null
          eventScoreMean: number | null
          eventScoreMedian: number | null
          highestPriceAmax: number | null
          highestPriceAmin: number | null
          highestPriceMean: number | null
          highestPriceMedian: number | null
          id: number
          lowestPriceAmax: number | null
          lowestPriceAmin: number | null
          lowestPriceMean: number | null
          lowestPriceMedian: number | null
          medianPriceAmax: number | null
          medianPriceAmin: number | null
          medianPriceMean: number | null
          medianPriceMedian: number | null
          scrapeDate: string | null
          state: string | null
          venueScoreAmax: number | null
          venueScoreAmin: number | null
          venueScoreMean: number | null
          venueScoreMedian: number | null
          venueUpcomingEventCountsum: number | null
        }
        Insert: {
          averagePriceAmax?: number | null
          averagePriceAmin?: number | null
          averagePriceMean?: number | null
          averagePriceMedian?: number | null
          country?: string | null
          created_at?: string | null
          eventPopularityAmax?: number | null
          eventPopularityAmin?: number | null
          eventPopularityMean?: number | null
          eventPopularityMedian?: number | null
          eventScoreAmax?: number | null
          eventScoreAmin?: number | null
          eventScoreMean?: number | null
          eventScoreMedian?: number | null
          highestPriceAmax?: number | null
          highestPriceAmin?: number | null
          highestPriceMean?: number | null
          highestPriceMedian?: number | null
          id?: number
          lowestPriceAmax?: number | null
          lowestPriceAmin?: number | null
          lowestPriceMean?: number | null
          lowestPriceMedian?: number | null
          medianPriceAmax?: number | null
          medianPriceAmin?: number | null
          medianPriceMean?: number | null
          medianPriceMedian?: number | null
          scrapeDate?: string | null
          state?: string | null
          venueScoreAmax?: number | null
          venueScoreAmin?: number | null
          venueScoreMean?: number | null
          venueScoreMedian?: number | null
          venueUpcomingEventCountsum?: number | null
        }
        Update: {
          averagePriceAmax?: number | null
          averagePriceAmin?: number | null
          averagePriceMean?: number | null
          averagePriceMedian?: number | null
          country?: string | null
          created_at?: string | null
          eventPopularityAmax?: number | null
          eventPopularityAmin?: number | null
          eventPopularityMean?: number | null
          eventPopularityMedian?: number | null
          eventScoreAmax?: number | null
          eventScoreAmin?: number | null
          eventScoreMean?: number | null
          eventScoreMedian?: number | null
          highestPriceAmax?: number | null
          highestPriceAmin?: number | null
          highestPriceMean?: number | null
          highestPriceMedian?: number | null
          id?: number
          lowestPriceAmax?: number | null
          lowestPriceAmin?: number | null
          lowestPriceMean?: number | null
          lowestPriceMedian?: number | null
          medianPriceAmax?: number | null
          medianPriceAmin?: number | null
          medianPriceMean?: number | null
          medianPriceMedian?: number | null
          scrapeDate?: string | null
          state?: string | null
          venueScoreAmax?: number | null
          venueScoreAmin?: number | null
          venueScoreMean?: number | null
          venueScoreMedian?: number | null
          venueUpcomingEventCountsum?: number | null
        }
        Relationships: []
      }
      Watchlist: {
        Row: {
          created_at: string | null
          id: number
          sgEventId: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          sgEventId?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number
          sgEventId?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      distinct_event_types: {
        Row: {
          eventType: string | null
        }
        Relationships: []
      }
      distinct_states: {
        Row: {
          state: string | null
        }
        Relationships: []
      }
      eventgenreaverage: {
        Row: {
          average_score: number | null
          eventId: number | null
          genre: string | null
        }
        Relationships: []
      }
      performergenrescores: {
        Row: {
          eventId: number | null
          genre: string | null
          performerScore: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_announced_last_three_days: {
        Args: Record<PropertyKey, never>
        Returns: {
          created_at: string
          eventId: number
          title: string
          eventType: string
          announceDate: string
          eventDate: string
          eventMonth: string
          eventPopularity: number
          eventScore: number
          averagePrice: number
          medianPrice: number
          highestPrice: number
          lowestPrice: number
          listingCount: number
          state: string
          city: string
          venueCapacity: string
          comparisonAveragePrice: number
          comparisonHighestPrice: number
          comparisonListingCount: number
          comparisonScore: number
          comparisonPopularity: number
        }[]
      }
      get_announced_this_week: {
        Args: Record<PropertyKey, never>
        Returns: {
          announceDate: string
          count: number
        }[]
      }
      get_announced_today: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      get_biggest_events_median_prices: {
        Args: {
          selected_event: number
        }
        Returns: {
          eventId: number
          medianPrice: number
          created_at: string
        }[]
      }
      get_event_aggs: {
        Args: Record<PropertyKey, never>
        Returns: {
          eventDate: string
          eventType: string
          eventCount: number
          avgPrice: number
          maxPrice: number
        }[]
      }
      get_event_type_aggs: {
        Args: Record<PropertyKey, never>
        Returns: {
          eventDate: string
          eventType: string
          eventCount: number
          avgPrice: number
          maxPrice: number
        }[]
      }
      get_event_type_by_calendar_month: {
        Args: {
          event_type_a: string
          event_type_b: string
          event_type_c: string
          event_type_d: string
        }
        Returns: {
          calendarMonth: string
          eventType: string
          listingCountSum: number
          meanPrice: number
          maxPrice: number
          seriesRank: number
          datasetRank: number
        }[]
      }
      get_event_type_by_date: {
        Args: {
          event_type_a: string
        }
        Returns: {
          created_at: string
          eventType: string
          listingCount: number
          averagePrice: number
          highestPrice: number
          lowestPrice: number
        }[]
      }
      get_event_type_comparison_for_announced_lately: {
        Args: {
          event_date: string
          event_type: string
        }
        Returns: {
          eventMonth: string
          eventType: string
          listingCount: number
          averagePrice: number
          highestPrice: number
        }[]
      }
      get_event_type_table:
        | {
            Args: {
              lim: number
              skip: number
            }
            Returns: {
              title: string
              eventId: number
              eventType: string
              averagePrice: number
              created_at: string
              announceDate: string
              eventDate: string
              eventPopularity: number
              eventScore: number
            }[]
          }
        | {
            Args: Record<PropertyKey, never>
            Returns: {
              title: string
              eventType: string
              averagePrice: number
              created_at: string
              announceDate: string
              eventDate: string
              eventPopularity: number
              eventScore: number
            }[]
          }
      get_events_and_performers: {
        Args: Record<PropertyKey, never>
        Returns: {
          created_at: string | null
          eventDate: string | null
          genre: string | null
          hasUpcomingEvents: boolean
          id: number
          performerId: number | null
          performerName: string | null
          performerScore: number | null
          performerType: string | null
          scrapeId: string | null
          upcomingEventCount: number | null
        }[]
      }
      get_events_in_state_in_date_range: {
        Args: {
          event_date: string
          event_state: string
        }
        Returns: {
          created_at: string
          eventId: number
          title: string
          eventType: string
          eventDate: string
          eventPopularity: number
          eventScore: number
          averagePrice: number
          medianPrice: number
          highestPrice: number
          lowestPrice: number
          announceDate: string
        }[]
      }
      get_genre_averages: {
        Args: Record<PropertyKey, never>
        Returns: {
          average_score: number | null
          eventId: number | null
          genre: string | null
        }[]
      }
      get_genre_median_prices_by_date: {
        Args: Record<PropertyKey, never>
        Returns: {
          avgMedianPrice: number
          genre: string
          eventDate: string
          lastMedianPrice: number
        }[]
      }
      get_price_diff_from_last_week: {
        Args: Record<PropertyKey, never>
        Returns: {
          title: string
          eventId: number
          medianPrice: number
          created_at: string
          eventDate: string
          lastMedianPrice: number
          diffFromYesterday: number
        }[]
      }
      get_price_diff_from_yesterday: {
        Args: Record<PropertyKey, never>
        Returns: {
          title: string
          eventId: number
          medianPrice: number
          created_at: string
          eventDate: string
          lastMedianPrice: number
          diffFromYesterday: number
        }[]
      }
      get_scraped_today: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      get_single_state_avgs_within_two_week_interval: {
        Args: {
          state_selected: string
        }
        Returns: {
          state: string
          averagePrice: number
          lowestPrice: number
          highestPrice: number
          averagePopularity: number
          averageScore: number
          eventCount: number
          listingCount: number
        }[]
      }
      get_state_agg_and_lag: {
        Args: Record<PropertyKey, never>
        Returns: {
          lastMedianPrice: number
          avgMedianPrice: number
          averagePrice: number
          averageEventScore: number
          state: string
          created_at: string
          diff: number
        }[]
      }
      get_state_avgs_within_two_week_interval: {
        Args: {
          state_selected: string
        }
        Returns: {
          state: string
          eventDate: string
          averagePrice: number
          lowestPrice: number
          highestPrice: number
          averagePopularity: number
          averageScore: number
          eventCount: number
          listingCount: number
        }[]
      }
      get_this_week_scrapes: {
        Args: Record<PropertyKey, never>
        Returns: {
          created_at: string
          count: number
        }[]
      }
      get_this_weeks_events_count: {
        Args: Record<PropertyKey, never>
        Returns: {
          eventDate: string
          count: number
        }[]
      }
      get_today_performertype_median_price: {
        Args: Record<PropertyKey, never>
        Returns: {
          performerType: string
          avgMedianPrice: number
          created_at: string
        }[]
      }
      get_total_listing_by_event_type: {
        Args: Record<PropertyKey, never>
        Returns: {
          eventType: string
          totalListingCount: number
          rank: number
        }[]
      }
      get_total_listing_by_type: {
        Args: Record<PropertyKey, never>
        Returns: {
          eventType: string
          totalListingCount: number
          rank: number
        }[]
      }
      get_types:
        | {
            Args: Record<PropertyKey, never>
            Returns: {
              column_name: string
              data_type: string
            }[]
          }
        | {
            Args: {
              tname: string
            }
            Returns: {
              column_name: string
              data_type: string
            }[]
          }
      get_types_events: {
        Args: Record<PropertyKey, never>
        Returns: {
          column_name: string
          data_type: string
        }[]
      }
      get_types_performers: {
        Args: Record<PropertyKey, never>
        Returns: {
          column_name: string
          data_type: string
        }[]
      }
      getgenreaverages: {
        Args: Record<PropertyKey, never>
        Returns: {
          average_score: number | null
          eventId: number | null
          genre: string | null
        }[]
      }
      getperformerscores: {
        Args: Record<PropertyKey, never>
        Returns: {
          eventId: number | null
          genre: string | null
          performerScore: number | null
        }[]
      }
      getyesterday: {
        Args: Record<PropertyKey, never>
        Returns: {
          announceDate: string | null
          averagePrice: number | null
          city: string | null
          country: string | null
          created_at: string | null
          eventDate: string | null
          eventId: number | null
          eventPopularity: number | null
          eventScore: number | null
          eventType: string | null
          highestPrice: number | null
          id: number
          listingCount: number | null
          lowestPrice: number | null
          medianPrice: number | null
          performerIds: number[] | null
          scrapeId: string
          state: string | null
          title: string | null
          venueCapacity: number | null
          venueId: number | null
          venueName: string | null
          venuePopularity: number | null
          venueScore: number | null
          venueUpcomingEventCount: number | null
        }[]
      }
      getyesterdayscrape: {
        Args: Record<PropertyKey, never>
        Returns: {
          announceDate: string | null
          averagePrice: number | null
          city: string | null
          country: string | null
          created_at: string | null
          eventDate: string | null
          eventId: number | null
          eventPopularity: number | null
          eventScore: number | null
          eventType: string | null
          highestPrice: number | null
          id: number
          listingCount: number | null
          lowestPrice: number | null
          medianPrice: number | null
          performerIds: number[] | null
          scrapeId: string
          state: string | null
          title: string | null
          venueCapacity: number | null
          venueId: number | null
          venueName: string | null
          venuePopularity: number | null
          venueScore: number | null
          venueUpcomingEventCount: number | null
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
