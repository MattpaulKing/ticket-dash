// src/hooks.server.ts
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit'
//  import { redirect } from '@sveltejs/kit'
import type { Handle } from '@sveltejs/kit'
import type { Database } from './schema'

export const handle: Handle = async ({ event, resolve }) => {

  event.locals.supabase = createSupabaseServerClient<Database>({
    supabaseUrl: PUBLIC_SUPABASE_URL,
    supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
    event,
  })

  event.locals.getSession = async () => {
    const {
      data: { session },
    } = await event.locals.supabase.auth.getSession()
    return session
  }

  event.locals.getUser = async () => {
    const {
      data: { user }
     } = await event.locals.supabase.auth.getUser()
    return user
  }

  if (event.url.pathname !== "/") {
    /*
    let user = await event.locals.getUser()
    if (!user) {
      throw redirect(302, `/?pathAttempted=${event.url.pathname.slice(1)}`)
    }
    */
  }

  return resolve(event, {
    filterSerializedResponseHeaders(name): boolean {
      return name === 'content-range'
    },
  })
}