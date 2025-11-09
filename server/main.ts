import express, { Application, Response } from 'express';
import { errorHandler } from './src/utils/error-handler';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import config from './src/config';
import swaggerJsdoc from 'swagger-jsdoc';
import { requestLogger } from './src/middleware/request-logger.middleware';
import TodoRoutes from './src/routes/todo.routes';
import mongoose from 'mongoose';
import logger from './src/utils/logger';

const app: Application = express();
app.use(express.json());
app.use(cors());

const limiter = rateLimit({
  windowMs: config.security.rateLimit.windowMs,
  max: config.security.rateLimit.max,
});
app.use(limiter);

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Todo App API',
      version: '1.0.0',
      description: 'API documentation for the Todo App',
    },
    servers: [
      {
        url: `http://localhost:${config.app.port}${config.app.basePath}`,
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/dtos/**/*.ts'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use(
  `${config.app.basePath}${config.app.swaggerPath}`,
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);
app.use(requestLogger);

app.use(config.app.basePath + '/todos', TodoRoutes);

app.get(config.app.basePath + '/health', (_, res: Response) => {
  res.send('Server is running');
});

app.use(errorHandler);

const startServer = async () => {
  try {
    await mongoose.connect(config.mongo.uri);
    logger.info('Connected to MongoDB');

    app.listen(config.app.port, () => {
      logger.info(
        `Server running at http://localhost:${config.app.port}${config.app.basePath}`
      );
      logger.info(
        `Swagger docs at http://localhost:${config.app.port}${config.app.basePath}${config.app.swaggerPath}`
      );
    });
  } catch (err) {
    logger.error('Failed to start server: ' + (err as Error).message);
    process.exit(1);
  }
};

startServer();
