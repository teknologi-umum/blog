declare global {
  interface Window {
    darkModeObserver: MutationObserver | undefined;
  }
}

window.darkModeObserver = window.darkModeObserver || {};

export {};
