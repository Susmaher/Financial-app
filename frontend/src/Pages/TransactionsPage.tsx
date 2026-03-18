import { useState, type JSX } from "react";
import Title from "../components/Title";
import { InputFieldTop } from "../components/TransactionComponents/InputFieldTop";
import { CustomSelect } from "../components/FormComponents/CustomSelect";
import { ContentTable } from "../components/TransactionComponents/ContentTable";

export default function TransactionsPage(): JSX.Element {
    const [category, setCategory] = useState<string>("Entertainment");
    const [sortBy, setSortBy] = useState<string>("Latest");
    const [color, setColor] = useState<string>("Green");

    return (
        <main
            style={{
                padding: "32px 40px",
                gap: "32px",
                display: "flex",
                flexDirection: "column",
                height: "100%",
            }}
        >
            <Title titleName="Transactions" />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h1 className="text-preset-1" style={{}}>
                    Transactions
                </h1>
                <button
                    className="button-primary"
                    style={{
                        width: "fit-content",
                        padding: "12px",
                    }}
                >
                    + New Transaction
                </button>
            </div>
            <div
                style={{
                    padding: "32px",
                    width: "100%",
                    height: "100%",
                    borderRadius: "12px",
                    backgroundColor: "var(--white)",
                }}
            >
                <InputFieldTop
                    categoryValue={category}
                    setCategoryValue={setCategory}
                    sortByValue={sortBy}
                    setSortByValue={setSortBy}
                />
                <ContentTable />
                <CustomSelect
                    title="Category"
                    options={[
                        "Green",
                        "Yellow",
                        "Cyan",
                        "Navy",
                        "Red",
                        "Purple",
                        "Purple-light",
                        "Turquoise",
                        "Brown",
                        "Magenta",
                        "Blue",
                        "Navy-grey",
                        "Army-green",
                        "Gold",
                        "Orange",
                    ]}
                    value={color}
                    onChange={setColor}
                    color={true}
                />
            </div>
        </main>
    );
}
