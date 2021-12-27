import CustomersRepository from '@modules/costumers/typeorm/repositories/CustomersRepository';
import ProductsRepository from '@modules/products/typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Order from '../typeorm/entities/Order';
import OrderRepository from '../typeorm/repositories/OrderRepository';

interface IRequestProduct {
    id: string;
}

interface IRequest {
    customer_id: string;
    products: IRequestProduct[];
}

class CreateOrderService {
    public async execute({ customer_id, products }: IRequest): Promise<Order> {
        const orderRepository = getCustomRepository(OrderRepository);
        const customerRepository = getCustomRepository(CustomersRepository);
        const productRepository = getCustomRepository(ProductsRepository);

        const customerExists = await customerRepository.findById(customer_id);
        if (customerExists) {
            throw new AppError('Could not find the customer with the given id!');
        }

        const existsProducts = await productRepository.findAllByIds(products);
        if (!existsProducts.length) {
            throw new AppError('could not find any cystomer with the given id!');
        }

        const existsProductsIds = existsProducts.map(product => product.id);

        const checkInexistentProducts = products.filter(
            product => !existsProductsIds.includes(product.id),
        );
        if (checkInexistentProducts.length) {
            throw new AppError(`could not find product ${checkInexistentProducts[0].id}`);
        }
    }
}

export default CreateOrderService;
