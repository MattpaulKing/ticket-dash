export const load = async ({ locals }: {locals: App.Locals}) => {
    const { data: sessionData, error: sessionError } = await locals.supabase.auth.getSession()
    return {
      sessionData
    }
  }