import { ApplicationError } from '@/errors/application';
import { statusCode } from '@/types/statusCode';
import WAWebJS from 'whatsapp-web.js';

export class UnsupportedFormatError extends ApplicationError {
  constructor(type: WAWebJS.MessageTypes) {
    super();
    this.name = this.constructor.name;
    this.stack = new Error().stack;
    this.statusCode = statusCode.BAD_REQUEST;
    this.message = `Error: message of format ${type} isn't supported.`;
  }
}
