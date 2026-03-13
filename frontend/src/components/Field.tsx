import { forwardRef, type ComponentPropsWithoutRef } from "react";

type Props = {
    title: string;
    helperText?: string;
    icon?: string;
    iconAfter?: string;
} & Omit<ComponentPropsWithoutRef<"input">, "id">;

export const Field = forwardRef<HTMLInputElement, Props>(function Field(
    { title, type, placeholder, helperText, icon, iconAfter, ...rest },
    ref,
) {
    return (
        <div>
            <label>{title}</label>
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
                    type={type}
                    placeholder={placeholder}
                    ref={ref}
                    {...rest}
                />
                {iconAfter && (
                    <img
                        src={iconAfter}
                        alt=""
                        className="icon-after"
                        aria-hidden="true"
                    />
                )}
            </div>
            {helperText && <small>{helperText}</small>}
        </div>
    );
});
