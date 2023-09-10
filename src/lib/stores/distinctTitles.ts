import { type Writable, writable } from "svelte/store";

export const distinctTitles: Writable<string[]> = writable([])
