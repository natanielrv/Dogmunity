// src/scripts/auth.ts
const API_URL = "http://localhost:3000/api";

export interface LoginResponse {
  user: {
    id: string;
    email: string;
    name: string;
    lastName: string;
  };
  access_token: string;
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const res = await fetch(`${API_URL}/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const errorBody = await res.json();
    const msg = Array.isArray(errorBody.message)
      ? errorBody.message.join(", ")
      : errorBody.message || "Error al iniciar sesión";
    throw new Error(msg);
  }

  return (await res.json()) as LoginResponse;
}
