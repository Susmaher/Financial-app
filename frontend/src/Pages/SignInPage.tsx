import { useState, type JSX } from "react";
import { SignInForm } from "../components/SignIn/SignInForm";
import { DesktopImage } from "../components/SignIn/DesktopImage";
import { SignUpForm } from "../components/SignIn/SignUpForm";
import { useView } from "../context/UseView";
import { SmallScreenImage } from "../components/SignIn/SmallScreenImage";

export default function SignInPage(): JSX.Element {
    const viewport = useView();
    const [isLogin, setIsLogin] = useState<boolean>(true);

    if (viewport.viewport === "mobile" || viewport.viewport === "tablet") {
        return (
            <div className="login-page-small-container">
                <SmallScreenImage />
                <div
                    className="login-form-container"
                    style={{ alignItems: "center", height: "100%" }}
                >
                    {isLogin ? (
                        <SignInForm setIsLogin={setIsLogin} />
                    ) : (
                        <SignUpForm setIsLogin={setIsLogin} />
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="login-page-large-container">
            <div className="login-side-image-container">
                <DesktopImage />
            </div>
            <div className="login-form-container">
                {isLogin ? (
                    <SignInForm setIsLogin={setIsLogin} />
                ) : (
                    <SignUpForm setIsLogin={setIsLogin} />
                )}
            </div>
        </div>
    );
}
