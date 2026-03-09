'use server'

export async function verifyAdminPassword(input: string) {
  // To hasło musi być takie samo jak w panelu Vercel (ADMIN_PASSWORD)
  const correctPassword = process.env.ADMIN_PASSWORD;
  return input === correctPassword;
}