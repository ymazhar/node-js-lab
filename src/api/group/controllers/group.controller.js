import {
    createGroup,
    updateGroup,
    getGroup,
    getAllGroups,
    deleteGroup, addUsersToGroup
} from '../service/group.service.js';
import db from '../../../data-access/db.js';
import { asyncHandler } from '../../../middleware/async-handler.midleware.js';
import { groupSchema, groupAddUserSchema, groupIdSchema } from '../schema/group.schema.js';

export const createGroupController = asyncHandler('Create - Group - Controller', groupSchema, async (req) => {
    const body = req.body;
    const group = await createGroup(body);

    return {
        json: group,
        status: 200
    };
});

export const updateGroupController = asyncHandler('Update - Group - Controller', groupIdSchema, async (req) => {
    const groupId = req.params.id;
    const body = req.body;
    const group = await updateGroup(groupId, body);

    return {
        json: group,
        status: 200
    };
});

export const getGroupController = asyncHandler('Get - Group - Controller', groupIdSchema, async (req) => {
    const groupId = req.params.id;
    const group = await getGroup(groupId);

    return {
        json: group,
        status: 200
    };
});

export const getAllGroupsController = asyncHandler('Get All - Group - Controller', {}, async () => {
    const groups = await getAllGroups();

    return {
        json: groups,
        status: 200
    };
});

export const deleteGroupController = asyncHandler('Delete - Group - Controller', groupIdSchema, async (req) => {
    const groupId = req.params.id;
    const group = await deleteGroup(groupId);

    return {
        json: group,
        status: 200
    };
});

export const addUserGroupController = asyncHandler('Add User Group - Group - Controller', groupAddUserSchema, async (req) => {
    const transaction = await db.transaction();
    const { user_id, group_id } = req.body;
    const userGroup = await addUsersToGroup({ user_id, group_id }, transaction);

    return {
        json: userGroup,
        status: 200
    };
});
