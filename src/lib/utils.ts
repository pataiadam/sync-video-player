const ENABLE_DEBUG = false;
export const Logger = {
  debug: (...args: unknown[]) => {
    if (!ENABLE_DEBUG) return;
    console.debug(...args);
  },
  error: (...args: unknown[]) => {
    console.error(...args);
  }
};
