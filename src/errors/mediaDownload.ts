import { ApplicationError } from '@/errors/application';
import { statusCode } from '@/types/statusCode';

export class MediaDownloadError extends ApplicationError {
  constructor() {
    super();
    this.name = this.constructor.name;
    this.stack = new Error().stack;
    this.statusCode = statusCode.NOT_FOUND;
    this.message = `Error: failed to download media.`;
  }
}
