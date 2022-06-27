import * as yup from 'yup';

export interface CreateChampionshipDTO {
    name: string;
    email: string;
    organizer: string;
    city: string;
    startdate: string;
    enddate: string;
    format: string;
  }
  
  export interface UpdateChampionshipDTO {
    name: string;
    email: string;
    organizer: string;
    city: string;
    startdate: string;
    enddate: string;
    format: string;
  }
  
  export const createChampionshipRequestSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().required(),
    organizer: yup.string().required(),
    city: yup.string().required(),
    startdate: yup.string().required(),
    enddate: yup.string().required(),
    format: yup.string().required()

  });
  
  export const updateChampionshipRequestSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().required(),
    organizer: yup.string().required(),
    city: yup.string().required(),
    startdate: yup.string().required(),
    enddate: yup.string().required(),
    format: yup.string().required()

  });