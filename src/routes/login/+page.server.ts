import { fail, redirect } from "@sveltejs/kit"

export const actions = {
  default: async ({ request, locals }: { request: Request, locals: App.Locals }) => {
    const formData = await request.formData()
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await locals.supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return fail(500, { message: 'Server error. Try again later.', success: false, email })
    }
    return {
      message: 'logged in',
      success: true,
    }
  },
}

export const load = async ({ locals }: {locals: App.Locals }) => {
  const session = await locals.getSession()
  if (session?.expires_at) {
    console.log(session?.expires_at)
    throw redirect(300, "/")
  }
  return {
    session 
  }
}
