import Redis, { Redis as RedisClientOptions } from 'ioredis';
import cacheConfig from '@config/cache';

export default class RedisCache {
    private client: RedisClientOptions;

    constructor() {
        this.client = new Redis(cacheConfig.config.redis);
    }

    public async save(key: string, value: any): Promise<void> {
        console.log(key, JSON.stringify);
    }

    public async get<T>(key: string): Promise<T | null> {
        const data = await this.client.get(key);
        if (!data) {
            return null;
        }

        const parsedData = JSON.parse(data) as T;
        return parsedData;
    }

    public async invalidate(key: string): Promise<void> {
        await this.client.del(key);
    }
}
