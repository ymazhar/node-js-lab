import { Router } from 'express';
import {
    createGroupController,
    getGroupController,
    getAllGroupsController,
    updateGroupController,
    deleteGroupController,
    addUserGroupController
} from './controllers/group.controller.js';
const groupRouter = Router();

groupRouter.post('/', createGroupController);

groupRouter.put('/:id', updateGroupController);

groupRouter.get('/:id', getGroupController);

groupRouter.get('/', getAllGroupsController);

groupRouter.delete('/:id', deleteGroupController);

groupRouter.post('/adduser', addUserGroupController);

export default groupRouter;
