import { JwtService } from '../services/jwt.service.js';

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!token) return res.status(401).json({ message: 'Token no proporcionado' });

    const payload = JwtService.verifyToken(token);

    if (!payload) return res.status(403).json({ message: 'Token inválido o expirado' });

    req.user = payload;
    next();
};
