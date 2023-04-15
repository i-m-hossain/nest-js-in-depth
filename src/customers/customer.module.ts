import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CustomerService } from './service/customer.service';
import { CustomerController } from './controller/customer/customer.controller';
import { ValidateCustomerMiddleware } from './middlewares/validate-customer.middleware.';
import { ValidateCustomerAccountMiddleware } from './middlewares/validate-customer-account.middleware';
import { NextFunction, Request, Response } from 'express';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        ValidateCustomerMiddleware,
        ValidateCustomerAccountMiddleware,
        (req: Request, res: Response, next: NextFunction) => {
          console.log('last middle ware');
          next();
        },
      )
      .exclude(
        {
          path: 'customers/create',
          method: RequestMethod.POST,
        },
        {
          path: 'customers',
          method: RequestMethod.GET,
        },
      )
      .forRoutes(CustomerController);
  }
}
