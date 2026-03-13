import { createContext } from "react";

interface Viewport {
    viewport: "mobile" | "tablet" | "desktop";
}

export const ViewContext = createContext<Viewport>({ viewport: "desktop" });
