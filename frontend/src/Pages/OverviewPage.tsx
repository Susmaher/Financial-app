import type { JSX } from "react";
import Title from "../components/Title";

export default function OverviewPage(): JSX.Element {
    return (
        <>
            <Title titleName="Overview" />
            <p>
                Overview Transactions Budgets Pots Recurring Bills Minimize Menu
                Overview Current Balance
                {/* <!-- Add balance --> */}
                Income
                {/* <!-- Add income --> */}
                Expenses
                {/* <!-- Add expenses --> */}
                Pots See Details Total Saved
                {/* <!-- Add pots data --> */}
                Budgets See Details
                {/* <!-- Add budgets data --> */}
                Transactions View All
                {/* <!-- Add transactions data --> */}
                Recurring Bills See Details
                {/* <!-- Add recurring bills data --> */}
            </p>
        </>
    );
}
