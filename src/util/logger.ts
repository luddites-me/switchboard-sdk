import { LogLevel, LogOutput, getLogger } from '@ns8/protect-tools-js';

/**
 * Gets a static logger instance
 */
export const logger = getLogger({
  logLevel: LogLevel.INFO,
  serviceName: 'switchboard-sdk',
  transports: [LogOutput.CONSOLE],
});
