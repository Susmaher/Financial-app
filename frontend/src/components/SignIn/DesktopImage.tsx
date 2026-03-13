import type { JSX } from "react";

export function DesktopImage(): JSX.Element {
    return (
        <figure style={{}}>
            <img
                src="./assets/images/illustration-authentication.svg"
                alt="image"
                style={{
                    position: "absolute",
                }}
            />
            <img
                src="./assets/images/logo-large.svg"
                alt="logo"
                style={{
                    position: "absolute",
                    padding: "40px",
                }}
            />

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    position: "absolute",
                    padding: "40px",
                    bottom: 0,
                    gap: 24,
                }}
            >
                <h1
                    className="text-preset-1"
                    style={{ color: "var(--white)", width: "100%" }}
                >
                    Keep track of your money <br /> and save your future
                </h1>
                <p className="text-preset-4" style={{ color: "var(--white)" }}>
                    Personal finance app puts you in control of your spending.
                    Track <br />
                    transactions, set budgets, and add to savings pots easily.
                </p>
            </div>
        </figure>
    );
}
