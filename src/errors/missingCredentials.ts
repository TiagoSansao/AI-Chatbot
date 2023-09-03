import { ApplicationError } from '@/errors/application';
import { statusCode } from '@/types/statusCode';

export class MissingCredentials extends ApplicationError {
  constructor() {
    super();
    this.name = this.constructor.name;
    this.stack = new Error().stack;
    this.statusCode = statusCode.INTERNAL_SERVER_ERROR;
    this.message = `Missing either an API Key or an API URL.`;
  }
}
