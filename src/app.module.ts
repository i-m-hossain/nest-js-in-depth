import { Module } from '@nestjs/common';
import { CustomerModule } from './customers/customer.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CustomerModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
