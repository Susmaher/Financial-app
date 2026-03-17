import { forwardRef, useState, type ComponentPropsWithoutRef } from "react";

type Props = {
    title?: string;
    helperText?: string;
    icon?: string;
    iconAfter?: string;
    color?: string;
    selectElements: string[];
} & Omit<ComponentPropsWithoutRef<"input">, "id">;

export const DropDownField = forwardRef<HTMLInputElement, Props>(
    function DropDownField(
        {
            title,
            color,
            type,
            placeholder,
            helperText,
            icon,
            iconAfter,
            selectElements,
            ...rest
        },
        ref,
    ) {
        return (
            <div
                style={{
                    display: "flex",
                    gap: "8px",
                    alignItems: "center",
                    textWrap: "nowrap",
                }}
            >
                {title && (
                    <label
                        className="text-preset-5-bold"
                        style={{ color: "var(--grey-500)" }}
                    >
                        {title}
                    </label>
                )}
                <select
                    className="form-input-style"
                    style={{
                        paddingRight: "20px",
                        paddingLeft: icon ? "36px" : "10px",
                    }}
                >
                    {selectElements.map((element, i) => {
                        return (
                            <option key={i} value={element}>
                                {element}
                            </option>
                        );
                    })}
                </select>
            </div>
        );
    },
);
