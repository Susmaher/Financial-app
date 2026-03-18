import { useState, type JSX } from "react";
import ClickOutside from "../ClickOutside";

type Props = {
    options: string[];
    value: string;
    onChange: (value: string) => void;
    color?: boolean;
    title?: string;
};

export function CustomSelect({
    options,
    color,
    title,
    value,
    onChange,
}: Props): JSX.Element {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleSelect = (element: string) => {
        onChange(element);
        setIsOpen(false);
    };

    return (
        <div
            style={{
                display: "flex",
                gap: "8px",
                textWrap: "nowrap",
                alignItems: "center",
                width: "fit-content",
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
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="custom-select-container"
            >
                <ClickOutside onClick={() => setIsOpen(false)}>
                    <span className="text-preset-4 custom-select-ruler">
                        {options.reduce((a, b) =>
                            a.length > b.length ? a : b,
                        )}
                    </span>
                    <button className="custom-select-button text-preset-4">
                        {color && (
                            <span
                                style={{
                                    width: "16px",
                                    height: "16px",
                                    backgroundColor: `var(--${value.toLocaleLowerCase()})`,
                                    borderRadius: "50%",
                                }}
                            ></span>
                        )}

                        {value}
                        <img
                            src="./assets/images/icon-caret-down.svg"
                            alt=""
                            style={{
                                rotate: isOpen ? "180deg" : undefined,
                                width: "16px",
                                height: "16px",
                            }}
                        />
                    </button>

                    <ul
                        style={{
                            display: isOpen ? "flex" : "none",
                        }}
                        className="custom-select-option-list"
                    >
                        {options.map((element, id) => {
                            return (
                                <span key={id} style={{ display: "contents" }}>
                                    <li
                                        style={{
                                            display: isOpen ? "flex" : "none",
                                            cursor: "pointer",
                                            gap: "12px",
                                            alignItems: "center",
                                            justifyContent: "flex-start",
                                        }}
                                        className="text-preset-4"
                                        onClick={() => handleSelect(element)}
                                    >
                                        {color && (
                                            <span
                                                style={{
                                                    width: "16px",
                                                    height: "16px",
                                                    backgroundColor: `var(--${element.toLocaleLowerCase()})`,
                                                    borderRadius: "50%",
                                                }}
                                            ></span>
                                        )}
                                        {element}

                                        {element == value && color && (
                                            <img
                                                style={{
                                                    marginLeft: "auto",
                                                }}
                                                src="./assets/images/icon-selected.svg"
                                                alt=""
                                            />
                                        )}
                                    </li>
                                    <span
                                        style={{
                                            width: "100%",
                                            outline: "1px solid",
                                            color: "var(--grey-100)",
                                        }}
                                    ></span>
                                </span>
                            );
                        })}
                    </ul>
                </ClickOutside>
            </div>
        </div>
    );
}
