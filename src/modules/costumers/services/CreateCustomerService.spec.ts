import 'reflect-metadata';
import CreateCustomerService from './CreateCustomerService';
import FakeCustomerRepository from '../domain/repositories/fakes/FakeCustomerRepository';
import AppError from '@shared/errors/AppError';

let fakeCustomersRepository: FakeCustomerRepository;
let createCustomer: CreateCustomerService;

describe('CreateCustomer', () => {
    beforeEach(() => {
        fakeCustomersRepository = new FakeCustomerRepository();
        createCustomer = new CreateCustomerService(fakeCustomersRepository);
    });

    it('should be abkle to create a new customer', async () => {
        const customer = await createCustomer.execute({
            name: 'Diego Souza',
            email: 'diego@email.com',
        });
        expect(customer).toHaveProperty('id');
    });
    it('should not be able to create a new customer with same email', async () => {
        await createCustomer.execute({
            name: 'Diego Souza',
            email: 'diego@email.com',
        });

        expect(
            createCustomer.execute({
                name: 'Diego Souza Souza',
                email: 'diego@email.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
