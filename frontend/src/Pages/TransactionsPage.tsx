import { useState, type JSX } from "react";
import Title from "../components/Title";
import { Field } from "../components/FormComponents/Field";
import { CustomSelect } from "../components/FormComponents/CustomSelect";

export default function TransactionsPage(): JSX.Element {
    const [category, setCategory] = useState<string>("Entertainment");
    const [sortBy, setSortBy] = useState<string>("Latest");

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
            <h1 className="text-preset-1" style={{}}>
                Transactions
            </h1>
            <div
                style={{
                    padding: "32px",
                    width: "100%",
                    height: "100%",
                    borderRadius: "12px",
                    backgroundColor: "var(--white)",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                        }}
                    >
                        <button
                            className="button-primary"
                            style={{
                                width: "100%",
                                maxWidth: "75px",
                                padding: "12px",
                            }}
                        >
                            Add
                        </button>
                        <Field
                            type="text"
                            iconAfter="./assets/images/icon-search.svg"
                            placeholder="Search transaction"
                        />
                    </div>

                    <div style={{ display: "flex", gap: "12px" }}>
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
                            value={sortBy}
                            onChange={setSortBy}
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
                            value={category}
                            onChange={setCategory}
                        />
                    </div>
                </div>
                <p>
                    Recipient/Sender Category Transaction Date Amount
                    {/* <!-- Add transaction data --> */}
                    Prev Next
                </p>
            </div>
        </main>
    );
}
