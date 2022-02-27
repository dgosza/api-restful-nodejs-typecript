import { Request, Response } from 'express';
import CreateUserService from '../../services/CreateUserService';
import ListUserService from '../../services/ListUserUserService';
// import UsersRepository from '../typeorm/repositories/UsersRepository';

class UserController {
    public async list(request: Request, response: Response): Promise<Response> {
        const service = new ListUserService();
        const users = await service.execute();
        return response.json(users);
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const { name, email, password } = request.body;
        const service = new CreateUserService();
        const user = await service.execute({ name, email, password });
        return response.json(user);
    }
}

export default UserController;
