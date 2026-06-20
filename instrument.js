import { config } from './config/env.js';
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: config.SENTRY_DSN,
  environment: config.ENVIRONMENT,
  release: config.SENTRY_RELEASE,
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
  sendDefaultPii: false,
  enabled: Boolean(process.env.SENTRY_DSN),
  integrations: [
    Sentry.httpIntegration(),
    Sentry.expressIntegration(),
  ],
});
