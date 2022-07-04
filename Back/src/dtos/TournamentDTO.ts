import * as yup from 'yup';

enum StatusTypes {
  ABERTO = 'ABERTO',
  EM_ANDAMENTO = 'EM_ANDAMENTO',
  CONCLUIDO = 'CONCLUIDO',
  CANCELADO = 'CANCELADO'
}

export interface CreateTournamentDTO {
  created_by: number;
  name: string;
  description: string;
  number_teams: number;
  awards: number;
  sport: string;
  type: string;
  status: StatusTypes;
}

export interface UpdateTournamentDTO {
  name: string;
  description: string;
  number_teams: number;
  awards: number;
  sport: string;
  type: string;
  status: StatusTypes;
}

export const createTournamentRequestSchema = yup.object({
  created_by: yup.number().required(),
  name: yup.string().required(),
  description: yup.string().required(),
  number_teams: yup.number().required(),
  awards: yup.number().required(),
  sport: yup.string().required(),
  type: yup.string().required(),
  status: yup
    .string()
    .oneOf([StatusTypes.ABERTO, StatusTypes.EM_ANDAMENTO, StatusTypes.CONCLUIDO, StatusTypes.CANCELADO])
    .required(),
})

export const updateTournamentRequestSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  number_teams: yup.number().required(),
  awards: yup.number().required(),
  sport: yup.string().required(),
  type: yup.string().required(),
  status: yup
    .string()
    .oneOf([StatusTypes.ABERTO, StatusTypes.EM_ANDAMENTO, StatusTypes.CONCLUIDO, StatusTypes.CANCELADO])
    .required(),
})