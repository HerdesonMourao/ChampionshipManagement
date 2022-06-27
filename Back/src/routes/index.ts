import { Router } from 'express';
import user from './User.routes';
import team from './Team.routes';

const routes = Router();

routes.use('/user', user);
routes.use('/team', team);

export default routes;