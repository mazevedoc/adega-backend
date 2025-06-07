import express from 'express';

import authRoutes from '../modules/auth/authRoutes.js';
import userRoutes from '../modules/user/userRoutes.js';
import dashboardRoutes from '../modules/dashboard/dashboardRoutes.js';
// importe mais conforme crescer

const router = express.Router();

// Agrupar todas as rotas por prefixo
router.use('/auth', authRoutes);
router.use('/usuarios', userRoutes);
router.use('/dashboard', dashboardRoutes);

export default router;