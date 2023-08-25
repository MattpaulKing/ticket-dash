export const load = async ({ locals: { getSession } }) => {
// src/routes/+layout.server.ts
  return {
    session: await getSession(),
  }
}
