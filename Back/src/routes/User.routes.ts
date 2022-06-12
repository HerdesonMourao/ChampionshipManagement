import { Router } from "express";
import UserController from "../controllers/UserController";
import SignInController from "../controllers/SignInController";

const routes = Router();

routes.post('/', UserController.store);
routes.get('/', UserController.index);
routes.get('/:id', UserController.show);
routes.put('/:id', UserController.update);
routes.delete('/:id', UserController.destroy);

routes.post('/acess', SignInController.store);

export default routes;