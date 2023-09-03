import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  transports: [new transports.Console()],
  format: format.combine(format.timestamp(), format.prettyPrint())
});

export { logger };