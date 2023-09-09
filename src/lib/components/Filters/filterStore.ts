import type { Tables } from "$lib/types/db.types";
import { writable, derived } from "svelte/store";
import type { Writable } from "svelte/store"

//TODO: rather than have enums for type of filter add a callback that forwards the values to the appropriate function

export const titleStore: Writable<string[]> = writable([])
export const eventTypeStore: Writable<string[]> = writable([]);

// Better to store the dates as strings because store receives dates from input
// input has to be type string
// DB also expects strings
export const eventsRangeStore: Writable<[string, string]> = writable([
  new Date().toISOString(),
  new Date(2029, 1, 1).toISOString(), 
])
export const stateStore: Writable<string[]> = writable([]);
export const eventStore: Writable<string[]> = writable([]);

export type Filter = {
  type: 'lte' | 'gte' | 'in',
  value: string | string[] | [string, string] 
}
export type Filters = Partial<Record<keyof Tables<"sgEvents">, Filter>>

export const filterStore = derived<[
  typeof titleStore, 
  typeof eventTypeStore, 
  typeof eventsRangeStore, 
  typeof stateStore
], Filters>(
		[titleStore, eventTypeStore, eventsRangeStore, stateStore],
		([$titleSearchStore, $eventTypeStore, $eventsRangeStore, $stateStore]) => {
      const filters: Filters = {}
      if ($titleSearchStore.length) {
        filters.title = {
          type: 'in', 
          value: $titleSearchStore
        }
      }
      if ($eventTypeStore.length) {
        filters.eventType = {
          type: 'in',
          value: $eventTypeStore
        }
      }
      if ($eventsRangeStore[0].length) {
        filters.eventDate = {
          type: 'gte',
          value: $eventsRangeStore[0]
        }
      } //BUG: add conditional logic for if one or both date ranges are set
      if ($eventsRangeStore[1].length) {
        filters.eventDate[1] = {
          type: 'lte',
          value: $eventsRangeStore[1]
        }
      }
      if ($stateStore.length) {
        filters.state = {
          type: 'in',
          value: $stateStore
        }
      }
      return filters
		},
	)
