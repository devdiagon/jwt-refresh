import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

const SUPPORTED_ALGORITHMS = ['HS256', 'RS256'];

function resolveSecret(algorithm, type) {
    if (!SUPPORTED_ALGORITHMS.includes(algorithm)) {
        throw new Error(`Algoritmo no soportado: ${algorithm}`);
    }

    if (algorithm === 'RS256') {
        const key = type === 'sign' ? config.PRIVATE_KEY : config.PUBLIC_KEY;
        const keyName = type === 'sign' ? 'PRIVATE_KEY_PATH' : 'PUBLIC_KEY_PATH';
        if (!key) throw new Error(`RS256 requiere ${keyName} configurado`);
        return key;
    }

    if (!config.JWT_SECRET) throw new Error('HS256 requiere JWT_SECRET configurado');
    return config.JWT_SECRET;
}

export class JwtService {
    /**
     * Firma un token JWT basándose en el algoritmo configurado.
     * @param {Object} payload - Los datos del usuario a incluir en el token.
     * @returns {string} El token JWT generado.
     */
    static signToken(payload) {
        const secret = resolveSecret(config.ALGORITHM, 'sign');
        return jwt.sign(payload, secret, { algorithm: config.ALGORITHM, expiresIn: '1m' });
    }

    /**
     * Verifica un token JWT basándose en el algoritmo configurado.
     * @param {string} token - El token JWT a verificar.
     * @returns {Object|null} El payload decodificado o null si es inválido.
     */
    static verifyToken(token) {
        const secret = resolveSecret(config.ALGORITHM, 'verify');
        try {
            return jwt.verify(token, secret, { algorithms: [config.ALGORITHM] });
        } catch {
            return null;
        }
    }
}
