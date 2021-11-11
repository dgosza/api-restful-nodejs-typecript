import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UserController from '../controllers/UserController';
import isAuthenticated from '../middlewares/isAuthenticated';

const usersRouter = Router();
const userController = new UserController();

usersRouter.get('/', isAuthenticated, userController.list);
usersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        },
    }),
    userController.create,
);

export default usersRouter;
