import { type Writable, writable } from "svelte/store";

export const watchlistStore: Writable<number[]> = writable([])
