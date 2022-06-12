import * as yup from 'yup';

export interface CreateUserDTO {
  name: string;
  email: string;
  username: string;
  password: string;
  avatar: string;
}

export interface UpdateUserDTO {
  name: string;
  email: string;
  username: string;
  avatar: string;
}

export const createUserRequestSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().required(),
  username: yup.string().required(),
  password: yup.string().required(),
  avatar: yup.string().nullable()
});

export const updateUserRequestSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().required(),
  username: yup.string().required(),
  avatar: yup.string().nullable()
});