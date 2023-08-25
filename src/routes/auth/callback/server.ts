import { redirect } from '@sveltejs/kit'

export const GET = async ({ url, locals }: {url: URL, locals: App.Locals} ) => {
  const code = url.searchParams.get('code')

  if (code) {
    await locals.supabase.auth.exchangeCodeForSession(code)
  }

  throw redirect(303, '/')
}
