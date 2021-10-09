export const isCookieEnabled = (): boolean => {
  try {
    return window.localStorage !== undefined;
  } catch {
    return false;
  }
};
