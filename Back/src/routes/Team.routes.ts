import { Router } from "express";
import RemoveTeamMemberController from "../controllers/RemoveTeamMemberController";
import TeamController from "../controllers/TeamController";

const routes = Router();

routes.post('/', TeamController.store);
routes.get('/', TeamController.index);
routes.get('/:id', TeamController.show);
routes.put('/:id', TeamController.update);
routes.delete('/:id', TeamController.destroy);

routes.post('/remove-member/:id', RemoveTeamMemberController.store);

export default routes;