import { Request, Response } from "express";
import { prismaClient } from "../database";

class RemoveTeamMemberController {
  public async store(request: Request, response: Response){
    try {
      const { id } = request.params;

      const { id_team } = request.body;

      const removeMember = await prismaClient.team_Members.findFirst({
        where: {
          id: Number(id),
          id_team: Number(id_team),
          is_activated: true
        }
      });

      if(!removeMember){
        return response.status(404).json({
          error: true,
          message: 'Membro da equipe nao foi encontrado'
        });
      }

      const updateTeamMembers = await prismaClient.team_Members.update({
        where: {
          id: Number(id)
        },
        data: {
          is_activated: false
        }
      })

      return response.status(201).json({
        message: 'Membro da equipe removido com sucesso'
      });
    } catch (err: any) {
      return response.status(500).json({
        error: true,
        message: `Ocorreu um erro ao remover um membro da equipe: ${err.message}`
      });
    }
  }
}

export default new RemoveTeamMemberController();