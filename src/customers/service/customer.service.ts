import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { Customer } from '../types/Customer';

@Injectable()
export class CustomerService {
  private customers: Customer[] = [
    {
      id: 1,
      email: 'imran@gmai.com',
      name: 'md Imran Hossain',
    },
  ];
  createCustomer(createCustomerDto: CreateCustomerDto) {
    this.customers.push(createCustomerDto);
    return { success: true, message: 'user created' };
  }

  getAllCustomers() {
    return this.customers;
  }

  findCustomerById(id: number) {
    return this.customers.find((c) => c.id === id);
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
