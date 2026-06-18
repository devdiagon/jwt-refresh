import { JwtService } from '../services/jwt.service.js';

export class AuthController {
    /**
     * Simula un servidor de autenticación que genera un token.
     */
    static async generateToken(req, res) {
        const { username, password } = req.body;

        if (username !== 'admin' || password !== 'admin123') {
            return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
        }

        const payload = { sub: username, role: 'admin' };
        const token = JwtService.signToken(payload);
        res.json({ token });
    }
}
