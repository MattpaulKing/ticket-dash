import { writable, type Writable } from 'svelte/store';

export const chartColors: Writable<string[]> = writable([])