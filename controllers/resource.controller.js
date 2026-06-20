import * as Sentry from '@sentry/node';

export class ResourceController {
    /**
     * Simula un recurso privado del Microservicio Alpha.
     */
    static getAlphaPrivateData(req, res) {
        throw new Error("Error en la conexión a la base de datos el Microservicio Alpha");
        //res.json({ message: 'Acceso exitoso al Microservicio Alpha', user: req.user });
    }

    /**
     * Simula un recurso privado del Microservicio Beta.
     */
    static getBetaPrivateData(req, res, next) {
        try {
            throw new Error('Ocurrió un error inesperado en el Microservicio Beta');
            //res.json({ message: 'Acceso exitoso al Microservicio Beta', user: req.user });
        } catch (err) {
            const user = req.user ?? {};

            Sentry.captureException(err, {
                tags: {
                    microservice: 'beta',
                    method: 'get private data',
                },
                extra: {
                    user: user.sub ?? user.id ?? 'desconocido',
                    emitedAt: user.iat ? new Date(user.iat * 1000).toISOString() : null,
                    expiresAt: user.exp ? new Date(user.exp * 1000).toISOString() : null,
                },
            });

            next(err);
        }
    }
}
