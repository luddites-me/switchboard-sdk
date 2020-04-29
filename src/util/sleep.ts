/* eslint-disable no-console */

/**
 * Mechanism for synchronous wait.
 * Usage: `await this.sleep(5000)`
 * @param milliseconds - the number of milliseconds to wait
 * @internal
 */
export const sleep = async (milliseconds = 1000): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
