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
        <div className="custom-select-wrapper">
            {title && (
                <label className="text-preset-5-bold custom-select-title">
                    {title}
                </label>
            )}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="custom-select-container"
            >
                <ClickOutside onClick={() => setIsOpen(false)}>
                    <span
                        className={`text-preset-4 custom-select-ruler ${color && "has-color"}`}
                    >
                        {options.reduce((a, b) =>
                            a.length > b.length ? a : b,
                        )}
                    </span>
                    <button className="custom-select-button text-preset-4">
                        {color && (
                            <span
                                className="custom-select-color-dot"
                                style={{
                                    backgroundColor: `var(--${value.toLocaleLowerCase()})`,
                                }}
                            ></span>
                        )}

                        {value}
                        <img
                            src="./assets/images/icon-caret-down.svg"
                            alt=""
                            className={`custom-select-caret ${
                                isOpen ? "custom-select-caret-open" : ""
                            }`}
                        />
                    </button>

                    <ul
                        className={`custom-select-option-list ${
                            isOpen ? "custom-select-option-list-open" : ""
                        }`}
                    >
                        {options.map((element, id) => {
                            return (
                                <span
                                    key={id}
                                    className="custom-select-option-wrapper"
                                >
                                    <li
                                        className="text-preset-4 custom-select-option"
                                        onClick={() => handleSelect(element)}
                                    >
                                        {color && (
                                            <span
                                                className="custom-select-color-dot"
                                                style={{
                                                    backgroundColor: `var(--${element.toLocaleLowerCase()})`,
                                                }}
                                            ></span>
                                        )}
                                        {element}

                                        {element === value && color && (
                                            <img
                                                className="custom-select-selected-icon"
                                                src="./assets/images/icon-selected.svg"
                                                alt="Selected"
                                            />
                                        )}
                                    </li>
                                    <span className="custom-select-option-divider"></span>
                                </span>
                            );
                        })}
                    </ul>
                </ClickOutside>
            </div>
        </div>
    );
}
