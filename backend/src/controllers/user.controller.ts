import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middlewares/auth.middleware';

const prisma = new PrismaClient();

export const addExperience = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { missionId, xpGained, accuracy, hintsUsed, errors } = req.body;

    if (!userId) return res.status(401).json({ message: 'Usuario no autenticado' });
    if (typeof xpGained !== 'number' || xpGained <= 0) {
      return res.status(400).json({ message: 'Cantidad de XP inválida' });
    }

    const result = await prisma.$transaction(async (tx: any) => {
      const user = await tx.user.findUnique({ where: { id: userId } });
      if (!user) throw new Error('Usuario no encontrado');

      // 1. Guardar el intento para analíticas (Sección 55)
      if (missionId) {
        await tx.missionAttempt.create({
          data: {
            userId,
            missionId,
            score: xpGained,
            accuracy: accuracy || 0,
            hintsUsed: hintsUsed || 0,
          }
        });
      }

      // 2. Actualizar progreso del jugador
      const newXp = user.xp + xpGained;
      const newLevel = Math.floor(newXp / 500) + 1; // 500 XP = 1 Nivel

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
    console.error('Error in addExperience:', error);
    return res.status(500).json({ message: 'Error interno al actualizar XP' });
  }
};

// Fase 9: Sistema de Ranking (Leaderboard)
export const getLeaderboard = async (req: AuthRequest, res: Response) => {
  try {
    const topUsers = await prisma.user.findMany({
      take: 10,
      orderBy: [
        { level: 'desc' },
        { xp: 'desc' }
      ],
      select: {
        id: true,
        name: true,
        level: true,
        xp: true
      }
    });

    return res.status(200).json(topUsers);
  } catch (error) {
    console.error('Error in getLeaderboard:', error);
    return res.status(500).json({ message: 'Error al obtener el ranking' });
  }
};
