import { Request, Response } from 'express';
import { prismaClient } from '../database';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

class SignInController {
  public async store(request: Request, response: Response) {
    try {
      const { username, password } = request.body;

      if(!(username || password)){
        return response.status(400).json({
          error: true,
          message: 'Usuário e/ou senha não foram informados'
        });
      }

      const user = await prismaClient.user.findFirst({
        where: {
          username,
          is_activated: true
        }
      });

      if (!user) {
        return response.status(400).json({
          error: true,
          message: 'Usuário e/ou senha inválido'
        });
      }

      const comparePassword = await compare(password, user.password);

      if (!comparePassword) {
        return response.status(400).json({
          error: true,
          message: 'Usuário e/ou senha inválido'
        });
      }

      const id: string = user.id.toString();

      const token = sign(
        {
          username: user.username,
        },
        process.env.KEY_SECRET,
        {
          subject: id,
          expiresIn: '1d',
        },
      );

      delete user.password;

      return response.status(200).json({ user, token });
    } catch (err: any) {
      return response.status(500).json({
        error: true,
        message: `Ocorreu um erro ao efetuar o login: ${err.message}`
      });
    }
  }
}

export default new SignInController();