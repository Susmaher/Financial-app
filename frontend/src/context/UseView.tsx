import { useContext } from "react";
import { ViewContext } from "./ViewContext";

export const useView = () => {
    const ctx = useContext(ViewContext);

    if (!ctx) {
        throw new Error("useView must be used within a ViewProvider");
    }

    return ctx;
};
