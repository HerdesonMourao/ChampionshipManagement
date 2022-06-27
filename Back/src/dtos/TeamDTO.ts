import * as yup from 'yup';

export interface CreateTeamDTO {
  name: string;
  shield_image: string;
  abbreviation: string;
  players: any;
}

export const createTeamRequestSchema = yup.object({
  name: yup.string().required(),
  shield_image: yup.string().nullable(),
  abbreviation: yup.string().required(),
  players: yup.array().nullable()
})