import type { Functions } from "$lib/types/db.types";
import { writable, type Writable } from "svelte/store";

export const typeAggStore: Writable<Functions<"type_aggs_by_interval">> = writable([])
