import { fail } from "@sveltejs/kit"

export const actions = {
  default: async ({ request, url, locals: { supabase } }) => {
    const formData = await request.formData()
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabase.auth.signInWithPassword({
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
  return {
    session 
  }
}
