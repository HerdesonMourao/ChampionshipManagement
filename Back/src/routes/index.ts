import { Router } from 'express';
import user from './User.routes';

const routes = Router();

routes.use('/user', user);

export default routes;