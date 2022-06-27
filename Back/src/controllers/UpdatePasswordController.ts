import { Request, Response } from 'express';
import { prismaClient } from '../database';

class UpdatePasswordController {
  public async store(request: Request, response: Response){
    try {
      const { id } = request.params;

      const { password } = request.body;

      const verifyId = await prismaClient.user.findFirst({
        where: {
          id: Number(id),
          is_activated: true
        }
      });
      
      if(!verifyId){
        return response.status(404).json({
          message: `Usuário não foi encontrado`
        });
      }
      const updatePassword = await prismaClient.user.update({
        where: {
          id: Number(id)
        },
        data: {
          password: password
        }
      });

      return response.status(201).json({
        message: 'Senha atualizada com sucesso'
      });
    } catch (err: any) {
      return response.status(500).json({
        error: true,
        message: `Ocorreu um erro ao tentar atualizar a senha de um usuário: ${err.message}`
      });
    }
  }
}

export default new UpdatePasswordController();