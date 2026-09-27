import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middlewares/auth.middleware';

const prisma = new PrismaClient();

export const addExperience = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { xpGained } = req.body;

    if (!userId) return res.status(401).json({ message: 'Usuario no autenticado' });
    if (typeof xpGained !== 'number' || xpGained <= 0) {
      return res.status(400).json({ message: 'Cantidad de XP inválida' });
    }

    // Transacción para obtener usuario y actualizarlo atómicamente
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({ where: { id: userId } });
      if (!user) throw new Error('Usuario no encontrado');

      const newXp = user.xp + xpGained;
      
      // Lógica simple de nivel: 1 nivel por cada 500 XP
      const newLevel = Math.floor(newXp / 500) + 1;

      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: {
          xp: newXp,
          level: newLevel > user.level ? newLevel : user.level
        }
      });

      return {
        leveledUp: newLevel > user.level,
        user: { id: updatedUser.id, xp: updatedUser.xp, level: updatedUser.level }
      };
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error interno al actualizar XP' });
  }
};
