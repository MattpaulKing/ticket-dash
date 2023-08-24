import { SupabaseClient, Session } from '@supabase/supabase-js'
import { Database } from "$lib/types/types" 

declare namespace App {
	interface Locals {
		supabase: SupabaseClient<Database>
		getSession(): Promise<Session | null>
		getUser(): Promise<User | null>
		pathname: string
	  }
	  interface PageData {
		session: Session | null
		user: User | null
	  }
	// interface Error {}
	// interface Platform {}
}
