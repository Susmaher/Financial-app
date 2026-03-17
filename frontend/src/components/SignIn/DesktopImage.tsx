import type { JSX } from "react";

export function DesktopImage(): JSX.Element {
    return (
        <div className="login-side-image">
            <img
                src="./assets/images/logo-large.svg"
                alt="logo"
                style={{ width: "122px" }}
            />
            <div className="login-sidebar-text">
                <h1
                    className="text-preset-1"
                    style={{ color: "var(--white)", width: "100%" }}
                >
                    Keep track of your money <br /> and save your future
                </h1>
                <p className="text-preset-4" style={{ color: "var(--white)" }}>
                    Personal finance app puts you in control of your spending.
                    Track transactions, set budgets, and add to savings pots
                    easily.
                </p>
            </div>
        </div>
    );
}
