import { LogLevel, LogOutput, getLogger } from '@ns8/protect-tools-js';
import { sleep } from '../util';

const logger = getLogger({ logLevel: LogLevel.INFO, serviceName: 'switchboard-sdk', transports: [LogOutput.CONSOLE] });

export class RetryConfig {
  constructor(partial: Partial<RetryConfig> = {}) {
    Object.assign(this, partial || {});
    this.attempts = partial.attempts || 0;
    this.maxRetry = partial.maxRetry || 5;
    this.waitMs = partial.waitMs || 2000;
  }

  key: number | string | undefined;

  attempts: number;

  maxRetry: number;

  waitMs: number;
}

/**
 * Handles specific conditions in API errors.
 * If a 404, will execute a simple retry loop.
 * Returns `false` if the API error is unhandled; otherwise returns the API response.
 */
/* eslint no-param-reassign: ["error", { "props": false }] */
export const handleApiError = async (
  error: { statusCode: number },
  retryCallback: () => boolean,
  retryConfig: RetryConfig = new RetryConfig(),
): Promise<boolean> => {
  if (error?.statusCode === 404 && retryConfig.attempts < retryConfig.maxRetry) {
    retryConfig.attempts += 1;
    logger.error(
      `404 fetching key "${retryConfig.key}". Retry #${retryConfig.attempts}/${retryConfig.maxRetry} in ${retryConfig.waitMs}ms`,
    );
    await sleep(retryConfig.waitMs);
    return retryCallback();
  }
  logger.error(`404 fetching key "${retryConfig.key}". ${retryConfig.maxRetry} retries attempted`);
  return false;
};
