import { HttpException, HttpStatus } from '@nestjs/common';
export class UserNOtFoundException extends HttpException {
  constructor(message?: string, status?: HttpStatus) {
    super(message || 'User not found', status || HttpStatus.NOT_FOUND);
  }
}
