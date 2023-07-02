export const isSSR: boolean = typeof window === "undefined";

export const androidOrIOS = (): "android" | "ios" | undefined => {
    if (!isSSR) {
        const userAgent = navigator.userAgent;
        if (/android/i.test(userAgent)) {
            return "android";
        }

        if (/iPad|iPhone|iPod/i.test(userAgent)) {
            return "ios";
        }
    }

    return undefined;
};

export const isMobile = (): boolean => {
    const device = androidOrIOS();
    return device === "android" || device === "ios";
};

export const isStandalone = (): boolean => {
    if (!isSSR) {
        let displayMode = "browser tab";

        if (window && window.matchMedia("(display-mode: standalone)").matches) {
            displayMode = "standalone";
        }

        return displayMode === "standalone";
    }

    return false;
};
