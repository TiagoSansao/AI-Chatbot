import { ApplicationError } from '@/errors/application';
import { statusCode } from '@/types/statusCode';
import WAWebJS from 'whatsapp-web.js';

export class OpenaiQueryFailedError extends ApplicationError {
  constructor() {
    super();
    this.name = this.constructor.name;
    this.stack = new Error().stack;
    this.statusCode = statusCode.INTERNAL_SERVER_ERROR;
    this.message =
      'Failed to retrieve response containing the query response from OpenAI';
  }
}
