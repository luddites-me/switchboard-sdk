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

export const asyncForEach = async (array, callback) => {
  if (!array || !callback) { return; }
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}
