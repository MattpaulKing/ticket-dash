export const load = async ({ locals }: { locals: App.Locals }) => {
  const { data: sessionData, error: sessionError } = await locals.supabase.auth.getSession()
  const { data, error } = await locals.supabase.from("sgEvents").select("*").gt("created_at", "2023-08-01")

  return {
    sessionData,
  }
}
