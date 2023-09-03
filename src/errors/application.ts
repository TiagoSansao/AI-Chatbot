import { statusCode } from '@/types/statusCode';

export abstract class ApplicationError extends Error {
  public statusCode!: statusCode;
}
