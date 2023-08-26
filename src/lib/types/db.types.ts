import type { Database } from "./db"
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Functions<T extends keyof Database['public']['Functions']> = Database['public']['Functions'][T]['Returns']
// etc.
