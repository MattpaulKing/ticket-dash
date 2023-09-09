import type { Filters } from "$lib/components/Filters/filterStore";
import type { Tables } from "$lib/types/db.types";

export const filterDataset = (filterStore: Filters, records: Partial<Tables<"sgEvents">>[]) => {
  if (filterStore.eventType) {
    records = records.filter( (record) => filterStore.eventType?.value.includes(record.eventType))
  }
  if (filterStore.title) {
    records = records.filter( (record) => filterStore.title?.value.includes(record.title))
  }
  return records
}
