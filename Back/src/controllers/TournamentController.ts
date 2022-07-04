import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { prismaClient } from "../database";
import { CreateTournamentDTO, createTournamentRequestSchema, UpdateTournamentDTO, updateTournamentRequestSchema } from "../dtos";

class TournamentController {
  public async store(request: Request, response: Response){
    try {
      await createTournamentRequestSchema.validate(request.body, {
        abortEarly: false
      })
    } catch (err: any) {
      return response.status(400).json({
        error: true,
        message: err.errors
      });
    }

    try {
      const {
        created_by,
        name,
        description,
        number_teams,
        awards,
        sport,
        type,
        status
      }: CreateTournamentDTO = request.body;

      const verifyUser = await prismaClient.user.findFirst({
        where: {
          id: Number(created_by),
          is_activated: true
        }
      });

      if(!verifyUser){
        return response.status(404).json({ message: 'Usuário não existe'})
      }

      const createTournament = await prismaClient.tournament.create({
        data: {
          created_by: Number(created_by),
          name,
          description,
          number_teams: Number(number_teams),
          awards: new Prisma.Decimal(awards),
          sport,
          type,
          status
        }
      });

      return response.status(201).json({
        message: 'Torneio cadastrado com sucesso'
      });
    } catch (err: any) {
      return response.status(500).json({
        error: true,
        message: `Ocorreu um erro ao tentar cadastrar um torneio: ${err.message}`
      });
    }
  }

  public async index(request: Request, response: Response){
    try {
      const listTournament = await prismaClient.tournament.findMany({
        where: {
          is_activated: true
        }
      });

      return response.status(200).json(listTournament);
    } catch (err: any) {
      return response.status(500).json({
        error: true,
        message: `Ocorreu um erro ao exibir os torneios cadastrados no sistema: ${err.message}`
      });   
    }
  }
  
  public async show(request: Request, response: Response){
    try {
      const { id } = request.params;

      const verifyId = await prismaClient.tournament.findFirst({
        where: {
          id: Number(id),
          is_activated: true
        }
      });

      if(!verifyId){
        return response.status(404).json({ message: 'Torneio não existe'})
      }

      return response.status(201).json(verifyId);
    } catch (err: any) {
      return response.status(500).json({
        error: true,
        message: `Ocorreu um erro ao exibir o torneio informado: ${err.message}`
      });
    }
  }

  public async update(request: Request, response: Response){
    try {
      await updateTournamentRequestSchema.validate(request.body, {
        abortEarly: true
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
        description,
        number_teams,
        awards,
        sport,
        type,
        status
      }: UpdateTournamentDTO = request.body;

      const searchTournament = await prismaClient.tournament.findFirst({
        where: {
          id: Number(id),
          is_activated: true
        }
      });

      if(!searchTournament){
        return response.status(404).json({
          message: `Torneio não foi encontrado`
        });
      }

      const updateTournament = await prismaClient.tournament.update({
        where: {
          id: Number(id),
        },
        data: {
          name,
          description,
          number_teams,
          awards,
          sport,
          type,
          status
        }
      });

      return response.status(201).json({
        message: 'Torneio atualizado com sucesso'
      });
    } catch (err: any) {
      return response.status(500).json({
        error: true,
        message: `Ocorreu um erro ao atualizar o torneio: ${err.message}`
      })
    }
  }

  public async destroy(request: Request, response: Response){
    try {
      const { id } = request.params;

      const searchTournament = await prismaClient.tournament.findFirst({
        where: {
          id: Number(id),
          is_activated: true
        }
      });

      if(!searchTournament){
        return response.status(404).json({
          message: `Torneio não foi encontrado`
        });
      }
      
      const destroyTournament = await prismaClient.tournament.update({
        where: {
          id: Number(id)
        },
        data: {
          is_activated: false
        }
      });

      return response.status(201).json({
        message: 'Torneio deletado com sucesso'
      });
    } catch (err: any) {
      return response.status(500).json({
        error: true,
        message: `Ocorreu um erro ao deletar o torneio: ${err.message}`
      })
    }
  }
}

export default new TournamentController();