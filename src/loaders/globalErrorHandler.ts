import { logger } from '@/loaders/logger';

/**
 * This error handler class only objective
 * is to catch uncaptured errors in the application
 * which can happen during bot instantion process!
 *
 * All operational errors that can happen are already
 * being handled in the chatbotErrorHandler method
 * in the API layer.
 **/
class GlobalErrorHandler {
  public start() {
    process.on('uncaughtException', (error: Error) => {
      logger.emerg(error);
      logger.emerg('Restarting application to avoid unexpected behavior.');
      process.exit(1);
    });
  }
}

export { GlobalErrorHandler };
