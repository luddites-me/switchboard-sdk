import { LogLevel, LogOutput, getLogger } from '../logger';

const _logger = getLogger({
  logLevel: LogLevel.INFO,
  serviceName: 'switchboard-sdk',
  transports: [LogOutput.CONSOLE, LogOutput.FILE],
});

/**
 * Gets a static logger instance
 */
export const logger = _logger;
