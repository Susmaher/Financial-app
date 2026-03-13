import type { signInRequest, signUpRequest } from "../types/auth";
import api from "./api";

export async function signUp(request: signUpRequest) {
    const response = await api.post("/register", request);
    return response.data;
}

export async function signIn(request: signInRequest) {
    const response = await api.post("/login", request);
    return response.data;
}

export async function signOut() {
    await api.post("/logout");
}
