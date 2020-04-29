/* eslint-disable @typescript-eslint/no-explicit-any */
import { Logger, LoggerOptions, createLogger, format, transports } from 'winston';

export { Logger, LoggerOptions, createLogger, format, transports } from 'winston';
/**
 * The valid log levels
 * @remarks These log levels conform to standard log level definitions
 * @public
 */
export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

/**
 * The valid output locations for logs
 * @remarks Additional output locations will be enabled in the future
 * @public
 */
export enum LogOutput {
  CONSOLE = 'console',
  FILE = 'file',
  NONE = 'none',
}

/**
 * Configuration options for instantiating the Log
 * @public
 */
export interface LogOptions {
  /**
   * The service name to use for log metadata and file names
   */
  serviceName: string;
  /**
   * The minimum log level to capture
   */
  logLevel: LogLevel;
  /**
   * A list of all supported output locations
   */
  transports: LogOutput[];
}

/**
 * The default configuration if none is provided.
 * @defaultValue {@link LogLevel.ERROR} and {@link LogOutput.FILE}
 * @public
 */
export const DefaultLogOptions: LogOptions = {
  serviceName: 'js-tools',
  logLevel: LogLevel.ERROR,
  transports: [LogOutput.FILE],
};

/**
 * Constructs a Winston LoggerOptions object based on the provided options
 * @public
 * @param options - log options
 * @returns winston.LoggerOptions
 */
export const buildLoggerConfig = (options: LogOptions): LoggerOptions => {
  return {
    level: options.logLevel,
    format: format.combine(
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      format.errors({ stack: true }),
      format.splat(),
      format.json(),
    ),
    defaultMeta: { service: options.serviceName },
    transports: [],
  };
};

/**
 * @public
 */
export type logMethod = (level: LogLevel, message: string, ...args: any[]) => void;
/**
 * @public
 */
export type infoMethod = (message: string, ...args: any[]) => void;
/**
 * @public
 */
export type errorMethod = (message: string, ...args: any[]) => void;

/**
 * Definition of logging implementation requirements
 * @public
 */
export interface LogInterface {
  /**
   * Allows logging at any desired log level
   * @param level - the log level to use (DEBUG, INFO, WARN, ERROR)
   * @param message - a brief description of the issue
   * @param args - any number of additional string messages, which will be joined together or a JSON object
   * @returns void
   */
  log: logMethod;
  /**
   * Generates an INFO log
   * @param message - a brief description of the issue
   * @param args - any number of additional string messages, which will be joined together or a JSON object
   * @returns void
   */
  info: infoMethod;
  /**
   * Generates an ERROR log
   * @param message - a brief description of the issue
   * @param args - any number of additional string messages, which will be joined together or a JSON object
   * @returns void
   */
  error: errorMethod;
}

/**
 * A log class to be used for composing log messages.
 * @remarks
 * This class is directly exposed to allow for customizing logging in specific contexts.
 * @public
 */
export class Log implements LogInterface {
  logger: Logger;

  /**
   * @param logOptions - optional configuration options for the logger
   */
  constructor(logOptions: LogOptions = DefaultLogOptions) {
    const loggerConfig = buildLoggerConfig(logOptions);
    this.logger = createLogger(loggerConfig);

    const addFileTransport = logOptions.transports.find((t) => t === LogOutput.FILE);
    if (addFileTransport) {
      this.logger.add(
        new transports.File({
          filename: `${logOptions.serviceName}_error.log`,
          level: LogLevel.ERROR,
          handleExceptions: true,
        }),
      );
      this.logger.add(new transports.File({ filename: `${logOptions.serviceName}_info.log` }));
    }

    const addConsoleTransport =
      logOptions.transports.find((t) => t === LogOutput.CONSOLE) || process.env.NODE_ENV !== 'production';

    /* istanbul ignore else */
    if (addConsoleTransport) {
      this.logger.add(
        new transports.Console({
          format: format.combine(format.colorize(), format.simple()),
          handleExceptions: true,
        }),
      );
    }
  }

  public log = (level: LogLevel, message: string, ...args: any[]): void => {
    this.logger.log(level, message, ...args);
  };

  public info = (message: string, ...args: any[]): void => {
    this.logger.info(message, ...args);
  };

  public error = (message: string, ...args: any[]): void => {
    this.logger.log('error', message, ...args);
  };
}

/**
 * Internal handle on a static instance of a logger
 */
let staticLogger: LogInterface;

/**
 * Fetches a static instance of a logger.
 * The returned logger will always be the same instance, with the same configuration.
 * @public
 * @param logOptions - optional configuration options for the logger
 * @param reset - reset the static instance with a new configuration
 */
export const getLogger = (logOptions: LogOptions = DefaultLogOptions, reset = false): LogInterface => {
  if (reset) staticLogger = new Log(logOptions);
  /* istanbul ignore next */
  staticLogger = staticLogger || new Log(logOptions);
  return staticLogger;
};
