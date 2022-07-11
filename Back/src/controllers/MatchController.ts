import { Request, Response } from "express";
import { prismaClient } from "../database";
import { CreateMatchDTO, createMatchRequestSchema } from "../dtos";

class MatchController {
  public async store(request: Request, response: Response){
    try {
      await createMatchRequestSchema.validate(request.body, {
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
        id_tournament,
        date,
        time,
        place,
        id_team_a,
        id_team_b,
        scoreboard
      }: CreateMatchDTO = request.body;

      const verifyIdTeamA = await prismaClient.team.findFirst({
        where: {
          id: Number(id_team_a),
          is_activated: true
        }
      })
      
    } catch (err: any) {
      return response.status(500).json({
        error: true,
        message: `Ocorreu um erro ao tentar cadastrar uma partida: ${err.message}`
      })
    }
  }
}

export default new MatchController();