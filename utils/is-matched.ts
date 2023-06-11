export const isMatched = (value: string | string[], keywords: string): boolean => {
    const lowerCasedKeywords = keywords.toLowerCase();

    if (Array.isArray(value)) {
        return value.some((v) => v.toLowerCase().includes(lowerCasedKeywords));
    }

    return value.toLowerCase().includes(lowerCasedKeywords);
};
