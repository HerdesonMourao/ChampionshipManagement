import { Request, Response } from "express";
import { CreateUserDTO, createUserRequestSchema, UpdateUserDTO, updateUserRequestSchema } from '../dtos';
import { prismaClient } from '../database';
import { hash } from 'bcryptjs';

class UserController {
  public async store(request: Request, response: Response) {
    try {
      await createUserRequestSchema.validate(request.body, {
        abortEarly: false
      });
    } catch (err: any) {
      return response.status(400).json({
        error: true,
        message: err.errors
      });
    }

    try {
      const {
        name,
        email,
        username,
        password,
        avatar
      }: CreateUserDTO = request.body;

      const encryptedpassword = await hash(password, 10);
      
      const createUser = await prismaClient.user.create({
        data: {
          name,
          email,
          username,
          password: encryptedpassword,
          avatar
        }
      });

      return response.status(201).json({
        message: 'Usuário cadastrado com sucesso'
      });
    } catch (err: any) {
      return response.status(500).json({
        error: true,
        message: `Ocorreu um erro ao tentar cadastrar um usuário: ${err.message}`
      });
    }
  }

  public async index(request: Request, response: Response) {
    try {
      const listUsers = await prismaClient.user.findMany({
        where: {
          is_activated: true
        }
      });

      return response.status(200).json(listUsers);
    } catch (err: any) {
      return response.status(500).json({
        error: true,
        message: `Ocorreu um erro ao exibir os usuários cadastrados no sistema: ${err.message}`
      });      
    }
  }

  public async show(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const verifyId = await prismaClient.user.findFirst({
        where: {
          id: Number(id),
          is_activated: true
        }
      });

      if(!verifyId) {
        return response.status(404).json({ message: 'Usuário não existe'})
      }
      
      return response.status(201).json(verifyId);
    } catch (err: any) {
      return response.status(500).json({
        error: true,
        message: `Ocorreu um erro ao exibir o usuários informado: ${err.message}`
      });
    }
  }

  public async update(request: Request, response: Response) {
    try {
      await updateUserRequestSchema.validate(request.body, {
        abortEarly: false
      });
    } catch (err: any) {
      return response.status(400).json({
        error: true,
        message: err.errors
      });
    }

    try {
      const { id } = request.params;

      const {
        name,
        email,
        username,
        avatar
      }: UpdateUserDTO = request.body;

      const searchUser = await prismaClient.user.findFirst({
        where: {
          id: Number(id),
          is_activated: true
        }
      });

      if(!searchUser){
        return response.status(404).json({
          message: `Usuário não foi encontrado`
        });
      }

      const updateUser = await prismaClient.user.update({
        where: {
          id: Number(id)
        },
        data: {
          name,
          email,
          username,
          avatar
        }
      });

      return response.status(201).json({
        message: 'Usuário atualizado com sucesso'
      });
    } catch (err: any) {
      return response.status(500).json({
        error: true,
        message: `Ocorreu um erro ao atualizar o cadastro de um usuário: ${err.message}`
      })
    }
  }
  
  public async destroy(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const searchUser = await prismaClient.user.findFirst({
        where: {
          id: Number(id),
          is_activated: true
        }
      });

      if(!searchUser){
        return response.status(404).json({
          message: `Usuário não foi encontrado`
        });
      }
      
      const destroyUser = await prismaClient.user.update({
        where: {
          id: Number(id)
        },
        data: {
          is_activated: false
        }
      });

      return response.status(201).json({
        message: 'Usuário deletado com sucesso'
      });
    } catch (err: any) {
      return response.status(500).json({
        error: true,
        message: `Ocorreu um erro ao deletar o cadastro de um usuário: ${err.message}`
      })
    }
  }
}

export default new UserController();