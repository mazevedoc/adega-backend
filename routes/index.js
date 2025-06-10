import express from 'express';

import authRoutes from '../modules/auth/authRoutes.js';
import userRoutes from '../modules/user/userRoutes.js';
import dashboardRoutes from '../modules/dashboard/dashboardRoutes.js';
import productRoutes from '../modules/products/productRoutes.js';
import saleRoutes from '../modules/sales/saleRoutes.js';
import reportRoutes from '../modules/reports/reportRoutes.js';
// importe mais conforme crescer

const router = express.Router();

// Agrupar todas as rotas por prefixo
router.use('/auth', authRoutes);
router.use('/usuarios', userRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/produtos', productRoutes);
router.use('/sales', saleRoutes);
router.use('/reports', reportRoutes);

export default router;