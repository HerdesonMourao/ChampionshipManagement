import * as yup from 'yup';

export interface CreateTournamentDTO {
  created_by: number;
  name: string;
  description: string;
  number_teams: number;
  awards: number;
  sport: string;
  type: string;
}

export interface UpdateTournamentDTO {
  name: string;
  description: string;
  number_teams: number;
  awards: number;
  sport: string;
  type: string;
}

export const createTournamentRequestSchema = yup.object({
  created_by: yup.number().required(),
  name: yup.string().required(),
  description: yup.string().required(),
  number_teams: yup.number().required(),
  awards: yup.number().required(),
  sport: yup.string().required(),
  type: yup.string().required()
})

export const updateTournamentRequestSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  number_teams: yup.number().required(),
  awards: yup.number().required(),
  sport: yup.string().required(),
  type: yup.string().required()
})