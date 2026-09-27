import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-cybernexo';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export const requireAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No autorizado. Token faltante.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET as string) as jwt.JwtPayload;
    if (decoded && decoded.id && decoded.email) {
      req.user = { id: decoded.id as string, email: decoded.email as string };
      next();
    } else {
      return res.status(401).json({ message: 'Estructura de token inválida.' });
    }
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido o expirado.' });
  }
};
