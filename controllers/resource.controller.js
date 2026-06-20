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
    static getBetaPrivateData(req, res) {
        res.json({ message: 'Acceso exitoso al Microservicio Beta', user: req.user });
    }
}
