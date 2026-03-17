import type { JSX } from "react";

export function SmallScreenImage(): JSX.Element {
    return (
        <div className="login-small-side-image">
            <div style={{ justifySelf: "center" }}>
                <img src="./assets/images/logo-large.svg" alt="" style={{}} />
            </div>
        </div>
    );
}
