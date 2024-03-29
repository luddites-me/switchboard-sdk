/* eslint-disable no-console */

/**
 * Mechanism for synchronous wait.
 * Usage: `await this.sleep(5000)`
 * @param milliseconds - the number of milliseconds to wait
 * @public
 */
export const sleep = async (milliseconds: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

/**
 * Mechanism to perform async/await operations over an array
 * @param array - The array to call the async operatior for
 * @param callback - The function we want to apply
 */
export const asyncForEach = async (array?: any[], callback?: any): Promise<void> => {
  if (!array || !callback) return;
  /* eslint-disable-next-line no-restricted-syntax */
  for await (const val of array) {
    await callback(val, array);
  }
};
