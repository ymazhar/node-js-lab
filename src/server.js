import { queryParser } from 'express-query-parser';
import express from 'express';
import { openConnection } from './data-access/db.js';
import config from './config/index.js';
import rootRouter from './api/root-router.js';
import { logger } from './lib/logger.js';
import { logError, logErrorMiddleware, returnError } from './lib/error.js';

async function initialize() {
    const app = express();

    app.use(
        queryParser({
            parseNull: true,
            parseUndefined: true,
            parseBoolean: true,
            parseNumber: true
        })
    );

    app.use(express.json());

    app.use(async (req, res, next) => {
        logger.info(`Request url: ${req.originalUrl}`);
        res.on('finish', () => logger.info(`Response status: ${res.statusCode}`));
        next();
    });

    app.use('/', rootRouter);

    app.listen(config.PORT, () => {
        logger.info(`App listening on port ${config.PORT}`);
    });

    process.on('unhandledRejection', error => {
        logError(error);
    });

    process.on('uncaughtException', error => {
        logError(error);
        process.exit(1);
    });

    app.use(logErrorMiddleware);
    app.use(returnError);

    await openConnection();
}

initialize();
