import { redirect } from "@sveltejs/kit"

export const checkCookies = async (cookies, supabase: App.Locals["supabase"], route ) => {
  const refreshToken = cookies.get('my-refresh-token')
  const accessToken = cookies.get('my-access-token')

  if (refreshToken && accessToken) {
    await supabase.auth.setSession({
      refresh_token: refreshToken,
      access_token: accessToken,
      auth: { persistSession: false },
    })
  } else {
      // redirect to login if no tokens 
    if (route !== '/login') {
      throw redirect(300, "/login")
    }
  }
}

