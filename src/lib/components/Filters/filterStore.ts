import { writable, derived } from "svelte/store";
import { parse } from "date-fns"
import type { Writable } from "svelte/store"
import type { Database } from "$lib/types/db"

type FilterValuesProp = never | string[]
type FilterValuesPropNullable = never | (string | null)[]
type FilteredRows = never | Database['public']['Tables']['sgEvents']['Row'][]

export const titleSearchStore: Writable<FilterValuesProp> = writable()
export const eventTypeStore: Writable<FilterValuesProp> = writable([]);
export const eventsRangeStore: Writable<[Date, Date]> = writable([
  new Date(2021, 1, 1),
  new Date(2029, 1, 1), 
])
export const stateStore: Writable<FilterValuesPropNullable> = writable([]);
export const eventStore: Writable<FilteredRows> = writable([]);


export const filterStore = derived(
		[titleSearchStore, eventTypeStore, eventsRangeStore, stateStore, eventStore],
		([$titleSearchStore, $eventTypeStore, $eventsRangeStore, $stateStore, $eventStore]) => {
			if ($eventStore) {
				return $eventStore.filter((event: Database['public']['Tables']['sgEvents']['Row']) => {
					$titleSearchStore.includes(event.title) &&
						$eventTypeStore.includes(event.eventType) &&
						$eventsRangeStore[0] <= parse(event.eventDate, 'yyyy-mm-dd', new Date()) &&
						$eventsRangeStore[1] >= parse(event.eventDate, 'yyyy-mm-dd', new Date()) &&
						$stateStore.includes(event.state);
				});
			}
		},
		eventStore
	)
