import { Router } from 'express';
import userRouter from './userRouter.mjs';

const router = Router();

router.get('/test', (req, res) => {
  const message = 'Esta es una ruta de prueba para Insomnia';
  res.status(200).json({ message });
});

export default router;
