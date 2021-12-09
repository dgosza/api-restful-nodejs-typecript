import { Request, Response } from 'express';
import CreateCustomerService from '../services/CreateCustomerService';
import DeleteCustomerService from '../services/DeleteCustomerService';
import ListCustumerService from '../services/ListCustomerService';
import ShowCustomerService from '../services/ShowCustomerService';
import UpdateCustomerService from '../services/UpdateCustomerService';

class CostumerController {
    public async index(request: Request, response: Response): Promise<Response> {
        const listCostumers = new ListCustumerService();
        const products = await listCostumers.execute();
        return response.json({ products });
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const showCostumers = new ShowCustomerService();
        const products = await showCostumers.execute({ user_id: id });
        return response.json({ products });
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const { name, email } = request.body;
        const createCostumer = new CreateCustomerService();
        const costumer = await createCostumer.execute({ name, email });
        return response.json({ costumer });
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const { name, email } = request.body;
        const { id } = request.params;
        const updateCustomer = new UpdateCustomerService();
        const costumer = await updateCustomer.execute({ id, name, email });
        return response.json({ costumer });
    }
    public async delete(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const deleteCustomerService = new DeleteCustomerService();
        await deleteCustomerService.execute({ id });
        return response.json([]);
    }
}

export default CostumerController;
