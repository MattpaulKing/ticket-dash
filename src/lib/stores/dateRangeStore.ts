import { writable, type Writable } from "svelte/store";

export const dateRangeStore: Writable<Date[]> = writable([new Date('2001-01-01'), new Date('2100-01-01')])
