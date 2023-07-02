import { useEffect, useRef } from "react";

type Event = MouseEvent | TouchEvent;
type Handler = () => void;

export function useOnClickOutside(handler: Handler) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const listener = (event: Event) => {
            const el = ref?.current;
            if (!el || el.contains((event?.target as Node) || null)) {
                return;
            }

            handler();
        };

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]);

    return ref;
}
