import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import CostumerRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
    id: string;
}

class DeleteCustomerService {
    public async execute({ id }: IRequest): Promise<void> {
        const costumerRepository = getCustomRepository(CostumerRepository);
        const customer = await costumerRepository.findById(id);

        if (!customer) {
            throw new AppError('Customer not found!');
        }

        await costumerRepository.remove(customer);
    }
}

export default DeleteCustomerService;
