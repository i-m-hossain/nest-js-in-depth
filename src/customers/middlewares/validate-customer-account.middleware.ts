import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ValidateCustomerAccountMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { valid } = req.headers;
    console.log('validate customer account');
    if (valid === 'true') next();
    else throw new HttpException('Access is not valid', HttpStatus.BAD_REQUEST);
  }
}
