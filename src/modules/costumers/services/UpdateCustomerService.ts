import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import Customer from '../infra/typeorm/entities/Customer';
import CustomerRepository from '../infra/typeorm/repositories/CustomersRepository';

interface IRequest {
    id: string;
    name: string;
    email: string;
}

class UpdateCustomerService {
    public async execute({ id, name, email }: IRequest): Promise<Customer> {
        const usersRepository = getCustomRepository(CustomerRepository);

        const customer = await usersRepository.findById(id);
        if (!customer) {
            throw new AppError('customer not found');
        }

        const customerExists = await usersRepository.findByEmail(email);
        if (customerExists && email !== customer.email) {
            throw new AppError('There is already one customer with this email');
        }

        customer.name = name;
        customer.email = email;

        await usersRepository.save(customer);

        return customer;
    }
}

export default UpdateCustomerService;
