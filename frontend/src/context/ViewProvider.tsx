import { useEffect, useState, type JSX } from "react";
import { ViewContext } from "./ViewContext";

interface Props {
    children: JSX.Element;
}

export const ViewProvider = ({ children }: Props) => {
    const [viewport, setViewport] = useState<"mobile" | "tablet" | "desktop">(
        "desktop",
    );

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 768) setViewport("mobile");
            else if (width < 1024) setViewport("tablet");
            else setViewport("desktop");
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const value = { viewport };

    return (
        <ViewContext.Provider value={value}>{children}</ViewContext.Provider>
    );
};
