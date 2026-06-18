import { JwtService } from '../services/jwt.service.js';

export class AuthController {
    /**
     * Simula un servidor de autenticación que genera un token.
     */
    static async generateToken(req, res) {
        const { username, password } = req.body;

        if (username !== 'Fred' || password !== 'mecomi2manzanas') {
            return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
        }

        try {
            const payload = { sub: username, role: 'admin' };
            const token = JwtService.signToken(payload);
            res.json({ token });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}
