import { type Writable, writable } from "svelte/store";

export const distinctStates: Writable<string[]> = writable([])
