import { Response, Request } from 'express';
import UpdateUserAvatarService from '../services/UpdateUserAvatar';

class UserAvatarController {
    public async update(request: Request, response: Response): Promise<Response> {
        const serviceUpdateUserAvatar = new UpdateUserAvatarService();
        const user = serviceUpdateUserAvatar.execute({
            user_id: request.user.id,
            avatarFileName: request.file?.filename,
        });
        return response.json(user);
    }
}

export default UserAvatarController;
