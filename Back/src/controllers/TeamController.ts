import { Request, Response } from 'express';
import { CreateTeamDTO, createTeamRequestSchema } from '../dtos';
import { prismaClient } from '../database';

class TeamController {
  public async store(request: Request, response: Response){
    try {
      await createTeamRequestSchema.validate(request.body, {
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
        shield_image,
        abbreviation,
        players
      }: CreateTeamDTO  = request.body;

      const createTeam = await prismaClient.team.create({
        data: {
          name,
          shield_image,
          abbreviation
        }
      });

      for(let i = 0; i < players.length; i++){
        const verifyPlayer = await prismaClient.user.findFirst({
          where: {
            id: players[i].id_player,
            is_activated: true
          }
        });

        if(!verifyPlayer){
          return response.status(400).json({ message: 'Jogador não encontrado' });
        }
        
        const createPlayer = await prismaClient.team_Members.create({
          data: {
            id_team: Number(createTeam.id),
            id_player: Number(players[i].id_player),
            is_captain: players[i].is_captain
          }
        });
      }

      return response.status(201).json({ message: 'Equipe cadastrada com sucesso'});
    } catch (err: any) {
      return response.status(500).json({
        error: true,
        message: `Ocorreu um erro ao tentar cadastrar uma equipe: ${err.message}`
      })
    }
  }

  public async index(request: Request, response: Response){
    try {
      const listTeams = await prismaClient.team.findMany({
        where: {
          is_activated: true
        },
        include: {
          Team_Members: {
            where: {
              is_activated: true 
            },
            include: {
              id_users: true
            }
          },
        }
      });

      return response.status(200).json(listTeams);
    } catch (err: any) {
      return response.status(500).json({
        error: true,
        message: `Ocorreu um erro ao exibir as equipes cadastradas no sistema: ${err.message}`
      })
    }
  }

  public async show(request: Request, response: Response){
    try {
      const { id } = request.params;

      const verifyId = await prismaClient.team.findFirst({
        where: {
          id: Number(id),
          is_activated: true
        },
        include: {
          Team_Members: {
            where: {
              is_activated: true 
            },
            include: {
              id_users: true
            }
          },
        }
      });

      if(!verifyId){
        return response.status(404).json({ message: 'Equipe não existe'});
      }

      return response.status(201).json(verifyId);
    } catch (err: any) {
      return response.status(500).json({
        error: true,
        message: `Ocorreu um erro ao exibir a equipe informada: ${err.message}`
      })
    }
  }

  public async update(request: Request, response: Response){
    try {
      await createTeamRequestSchema.validate(request.body, {
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
        shield_image,
        abbreviation,
        players
      }: CreateTeamDTO  = request.body;

      const searchTeam = await prismaClient.team.findFirst({
        where: {
          id: Number(id),
          is_activated: true
        }
      });

      if(!searchTeam){
        return response.status(404).json({
          message: `Equipe não foi encontrada`
        });
      }

      const updateTeam = await prismaClient.team.update({
        where: {
          id: Number(id)
        },
        data: {
          name,
          shield_image,
          abbreviation
        }
      });

      for(let i = 0; i < players.length; i++){
        const verifyTeamMembers = await prismaClient.team_Members.findFirst({
          where: {
            id_team: Number(id),
            id_player: Number(players[i].id_player)
          }
        });

        if(!verifyTeamMembers){
          const verifyPlayer = await prismaClient.user.findFirst({
            where: {
              id: players[i].id_player,
              is_activated: true
            }
          });
  
          if(!verifyPlayer){
            return response.status(400).json({ message: 'Jogador não encontrado' });
          }
          
          const createPlayer = await prismaClient.team_Members.create({
            data: {
              id_team: Number(id),
              id_player: Number(players[i].id_player),
              is_captain: players[i].is_captain
            }
          });
        } else {
          if(verifyTeamMembers.is_activated == true){
            const updateTeamMembers = await prismaClient.team_Members.update({
              where: {
                id: Number(verifyTeamMembers.id)
              },
              data: {
                is_captain: players[i].is_captain
              }
            });
          } else {
            const updateTeamMembers = await prismaClient.team_Members.update({
              where: {
                id: Number(verifyTeamMembers.id)
              },
              data: {
                is_captain: players[i].is_captain,
                is_activated: true
              }
            })
          }
        }
      }

      return response.status(201).json({
        message: 'Equipe atualizada com sucesso'
      });
    } catch (err: any) {
      return response.status(500).json({
        error: true,
        message: `Ocorreu um erro ao tentar atualizar o cadsatro de uma equipe: ${err.message}`
      })
    }
  }

  public async destroy(request: Request, response: Response){
    try {
      const { id } = request.params;

      const searchTeam = await prismaClient.team.findFirst({
        where: {
          id: Number(id),
          is_activated: true
        }
      });

      if(!searchTeam){
        return response.status(404).json({
          message: `Equipe não foi encontrada`
        });
      }
      
      const destroyTeam = await prismaClient.team.update({
        where: {
          id: Number(id)
        },
        data: {
          is_activated: false
        }
      });

      return response.status(201).json({
        message: 'Equipe deletada com sucesso'
      });
    } catch (err: any) {
      return response.status(500).json({
        error: true,
        message: `Ocorreu um erro ao deletar o cadastro de uma equipe: ${err.message}`
      })
    }
  }
}

export default new TeamController();