import { Router } from "express";
import TournamentController from "../controllers/TournamentController";

const routes = Router();

routes.post('/', TournamentController.store);
routes.get('/', TournamentController.index);
routes.get('/:id', TournamentController.show);
routes.put('/:id', TournamentController.update);
routes.delete('/:id', TournamentController.destroy);

export default routes;