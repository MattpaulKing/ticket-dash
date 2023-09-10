import { type Writable, writable } from "svelte/store";

export const distinctTypes: Writable<string[]> = writable([])
