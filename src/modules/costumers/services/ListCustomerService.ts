import { getCustomRepository } from 'typeorm';
import Customer from '../infra/typeorm/entities/Customer';
import Custumer from '../infra/typeorm/entities/Customer';
import CustomersRepository from '../infra/typeorm/repositories/CustomersRepository';

interface IPaginateCostumer {
    from: number;
    to: number;
    per_page: number;
    current_page: number;
    prev_page: number | null;
    next_page: number | null;
    data: Customer[];
}

class ListCustumerService {
    public async execute(): Promise<IPaginateCostumer[]> {
        const costumerRepository = getCustomRepository(CustomersRepository);
        const costumers = costumerRepository.createQueryBuilder().paginate();
        return costumers as IPaginateCostumer;
    }
}

export default ListCustumerService;
