import { forwardRef, useState, type ComponentPropsWithoutRef } from "react";

type Props = {
    title?: string;
    helperText?: string;
    icon?: string;
    iconAfter?: string;
} & Omit<ComponentPropsWithoutRef<"input">, "id">;

export const Field = forwardRef<HTMLInputElement, Props>(function Field(
    { title, type, placeholder, helperText, icon, iconAfter, ...rest },
    ref,
) {
    const [isHidden, setIsHidden] = useState<boolean>(true);

    return (
        <div>
            {title && (
                <label
                    className="text-preset-5-bold"
                    style={{ color: "var(--grey-500)" }}
                >
                    {title}
                </label>
            )}

            <div className="input-wrapper">
                {icon && (
                    <img
                        src={icon}
                        alt=""
                        className="icon-before"
                        aria-hidden="true"
                    />
                )}
                <input
                    type={
                        type?.toLowerCase() === "password" && !isHidden
                            ? "text"
                            : type
                    }
                    placeholder={placeholder}
                    ref={ref}
                    {...rest}
                    className="form-input-style"
                    style={{
                        paddingRight: iconAfter ? "36px" : "20px",
                        paddingLeft: icon ? "36px" : "20px",
                    }}
                />
                {iconAfter && (
                    <img
                        src={iconAfter}
                        alt=""
                        className="icon-after"
                        aria-hidden="true"
                        onClick={() => {
                            if (type?.toLowerCase() === "password") {
                                setIsHidden(!isHidden);
                            }
                        }}
                        style={{ cursor: "pointer" }}
                    />
                )}
            </div>
            {helperText && (
                <p
                    className="text-preset-5"
                    style={{
                        color: "var(--grey-500)",
                        textAlign: "right",
                    }}
                >
                    {helperText}
                </p>
            )}
        </div>
    );
});
