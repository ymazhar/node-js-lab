import {
    createUserController,
    deleteUserController,
    getAutoSuggestUsersController,
    getUserController,
    updateUserController
} from './controllers/user.controller.js';
import { Router } from 'express';

const userRouter = Router();

userRouter.get('/autosuggest?', getAutoSuggestUsersController);

userRouter.get('/:id', getUserController);

userRouter.post('', createUserController);

userRouter.put('/:id', updateUserController);

userRouter.delete('/:id', deleteUserController);

export default userRouter;
