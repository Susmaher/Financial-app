import { useState, type JSX } from "react";
import ClickOutside from "../ClickOutside";

type Props = {
    options: string[];
    color?: boolean;
};

export function CustomSelect({ options, color }: Props): JSX.Element {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedElement, setSelectedElement] = useState<string>();
    return (
        <div
            onClick={() => setIsOpen(!isOpen)}
            className="custom-select-container"
        >
            <ClickOutside onClick={() => setIsOpen(false)}>
                <button className="custom-select-button">
                    {color && (
                        <span
                            style={{
                                width: "16px",
                                height: "16px",
                                backgroundColor: selectedElement
                                    ? `var(--${selectedElement.toLocaleLowerCase()})`
                                    : `var(--${options[0].toLocaleLowerCase()})`,
                                borderRadius: "50%",
                            }}
                        ></span>
                    )}
                    <span>
                        {selectedElement ? selectedElement : options[0]}
                    </span>
                    <span>
                        <img
                            src="./assets/images/icon-caret-down.svg"
                            alt=""
                            style={{ rotate: isOpen ? "180deg" : undefined }}
                        />
                    </span>
                </button>

                <ul
                    style={{
                        display: isOpen ? "flex" : "none",
                    }}
                    className="custom-select-option-list"
                >
                    {options.map((element, id) => {
                        return (
                            <li
                                key={id}
                                style={{
                                    display: isOpen ? "flex" : "none",
                                    cursor: "pointer",
                                }}
                                onClick={() => setSelectedElement(element)}
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
                            </li>
                        );
                    })}
                </ul>
            </ClickOutside>
        </div>
    );
}
