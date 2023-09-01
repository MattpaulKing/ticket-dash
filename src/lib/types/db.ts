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
          eventDate: string
          eventId: number | null
          eventPopularity: number | null
          eventScore: number | null
          eventType: string
          highestPrice: number | null
          id: number
          listingCount: number | null
          lowestPrice: number | null
          medianPrice: number | null
          performerIds: number[] | null
          scrapeId: string
          state: string | null
          title: string
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
          eventDate: string
          eventId?: number | null
          eventPopularity?: number | null
          eventScore?: number | null
          eventType?: string
          highestPrice?: number | null
          id?: number
          listingCount?: number | null
          lowestPrice?: number | null
          medianPrice?: number | null
          performerIds?: number[] | null
          scrapeId: string
          state?: string | null
          title?: string
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
          eventDate?: string
          eventId?: number | null
          eventPopularity?: number | null
          eventScore?: number | null
          eventType?: string
          highestPrice?: number | null
          id?: number
          listingCount?: number | null
          lowestPrice?: number | null
          medianPrice?: number | null
          performerIds?: number[] | null
          scrapeId?: string
          state?: string | null
          title?: string
          venueCapacity?: number | null
          venueId?: number | null
          venueName?: string | null
          venuePopularity?: number | null
          venueScore?: number | null
          venueUpcomingEventCount?: number | null
        }
        Relationships: []
      }
      sgEventsPast: {
        Row: {
          announceDate: string | null
          averagePrice: number | null
          city: string | null
          country: string | null
          created_at: string | null
          eventDate: string
          eventId: number | null
          eventPopularity: number | null
          eventScore: number | null
          eventType: string
          highestPrice: number | null
          id: number
          listingCount: number | null
          lowestPrice: number | null
          medianPrice: number | null
          performerIds: number[] | null
          scrapeId: string
          state: string | null
          title: string
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
          eventDate: string
          eventId?: number | null
          eventPopularity?: number | null
          eventScore?: number | null
          eventType?: string
          highestPrice?: number | null
          id?: number
          listingCount?: number | null
          lowestPrice?: number | null
          medianPrice?: number | null
          performerIds?: number[] | null
          scrapeId: string
          state?: string | null
          title?: string
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
          eventDate?: string
          eventId?: number | null
          eventPopularity?: number | null
          eventScore?: number | null
          eventType?: string
          highestPrice?: number | null
          id?: number
          listingCount?: number | null
          lowestPrice?: number | null
          medianPrice?: number | null
          performerIds?: number[] | null
          scrapeId?: string
          state?: string | null
          title?: string
          venueCapacity?: number | null
          venueId?: number | null
          venueName?: string | null
          venuePopularity?: number | null
          venueScore?: number | null
          venueUpcomingEventCount?: number | null
        }
        Relationships: []
      }
      sgEventsUpcoming: {
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
          scrapeId: string | null
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
          scrapeId?: string | null
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
          scrapeId?: string | null
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
          scrapeId: string
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
          scrapeId: string
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
          scrapeId?: string
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
      upcomingWarehouse: {
        Row: {
          averagePrice: number | null
          created_at: string
          eventCount: number | null
          eventPopularity: number | null
          eventScore: number | null
          eventType: string
          highestPrice: number | null
          listingCount: number | null
          lowestPrice: number | null
        }
        Insert: {
          averagePrice?: number | null
          created_at: string
          eventCount?: number | null
          eventPopularity?: number | null
          eventScore?: number | null
          eventType: string
          highestPrice?: number | null
          listingCount?: number | null
          lowestPrice?: number | null
        }
        Update: {
          averagePrice?: number | null
          created_at?: string
          eventCount?: number | null
          eventPopularity?: number | null
          eventScore?: number | null
          eventType?: string
          highestPrice?: number | null
          listingCount?: number | null
          lowestPrice?: number | null
        }
        Relationships: []
      }
      Watchlist: {
        Row: {
          created_at: string | null
          eventId: number | null
          id: number
          sgEventsId: number
          userId: string
        }
        Insert: {
          created_at?: string | null
          eventId?: number | null
          id?: number
          sgEventsId: number
          userId: string
        }
        Update: {
          created_at?: string | null
          eventId?: number | null
          id?: number
          sgEventsId?: number
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Watchlist_sgEventsId_fkey"
            columns: ["sgEventsId"]
            referencedRelation: "sgEvents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Watchlist_userId_fkey"
            columns: ["userId"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
      distinct_titles: {
        Row: {
          title: string | null
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
        Args: {
          event_type_selected: string
        }
        Returns: {
          created_at: string
          eventType: string
          averagePrice: number
          highestPrice: number
          lowestPrice: number
          listingCount: number
          eventScore: number
          eventPopularity: number
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
          created_at: string
          eventType: string
          listingCount: number
          averagePrice: number
          highestPrice: number
          eventCount: number
          eventScore: number
          eventPopularity: number
        }[]
      }
      get_event_type_by_date: {
        Args: {
          event_type_selected: string
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
      get_event_type_by_day: {
        Args: {
          event_type_selected: string
        }
        Returns: {
          eventType: string
          created_at: string
          averagePrice: number
          lowestPrice: number
          highestPrice: number
          listingCount: number
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
          scrapeId: string
          upcomingEventCount: number | null
        }[]
      }
      get_events_by_type: {
        Args: {
          event_type_selected: string
        }
        Returns: {
          created_at: string
          eventId: number
          title: string
          eventType: string
          announceDate: string
          eventDate: string
          eventPopularity: number
          eventScore: number
          averagePrice: number
          medianPrice: number
          highestPrice: number
          lowestPrice: number
          state: string
          averagePriceLagOne: number
          averagePriceLagThree: number
          averagePriceLagSeven: number
          averagePriceLagMonth: number
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
      get_events_in_state_in_three_day_range: {
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
      get_latest_state_avgs: {
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
      get_min_max_event_dates: {
        Args: Record<PropertyKey, never>
        Returns: {
          min_date: string
          max_date: string
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
      get_state_avgs_by_day: {
        Args: {
          state_selected: string
        }
        Returns: {
          state: string
          created_at: string
          averagePrice: number
          lowestPrice: number
          highestPrice: number
          listingCount: number
        }[]
      }
      get_state_avgs_within_two_week_interval: {
        Args: {
          state_selected: string
          event_selected_date: string
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
      get_total_event_type_aggs: {
        Args: {
          event_type_selected: string
        }
        Returns: {
          eventType: string
          averagePrice: number
          eventCount: number
          highestPrice: number
          listingCount: number
          eventPopularity: number
          eventScore: number
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
          listingCount: number
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
          eventDate: string
          eventId: number | null
          eventPopularity: number | null
          eventScore: number | null
          eventType: string
          highestPrice: number | null
          id: number
          listingCount: number | null
          lowestPrice: number | null
          medianPrice: number | null
          performerIds: number[] | null
          scrapeId: string
          state: string | null
          title: string
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
          eventDate: string
          eventId: number | null
          eventPopularity: number | null
          eventScore: number | null
          eventType: string
          highestPrice: number | null
          id: number
          listingCount: number | null
          lowestPrice: number | null
          medianPrice: number | null
          performerIds: number[] | null
          scrapeId: string
          state: string | null
          title: string
          venueCapacity: number | null
          venueId: number | null
          venueName: string | null
          venuePopularity: number | null
          venueScore: number | null
          venueUpcomingEventCount: number | null
        }[]
      }
      just_announced_by_type: {
        Args: Record<PropertyKey, never>
        Returns: {
          created_at: string
          eventId: number
          eventType: string
          title: string
          announceDate: string
          eventDate: string
          listingCount: number
          averagePrice: number
          highestPrice: number
          eventScore: number
          eventPopularity: number
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
