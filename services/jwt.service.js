import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

export class JwtService {
    /**
     * Firma un token JWT basándose en el algoritmo configurado.
     * @param {Object} payload - Los datos del usuario a incluir en el token.
     * @returns {string} El token JWT generado.
     */
    static signToken(payload) {
        const isRS256 = config.ALGORITHM === 'RS256';
        const secret = isRS256 ? config.PRIVATE_KEY : config.JWT_SECRET;
        return jwt.sign(payload, secret, { algorithm: config.ALGORITHM, expiresIn: '1h' });
    }

    /**
     * Verifica un token JWT basándose en el algoritmo configurado.
     * @param {string} token - El token JWT a verificar.
     * @returns {Object|null} El payload decodificado o null si es inválido.
     */
    static verifyToken(token) {
        try {
            const isRS256 = config.ALGORITHM === 'RS256';
            const secret = isRS256 ? config.PUBLIC_KEY : config.JWT_SECRET;
            return jwt.verify(token, secret, { algorithms: [config.ALGORITHM] });
        } catch {
            return null;
        }
    }
}
