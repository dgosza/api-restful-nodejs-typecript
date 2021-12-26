import Customer from '@modules/costumers/typeorm/entities/Customer';
import Product from '@modules/products/typeorm/entities/Product';
import {
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import Order from './Order';

@Entity('orders_products')
class OrderProducts {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Order, order => order.order_products)
    @JoinColumn({ name: 'customer_id' })
    order: Order;

    @ManyToOne(() => Product, product => product.order_products)
    @JoinColumn({ name: 'product_id' })
    product: Product[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default OrderProducts;
