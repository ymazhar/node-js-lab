import { SchemaValidationFailedError } from '../lib/error.js';

export function asyncHandler(name, schema, handler) {
    return (req, res, next) => {
        if (schema.body) {
            const { error } = schema.body.validate(req.body, {
                abortEarly: false,
                allowUnknown: false
            });

            if (error && error.isJoi) {
                return next(new SchemaValidationFailedError('Request Body is not valid', error.details, name));
            }
        }

        if (schema.params) {
            const { error } = schema.params.validate(req.params, {
                abortEarly: false,
                allowUnknown: false
            });

            if (error && error.isJoi) {
                return next(new SchemaValidationFailedError('Request params is not valid', error.details, name));
            }
        }

        if (schema.query) {
            const { error } = schema.query.validate(req.query, {
                abortEarly: false,
                allowUnknown: false
            });

            if (error && error.isJoi) {
                return next(new SchemaValidationFailedError('Request query is not valid', error.details, name));
            }
        }

        handler(req)
            .then(({ status, json }) => {
                return res.status(status).json(json);
            })
            .catch(next);
    };
}
