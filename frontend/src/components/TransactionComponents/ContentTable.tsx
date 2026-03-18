import type { JSX } from "react";

export function ContentTable(): JSX.Element {
    return (
        <>
            <div
                style={{
                    display: "flex",
                    padding: "12px 16px",
                    gap: "32px",
                    justifyContent: "space-between",
                }}
            >
                <p
                    className="text-preset-5"
                    style={{
                        color: "var(--grey-500)",
                        flexBasis: "428px",
                        flexShrink: 1,
                        minWidth: "180px",
                    }}
                >
                    Recipient/Sender
                </p>
                <div style={{ display: "contents" }}>
                    <p
                        className="text-preset-5"
                        style={{ color: "var(--grey-500)" }}
                    >
                        Category
                    </p>
                    <p
                        className="text-preset-5"
                        style={{
                            color: "var(--grey-500)",
                            textWrap: "nowrap",
                        }}
                    >
                        Transaction Date
                    </p>
                    <p
                        className="text-preset-5"
                        style={{
                            color: "var(--grey-500)",
                            width: "200px",
                            textAlign: "right",
                        }}
                    >
                        Amount
                    </p>
                </div>
            </div>
        </>
    );
}
