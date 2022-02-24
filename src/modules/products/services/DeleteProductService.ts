import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import ProductsRepository from '../typeorm/repositories/ProductsRepository';

import RedisCache from '@shared/cache/RedisCache';

interface IRequestProduct {
    id: string;
}

class DeleteProductService {
    public async execute({ id }: IRequestProduct): Promise<void> {
        const productsRepository = getCustomRepository(ProductsRepository);
        const product = await productsRepository.findOne(id);

        if (!product) {
            throw new AppError('Product not found!');
        }

        const redisCache = new RedisCache();
        await productsRepository.remove(product);
        await redisCache.invalidate('api-vendas-product-list');
    }
}

export default DeleteProductService;
