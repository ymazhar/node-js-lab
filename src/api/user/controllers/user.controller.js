import {
    createUser,
    deleteUser,
    getUser,
    updateUser,
    getAutoSuggestUsers
} from '../service/user.service.js';
import { asyncHandler } from '../../../middleware/async-handler.midleware.js';
import { userIdSchema, userAutoSuggestionSchema, userSchema } from '../schema/user.schema.js';

export const createUserController = asyncHandler('Create - User - Controller', userSchema, async (req) => {
    const body = req.body;
    const user = await createUser(body);

    return {
        json: user,
        status: 200
    };
});

export const getUserController = asyncHandler('Get - User - Controller', userIdSchema, async (req) => {
    const userId = req.params.id;
    const user = await getUser(userId);

    return {
        json: user,
        status: 200
    };
});

export const updateUserController = asyncHandler('Update - User - Controller', userIdSchema, async (req) => {
    const userId = req.params.id;
    const body = req.body;
    const user = await updateUser(userId, body);

    return {
        json: user,
        status: 200
    };
});

export const deleteUserController = asyncHandler('Delete - User - Controller', userIdSchema, async (req) => {
    const userId = req.params.id;
    const user = await deleteUser(userId);

    return {
        json: user,
        status: 200
    };
});

export const getAutoSuggestUsersController = asyncHandler('Get Auto Suggest - User - Controller', userAutoSuggestionSchema, async (req) => {
    const login = req.query.login || 'admin';
    const limit = Number(req.query.limit) || 5;

    const users = await getAutoSuggestUsers(login, limit);

    return {
        json: users,
        status: 200
    };
});
