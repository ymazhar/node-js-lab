import Joi from 'joi';

export const userSchema = {
    body: Joi.object({
        login: Joi.string().required(),
        password: Joi.string().required().alphanum(),
        age: Joi.number()
            .required()
            .integer()
            .min(4)
            .max(130)
    })
};

export const userIdSchema = {
    params: Joi.object({
        id: Joi.string().guid()
    })
};

export const userAutoSuggestionSchema = {
    query: Joi.object({
        limit: Joi.number().integer(),
        login: Joi.string()
    })
};
