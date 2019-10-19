import * as StackTracey from 'stacktracey';

/**
 * Utility class for logging
 */
export class Logger {
  public static error = (message: string, error: Error) => {
    Logger.log(message, error);
    throw new Error(`${message}: ${error.message}`);
  }

  /**
  * TODO: use a 3rd party logger like Winston or PINO
  * @param message
  * @param error
  */
  public static log = (message: string, error: Error | null = null) => {
    try {
      console.warn(message);
      if (error) {
        console.error(`${error.message}: ${error.name}: ${error.stack}`);
        console.info(new StackTracey(error).pretty);
      }
    } catch {
      //Never fail in logging
    }
  }
}