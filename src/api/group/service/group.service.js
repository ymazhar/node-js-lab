import GroupModel from '../models/group.model.js';
import { isRecordExist } from '../../../utils/isRecordExist.js';
import userGroupModel from '../models/user-group.model.js';
import { GroupEmptyTableError, GroupExistError, GroupNotExistError } from '../../../lib/error.js';


export async function createGroup(data) {
    const { name } = data;
    const isGroupExistInDatabase = await isRecordExist(GroupModel, { name });

    if (isGroupExistInDatabase) {
        return new GroupExistError(`Group with name: ${name}, already exist`);
    }

    const group = await GroupModel.create(data);

    return group.toJSON();
}

export async function updateGroup(id, data) {
    const group = await GroupModel.findByPk(id);
    await group.set(data);
    await group.save();

    return group.toJSON();
}

export async function getGroup(id) {
    const group = await GroupModel.findByPk(id);

    if (!group) {
        return new GroupNotExistError(`Cannot find a group with exist id: ${id}`);
    }
    return group.toJSON();
}

export async function getAllGroups() {
    const group = await GroupModel.findAll({
        paranoid: false
    });

    if (!group.length) {
        return new GroupEmptyTableError('Group table is empty');
    }
    return group;
}

export async function deleteGroup(id) {
    const statusGroup = await GroupModel.destroy({
        where: { id }
    });
    if (statusGroup) {
        return `Group with id: ${id} was successfully soft deleted`;
    }
    return new GroupNotExistError(`Group with id: ${id} doesn't exist`);
}

export async function addUsersToGroup(data, transaction) {
    try {
        const userGroupRow = await userGroupModel.create(data, { transaction });
        await transaction.commit();
        return userGroupRow.toJSON();
    } catch (error) {
        await transaction.rollback();
        throw new Error(error);
    }
}
