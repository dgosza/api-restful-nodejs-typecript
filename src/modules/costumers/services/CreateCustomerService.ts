import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../infra/typeorm/entities/Customer';
import CustomersRepository from '../infra/typeorm/repositories/CustomersRepository';

interface IRequest {
    name: string;
    email: string;
}

class CreateCustomerService {
    public async execute({ name, email }: IRequest): Promise<Customer> {
        const costumerRepository = getCustomRepository(CustomersRepository);

        const emailExists = await costumerRepository.findByEmail(email);
        if (emailExists) {
            throw new AppError('Email already in use!');
        }

        const customer = costumerRepository.create({
            name,
            email,
        });

        await costumerRepository.save(customer);

        return customer;
    }
}

export default CreateCustomerService;
