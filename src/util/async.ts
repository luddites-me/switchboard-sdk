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

/**
 * Mechanism to perform async/await operations over an array
 */
export const asyncForEach = async (array: any[], callback: any): Promise<void> => {
  if (!array || !callback) return;
  for (let index: number = 0; index < array.length; index += 1) {
    await callback(array[index], index, array);
  }
}
