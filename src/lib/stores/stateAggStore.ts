import { type Writable, writable } from "svelte/store";
import type { Functions } from "$lib/types/db.types"

export const stateAggStore: Writable<Functions<"state_aggs_by_interval">> = writable([])
