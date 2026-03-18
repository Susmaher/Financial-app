import { type JSX } from "react";
import { Field } from "../FormComponents/Field";
import { CustomSelect } from "../FormComponents/CustomSelect";
import "../../styles/inputFieldTop.css";

type Props = {
    categoryValue: string;
    setCategoryValue: (element: string) => void;
    sortByValue: string;
    setSortByValue: (element: string) => void;
};

export function InputFieldTop({
    categoryValue,
    setCategoryValue,
    sortByValue,
    setSortByValue,
}: Props): JSX.Element {
    const handleCategory = (element: string) => {
        setCategoryValue(element);
    };
    const handleSortBy = (element: string) => {
        setSortByValue(element);
    };

    return (
        <div className="input-field-top-container">
            <div className="input-field-top-left">
                <span className="input-field-top-search">
                    <Field
                        type="text"
                        iconAfter="./assets/images/icon-search.svg"
                        placeholder="Search transaction"
                    />
                </span>
            </div>

            <div className="input-field-top-right">
                <CustomSelect
                    title="Sort by"
                    options={[
                        "Latest",
                        "Oldest",
                        "A to Z",
                        "Z to A",
                        "Highest",
                        "Lowest",
                    ]}
                    value={sortByValue}
                    onChange={handleSortBy}
                />
                <CustomSelect
                    title="Category"
                    options={[
                        "Entertainment",
                        "Bills",
                        "Groceries",
                        "Dining Out",
                        "Transportation",
                        "Personal Care",
                        "Education",
                        "Lifestyle",
                        "Shopping",
                        "General",
                    ]}
                    value={categoryValue}
                    onChange={handleCategory}
                />
            </div>
        </div>
    );
}
