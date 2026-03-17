import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState, type JSX } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { signUp } from "../../api/auth";
import { AxiosError } from "axios";
import { Field } from "../FormComponents/Field";
import type { signUpRequest } from "../../types/auth";
import { ErrorMessage } from "../FormComponents/ErrorMessage";

const signUpSchema = z.object({
    name: z.string().min(1, "the name field is required"),
    email: z.string().min(1, "the email field is required"),
    password: z.string().min(1, "the password field is required"),
});

type SignInFormValues = z.infer<typeof signUpSchema>;

interface Props {
    setIsLogin: (p: boolean) => void;
}

export function SignUpForm({ setIsLogin }: Props): JSX.Element {
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<SignInFormValues>({
        resolver: zodResolver(signUpSchema),
    });

    const signInMutation = useMutation({
        mutationFn: signUp,
        onSuccess: async () => {
            reset();
            setIsLogin(true);
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

    async function onSubmit(request: signUpRequest) {
        signInMutation.mutate(request);
    }

    return (
        <main className="sign-form-container">
            <h1 className="text-preset-1" style={{ color: "var(--grey-900)" }}>
                Sign Up
            </h1>
            <form className="sign-form" onSubmit={handleSubmit(onSubmit)}>
                <Field title="Name" type="name" {...register("name")} />
                <ErrorMessage message={errors.name?.message} />
                <Field title="Email" type="email" {...register("email")} />
                <ErrorMessage message={errors.email?.message} />
                <Field
                    title="Password"
                    type="password"
                    {...register("password")}
                    helperText="Passwords must be at least 8 characters"
                    iconAfter="./assets/images/icon-show-password.svg"
                />
                <ErrorMessage message={errors.email?.message} />
                {error && <ErrorMessage message={error} />}
                <input
                    type="submit"
                    value="Create Account"
                    className="button-primary"
                />
            </form>

            <div
                style={{
                    display: "flex",
                    gap: "8px",
                    justifyContent: "center",
                }}
            >
                <p
                    className="text-preset-4"
                    style={{ color: "var(--grey-500)" }}
                >
                    Already have an account?
                </p>
                <p
                    className="text-preset-4-bold"
                    style={{
                        color: "var(--grey-900)",
                        textDecoration: "underline",
                        cursor: "pointer",
                    }}
                    onClick={() => setIsLogin(true)}
                >
                    Login
                </p>
            </div>
        </main>
    );
}
