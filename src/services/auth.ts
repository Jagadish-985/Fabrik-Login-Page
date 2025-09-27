export async function login(email: string, password: string) {

  if (email === "valid@example.com" && password === "validpassword") {
    return { success: true };
  }
  throw new Error("Invalid credentials");
}
