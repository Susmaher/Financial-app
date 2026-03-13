import { Outlet } from "react-router-dom";
import { SideBar } from "./components/SideBar";

export function MainLayout() {
    return (
        <>
            <div style={{ display: "flex", gap: 0 }}>
                <SideBar />
                <div style={{ flex: 1, overflow: "auto" }}>
                    <Outlet />
                </div>
            </div>
        </>
    );
}
