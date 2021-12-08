import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomerRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
    user_id: string;
}

class ShowCustomerService {
    public async execute({ user_id }: IRequest): Promise<Customer> {
        const customerRepository = getCustomRepository(CustomerRepository);
        const customer = await customerRepository.findById(user_id);

        if (!customer) {
            throw new AppError('Customer not found');
        }

        return customer;
    }
}

export default ShowCustomerService;
