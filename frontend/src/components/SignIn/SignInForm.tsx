import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState, type JSX } from "react";
import z from "zod";
import { signIn } from "../../api/auth";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import type { signInRequest } from "../../types/auth";
import { Field } from "../Field";

const signInSchema = z.object({
    email: z.string().min(1, "the email field is required"),
    password: z.string().min(1, "the password field is required"),
});

type SignInFormValues = z.infer<typeof signInSchema>;

export function SignInForm(): JSX.Element {
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<SignInFormValues>({
        resolver: zodResolver(signInSchema),
    });

    const signInMutation = useMutation({
        mutationFn: signIn,
        onSuccess: async () => {
            reset();
        },
        onError: (err) => {
            if (
                err instanceof AxiosError &&
                (err.response?.status === 400 || err.response?.status === 401)
            ) {
                setError(err.response?.data);
                console.log(err.response?.data);
            } else {
                setError(
                    "An unexpected error occurred. Please try again later.",
                );
            }
        },
    });

    async function onSubmit(request: signInRequest) {
        signInMutation.mutate(request);
    }

    return (
        <main className="sign-form-container">
            <h1 className="text-preset-1" style={{ color: "var(--grey-900)" }}>
                Login
            </h1>
            <form className="sign-form" onSubmit={handleSubmit(onSubmit)}>
                <Field
                    title="Email"
                    type="email"
                    {...register("email")}
                    helperText={errors.email?.message}
                />
                <Field
                    title="Password"
                    type="password"
                    {...register("password")}
                    helperText={errors.password?.message}
                    iconAfter="./assets/images/icon-show-password.svg"
                />
                <input type="submit" value="Login" />
            </form>

            <div style={{ display: "flex" }}>
                <p
                    className="text-preset-4"
                    style={{ color: "var(--grey-500)" }}
                >
                    Need to create an account?
                </p>
                <p
                    className="text-preset-4-bold"
                    style={{
                        color: "var(--grey-900)",
                        textDecoration: "underline",
                    }}
                >
                    Sign Up
                </p>
            </div>
        </main>
    );
}
