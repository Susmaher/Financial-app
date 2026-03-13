import { useState, type JSX } from "react";
import { NavLink } from "react-router-dom";
import OverviewIcon from "../assets/icon-nav-overview.svg?react";
import TransactionsIcon from "../assets/icon-nav-transactions.svg?react";
import BudgetsIcon from "../assets/icon-nav-budgets.svg?react";
import PotsIcon from "../assets/icon-nav-pots.svg?react";
import RecurringIcon from "../assets/icon-nav-recurring-bills.svg?react";
import MinimizeIcon from "../assets/icon-minimize-menu.svg?react";
import { useView } from "../context/UseView";

const Menus = [
    { title: "Overview", src: "Overview", icon: OverviewIcon },
    {
        title: "Transactions",
        src: "Transactions",
        icon: TransactionsIcon,
    },
    { title: "Budgets", src: "Budgets", icon: BudgetsIcon },
    { title: "Pots", src: "Pots", icon: PotsIcon },
    {
        title: "Recurring bills",
        src: "Recurring",
        icon: RecurringIcon,
    },
];

function DesktopSidebar({
    isSidebarOpen,
    setIsSidebarOpen,
}: {
    isSidebarOpen: boolean;
    setIsSidebarOpen: (value: boolean) => void;
}) {
    const Icon = MinimizeIcon;
    return (
        <nav
            className="sidebar"
            style={{
                width: isSidebarOpen ? "300px" : "88px",
            }}
        >
            <img
                src={
                    isSidebarOpen
                        ? "./assets/images/logo-large.svg"
                        : "./assets/images/logo-small.svg"
                }
                alt=""
                style={{ alignSelf: !isSidebarOpen ? "center" : undefined }}
                className="sidebar-logo"
            />
            <div
                className="sidebar-menu"
                style={{
                    paddingRight: isSidebarOpen ? "24px" : "8px",
                }}
            >
                {Menus.map((page) => {
                    const Icon = page.icon;
                    return (
                        <NavLink
                            key={page.src}
                            to={`/${page.src}`}
                            className={({ isActive }) =>
                                `sidebar-menu-object${isActive ? " active" : ""}`
                            }
                        >
                            <Icon className="sidebar-icon" aria-hidden="true" />

                            {isSidebarOpen && (
                                <p className="text-preset-3">{page.title}</p>
                            )}
                        </NavLink>
                    );
                })}
            </div>

            <div
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="sidebar-menu-object"
                style={{ cursor: "pointer" }}
            >
                <Icon
                    style={{
                        rotate: !isSidebarOpen ? "180deg" : undefined,
                        maxWidth: !isSidebarOpen ? "18px" : undefined,
                        maxHeight: !isSidebarOpen ? "18px" : undefined,
                    }}
                    className="sidebar-icon"
                />

                {isSidebarOpen && (
                    <p className="text-preset-3">Minimize Menu</p>
                )}
            </div>
        </nav>
    );
}

function SmallScreenSidebar({ mode }: { mode: string }) {
    return (
        <nav className="bottom-nav">
            <div className="nav-menu-bottom">
                {Menus.map((page) => {
                    const Icon = page.icon;
                    return (
                        <NavLink
                            key={page.src}
                            to={page.src == "Overview" ? "/" : `/${page.src}`}
                            className={({ isActive }) =>
                                `nav-menu-object-bottom${isActive ? " active" : ""}`
                            }
                        >
                            <Icon className="sidebar-icon" aria-hidden="true" />

                            {mode == "tablet" && (
                                <p className="text-preset-5-bold">
                                    {page.title}
                                </p>
                            )}
                        </NavLink>
                    );
                })}
            </div>
        </nav>
    );
}

export function SideBar(): JSX.Element {
    const viewport = useView();

    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
    if (viewport.viewport == "mobile") {
        return <SmallScreenSidebar mode={viewport.viewport} />;
    }

    if (viewport.viewport == "tablet") {
        return <SmallScreenSidebar mode={viewport.viewport} />;
    }

    return (
        <DesktopSidebar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
        />
    );
}
