import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import ProductsRepository from '../typeorm/repositories/ProductsRepository';
import RedisCache from '@shared/cache/RedisCache';

interface IRequestProduct {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

class UpdateProductService {
    public async execute({ id, name, price, quantity }: IRequestProduct): Promise<Product> {
        const productsRepository = getCustomRepository(ProductsRepository);

        const product = await productsRepository.findOne(id);
        if (!product) {
            throw new AppError('Product not found!');
        }

        const productExists = await productsRepository.findByName(name);
        if (productExists) {
            throw new AppError('There is already one product with this name on database!');
        }
        const redisCache = new RedisCache();

        product.name = name;
        product.price = price;
        product.quantity = quantity;

        await productsRepository.save(product);
        await redisCache.invalidate('api-vendas-product-list');

        return product;
    }
}

export default UpdateProductService;
