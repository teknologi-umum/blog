import clsx from "clsx";
import { useEffect, useState } from "react";
import { ChevronUpIcon } from "~/icons";

export function BackToTop() {
    const [show, setShow] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        const toggleButton = () => {
            setShow(window.scrollY > 100);
        };

        window.addEventListener("load", toggleButton);
        window.addEventListener("scroll", toggleButton);

        return () => {
            window.removeEventListener("load", toggleButton);
            window.removeEventListener("scroll", toggleButton);
        };
    }, []);

    return (
        <div
            className={clsx(
                "fixed bottom-10 right-9 w-8 h-8 flex items-center justify-center bg-black text-white rounded cursor-pointer print:hidden",
                !show && "hidden",
            )}
            onClick={scrollToTop}
        >
            <ChevronUpIcon />
        </div>
    );
}
