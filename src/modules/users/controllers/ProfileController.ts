import { Request, Response } from 'express';
import ShowProfileService from '../services/ShowProfileService';
import UpdateProfileService from '../services/UpdateProfileService';

class ProfileController {
    public async show(request: Request, response: Response): Promise<Response> {
        const showProfile = new ShowProfileService();
        const user = await showProfile.execute({ user_id: request.user.id });
        return response.json(user);
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const { name, email, password, old_password } = request.body;
        const serviceProfile = new UpdateProfileService();
        const user = await serviceProfile.execute({
            user_id: request.user.id,
            name,
            email,
            password,
            old_password,
        });
        return response.json(user);
    }
}

export default ProfileController;
