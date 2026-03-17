import { useEffect, useRef, type JSX, type RefObject } from "react";

type Props = {
    children?: React.ReactNode;
    exceptionRef?: RefObject<HTMLElement>;
    onClick: () => void;
};

export default function ClickOutside({
    children,
    exceptionRef,
    onClick,
}: Props): JSX.Element {
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickListener(event: MouseEvent) {
            const target = (event.target as Node) || null;
            let clickedInside = false;
            if (wrapperRef.current === null) return;

            if (exceptionRef) {
                clickedInside =
                    (wrapperRef && wrapperRef.current?.contains(target)) ||
                    exceptionRef.current === target ||
                    exceptionRef.current.contains(target);
            } else {
                clickedInside =
                    wrapperRef && wrapperRef.current.contains(target);
            }

            if (clickedInside) return;
            else onClick();
        }

        document.addEventListener("mousedown", handleClickListener);

        return () => {
            document.removeEventListener("mousedown", handleClickListener);
        };
    }, [exceptionRef, onClick]);

    return (
        <div ref={wrapperRef} style={{ display: "contents" }}>
            {children}
        </div>
    );
}
