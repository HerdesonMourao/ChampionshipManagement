import * as yup from 'yup';

export interface CreateMatchDTO {
  id_tournament: number;
  date: Date;
  time: Date;
  place: string;
  id_team_a: number;
  id_team_b: number;
  scoreboard: string;
}

export const createMatchRequestSchema = yup.object({
  id_tournament: yup.number().required(),
  date: yup.date().required(),
  time: yup.date().required(),
  place: yup.string().required(),
  id_team_a: yup.number().required(),
  id_team_b: yup.number().required(),
  scoreboard: yup.string().required()
})