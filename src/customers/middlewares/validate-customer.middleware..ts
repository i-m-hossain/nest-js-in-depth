import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ValidateCustomerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('hello I am inside middlware');
    const { authorization } = req.headers;
    if (!authorization)
      throw new HttpException('No auth token provided', HttpStatus.BAD_REQUEST);
    if (authorization === '123') next();
    else throw new HttpException('Invalid auth token', HttpStatus.FORBIDDEN);
  }
}
