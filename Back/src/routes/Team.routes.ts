import { Router } from "express";
import TeamController from "../controllers/TeamController";

const routes = Router();

routes.post('/', TeamController.store);
routes.get('/', TeamController.index);
routes.get('/:id', TeamController.show);
routes.put('/:id', TeamController.update);
routes.delete('/:id', TeamController.destroy);

export default routes;