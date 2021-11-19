import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UsersTokenRepository from '../typeorm/repositories/UsersTokenRepository';
import EtherealMail from '@config/mail/EtherealMail';
import path from 'path';

interface IRequest {
    email: string;
}

class SendForgotPasswordEmailService {
    public async execute({ email }: IRequest): Promise<void> {
        const usersRepository = getCustomRepository(UsersRepository);
        const userTokenRepository = getCustomRepository(UsersTokenRepository);

        const user = await usersRepository.findByEmail(email);
        if (!user) {
            throw new AppError('User does not exists');
        }

        const token = await userTokenRepository.generate(user.id);
        const forgotPasswordTemplate = path.resolve(__dirname, '..', 'view', 'forgot_password.hbs');

        await EtherealMail.sendMail({
            to: {
                name: user.name,
                email: user.email,
            },
            subject: '[API VENDAS] Recuperação de senha',
            templateData: {
                file: forgotPasswordTemplate,
                variables: {
                    name: user.name,
                    link: `http://localhost:3000/reset_password?token=${token.token}`,
                },
            },
        });
    }
}

export default SendForgotPasswordEmailService;
