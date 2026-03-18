import type { signInRequest } from "../types/auth";
import type { createTransactionRequest } from "../types/transactions";
import api from "./api";

export async function createTransaction(request: createTransactionRequest) {
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
