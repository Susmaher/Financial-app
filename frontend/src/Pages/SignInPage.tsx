import type { JSX } from "react";
import { SignInForm } from "../components/SignIn/SignInForm";

export default function SignInPage(): JSX.Element {
    return (
        <div
            style={{
                display: "flex",
                background: "var(--beige-100)",
                width: "100vw",
                height: "100vh",
            }}
        >
            <SignInForm />
        </div>
    );
}
