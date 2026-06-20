import dotenv from 'dotenv';
import fs from 'fs';
import pkg from '../package.json' with { type: 'json' };

dotenv.config();

export const config = {
    PORT: process.env.PORT || 3000,
    JWT_SECRET: process.env.JWT_SECRET,
    PRIVATE_KEY: process.env.PRIVATE_KEY_PATH ? fs.readFileSync(process.env.PRIVATE_KEY_PATH, 'utf8') : null,
    PUBLIC_KEY: process.env.PUBLIC_KEY_PATH ? fs.readFileSync(process.env.PUBLIC_KEY_PATH, 'utf8') : null,
    ALGORITHM: process.env.JWT_ALGORITHM || 'HS256', // 'HS256' o 'RS256'
    SENTRY_DSN: process.env.SENTRY_DSN || '',
    SENTRY_RELEASE: process.env.SENTRY_RELEASE || `${pkg.name}@${pkg.version}`,
    ENVIRONMENT: process.env.NODE_ENV || 'development',
};
