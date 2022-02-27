import CustomersRepository from '@modules/costumers/infra/typeorm/repositories/CustomersRepository';
import ProductsRepository from '@modules/products/typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Order from '../infra/typeorm/entities/Order';
import OrderRepository from '../infra/typeorm/repositories/OrderRepository';

interface IRequestProduct {
    id: string;
    quantity: number;
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
        if (!customerExists) {
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

        const quantityAvaiable = products.filter(
            product =>
                existsProducts.filter(p => p.id === product.id)[0].quantity < product.quantity,
        );

        if (quantityAvaiable.length) {
            throw new AppError(
                `The quantity ${quantityAvaiable[0].quantity} is not available for ${quantityAvaiable[0].id}`,
            );
        }

        const serializedProducts = products.map(product => ({
            product_id: product.id,
            quantity: product.quantity,
            price: existsProducts.filter(p => p.id === product.id)[0].price,
        }));

        const order = await orderRepository.createOrder({
            customer: customerExists,
            products: serializedProducts,
        });

        const { order_products } = order;

        const updatedProductQuantity = order_products.map(product => ({
            id: product.product_id,
            quantity:
                existsProducts.filter(p => p.id === product.product_id)[0].quantity -
                product.quantity,
        }));

        await productRepository.save(updatedProductQuantity);

        return order;
    }
}

export default CreateOrderService;
