import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import ProductsRepository from '../typeorm/repositories/ProductsRepository';
import RedisCache from '@shared/cache/RedisCache';

class ListProductService {
    public async execute(): Promise<Product[]> {
        const productsRepository = getCustomRepository(ProductsRepository);

        const redisCache = new RedisCache();

        let products = await redisCache.get<Product[]>('api-vendas-product-list');

        if (!products) {
            products = await productsRepository.find();
            await redisCache.save('api-vendas-product-list', products);
        }

        return products;
    }
}

export default ListProductService;
