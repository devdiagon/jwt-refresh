import './instrument.js';
import express from 'express';
import { config } from './config/env.js';
import * as Sentry from '@sentry/node';
import authRoutes from './routes/auth.routes.js';
import resourceRoutes from './routes/resource.routes.js';

const app = express();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/', resourceRoutes);

Sentry.setupExpressErrorHandler(app)

app.listen(config.PORT, () => {
    console.log(`Server running on http://localhost:${config.PORT}`);
});
