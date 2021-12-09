import { Router } from 'express';
import CostumerController from '../controllers/CostumerController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const costumerRouter = Router();
const costumerController = new CostumerController();

costumerRouter.use(isAuthenticated);

costumerRouter.get('/', costumerController.index);
costumerRouter.get(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    costumerController.show,
);
costumerRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().required(),
        },
    }),
    costumerController.create,
);
costumerRouter.put(
    '/:id',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().required(),
        },
    }),
    costumerController.update,
);
costumerRouter.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    costumerController.delete,
);

export default costumerRouter;
