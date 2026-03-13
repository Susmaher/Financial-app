import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import OverviewPage from "./Pages/OverviewPage.tsx";
import TransactionsPage from "./Pages/TransactionsPage.tsx";
import PotsPage from "./Pages/PotsPage.tsx";
import BudgetsPage from "./Pages/BudgetsPage.tsx";
import RecurringPage from "./Pages/RecurringPage.tsx";
import { MainLayout } from "./MainLayout.tsx";
import { ViewProvider } from "./context/ViewProvider.tsx";

createRoot(document.getElementById("root")!).render(
    <ViewProvider>
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<OverviewPage />} />
                    <Route
                        path="/transactions"
                        element={<TransactionsPage />}
                    />
                    <Route path="/pots" element={<PotsPage />} />
                    <Route path="/budgets" element={<BudgetsPage />} />
                    <Route path="/recurring" element={<RecurringPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </ViewProvider>,
);
