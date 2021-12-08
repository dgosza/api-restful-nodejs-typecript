import { getCustomRepository } from 'typeorm';
import Custumer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

class ListCustumerService {
    public async execute(): Promise<Custumer[]> {
        const costumerRepository = getCustomRepository(CustomersRepository);
        const costumers = costumerRepository.find();
        return costumers;
    }
}

export default ListCustumerService;
