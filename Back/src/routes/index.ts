import { Router } from 'express';
import user from './User.routes';
import team from './Team.routes';
import tournament from './Tournament.routes';

const routes = Router();

routes.use('/user', user);
routes.use('/team', team);
routes.use('/tournament', tournament);

export default routes;