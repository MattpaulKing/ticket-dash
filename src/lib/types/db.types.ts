import type { Database } from "./db"
import type { PostgrestError } from '@supabase/supabase-js'
import type { ChartData } from "chart.js"
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Functions<T extends keyof Database['public']['Functions']> = Database['public']['Functions'][T]['Returns']
export type DbResult<T> = T extends PromiseLike<infer U> ? U : never
export type DbResultOk<T> = T extends PromiseLike<{ data: infer U }> ? Exclude<U, null> : never
export type DbResultErr = PostgrestError
export type DbAxisKeys = {
  x: 'created_at' | 'eventType' | 'eventDate' | 'announceDate' | 'state' | 'city' | 'title';
  y: 'averagePrice' | 'listingCount' | 'highestPrice' | 'lowestPrice' | 'eventScore' | 'eventPopularity';
}
export type DbRecordsWithChart<T> = {
  latest: T;
  records: T[];
  datasets: ChartData<'line', { x: string | null, y: number | null } []>;
}
export type DbFunctionWithChart<T extends Array<object>> = {
  latest: T[0];
  records: T;
  datasets: ChartData<'line', { x: string | null, y: number | null } []>['datasets'];
}
