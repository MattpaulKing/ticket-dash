import { writable } from "svelte/store";

export const filterStore = writable({
  created_at: null,
  eventId: null,
  title: null,
  eventType: null,
  announceDate: null,
  eventDate: null,
  eventPopularity: null,
  eventScore: null,
  averagePrice: null,
  medianPrice: null,
  highestPrice: null,
  lowestPrice: null,
  listingCount: null,
  venueId: null,
  venueName: null,
  country: null,
  state: null,
  city: null,
  venueScore: null,
  venueUpcomingEventCount: null,
  venuePopularity: null,
  venueCapacity: null
})
