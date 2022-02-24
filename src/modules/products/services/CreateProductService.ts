import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import ProductsRepository from '../typeorm/repositories/ProductsRepository';

import RedisCache from '@shared/cache/RedisCache';

interface IRequestProduct {
    name: string;
    price: number;
    quantity: number;
}

class CreateProductService {
    public async execute({ name, price, quantity }: IRequestProduct): Promise<Product> {
        const productsRepository = getCustomRepository(ProductsRepository);
        const productExists = await productsRepository.findByName(name);
        const redisCache = new RedisCache();
        if (productExists) {
            throw new AppError('There is already one product with this name on database!');
        }

        const product = productsRepository.create({
            name,
            price,
            quantity,
        });

        await redisCache.invalidate('api-vendas-product-list');

        await productsRepository.save(product);

        return product;
    }
}

export default CreateProductService;
