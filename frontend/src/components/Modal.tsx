import type { JSX } from "react";

type Props = {
    title: string;
    type?: string;
    description?: string;
};

export function Modal({ title, description }: Props): JSX.Element {
    return (
        <div
            style={{
                height: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                alignContent: "center",
            }}
        >
            <div
                style={{
                    width: "560px",
                    padding: "32px",
                    borderRadius: "12px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    justifySelf: "center",
                    backgroundColor: "var(--white)",
                }}
            >
                <div style={{ display: "flex", alignItems: "center" }}>
                    <h1 className="text-preset-1">{title}</h1>
                    <img
                        src="./assets/images/icon-close-modal.svg"
                        alt=""
                        style={{
                            width: "32px",
                            height: "32px",
                            marginLeft: "auto",
                        }}
                    />
                </div>
                <p className="text-preset-4">{description}</p>
            </div>
        </div>
    );
}
