import 'reflect-metadata';
import 'module-alias/register';
import 'express-async-errors';
import '@shared/typeorm';
import 'dotenv/config';

import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes';
import AppError from '@shared/errors/AppError';

import rateLimiter from './middlewares/rateLimiter';
import { errors } from 'celebrate';
import { pagination } from 'typeorm-pagination';
import uploadConfig from '@config/upload';
const app = express();

app.use(cors());
app.use(express.json());
app.use(rateLimiter);
app.use(pagination);
app.use('/files', express.static(uploadConfig.directory));

app.use(routes);
app.use(errors());

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: 'error',
            message: error.message,
        });
    }

    return response.status(500).json({
        status: 'unknow error',
        message: 'Internal Server Error',
    });
});

app.listen(3333, () => {
    console.log('Running on port 3333');
});
