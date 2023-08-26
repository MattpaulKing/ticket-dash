import { redirect } from "@sveltejs/kit"

export const load = async ({ locals, cookies }: { locals: App.Locals }) => {
  await locals.supabase.auth.signOut()
  
  throw redirect(300, "/login")
}
