export type IEvent = {
  id: number;
  created_at: Date;
  eventId: number;
  title: string;
  eventType: string;
  announceDate: Date;
  eventDate: Date;
  eventPopularity: number;
  eventScore: number;
  performerIds: number[];
  averagePrice: number;
  medianPrice: number;
  highestPrice: number;
  lowestPrice: number;
  listingCount: number;
  venueId: number;
  scrapeId: string;
  venueName: string;
  country: string;
  state: string;
  city: string;
  venueScore: number;
  venueUpcomingEventCount: number;
  venuePopularity: number;
  venueCapacity: number;
}
