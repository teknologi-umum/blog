import { Dispatch, SetStateAction, useEffect, useSyncExternalStore } from "react";

type ThemePreference = {
    theme: "light" | "dark" | "os-default";
    isDark: boolean;
};

const localStorageKey = "teknologi-umum-blog-theme";

function getThemePreference(): ThemePreference {
    const userPreference = localStorage.getItem(localStorageKey);

    switch (userPreference) {
        case "dark":
            return { theme: "dark", isDark: true };
        case "light":
            return { theme: "light", isDark: false };
        default:
            return { theme: "os-default", isDark: window.matchMedia("(prefers-color-scheme: dark)").matches };
    }
}

let themePreference: ThemePreference = { theme: "os-default", isDark: false };

const darkModeSubscribers = new Set<Dispatch<SetStateAction<ThemePreference>>>();

function subscribe(subscriberFn) {
    darkModeSubscribers.add(subscriberFn);

    return () => darkModeSubscribers.delete(subscriberFn);
}

function updateTheme() {
    const preference = getThemePreference();

    if (preference.isDark) {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }

    themePreference = preference;

    darkModeSubscribers.forEach((subscriberFn) => subscriberFn(themePreference));
}

function persistTheme(theme: ThemePreference["theme"]) {
    if (theme === "dark" || theme === "light") {
        localStorage.setItem(localStorageKey, theme);
    } else {
        localStorage.removeItem(localStorageKey);
    }
}

function setAndPersistTheme(theme: ThemePreference["theme"]) {
    persistTheme(theme);
    updateTheme();
}

export function useThemePreference() {
    const state = useSyncExternalStore<ThemePreference>(
        subscribe,
        () => themePreference,
        () => themePreference,
    );

    useEffect(() => {
        updateTheme();

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        mediaQuery.addEventListener("change", updateTheme);
        return () => mediaQuery.removeEventListener("change", updateTheme);
    }, []);

    return {
        theme: state.theme,
        isDarkMode: state.isDark,
        setAndPersistTheme,
    };
}
