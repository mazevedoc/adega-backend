import express from 'express';

import authRoutes from '../modules/auth/authRoutes.js';
import userRoutes from '../modules/user/userRoutes.js';
import productRoutes from '../modules/products/productRoutes.js';
import saleRoutes from '../modules/sales/saleRoutes.js';
import reportRoutes from '../modules/reports/reportRoutes.js';
import categoryRoutes from '../modules/categories/categoryRoutes.js';
import supplierRoutes from '../modules/supplier/supplierRoutes.js';
import clientRoutes from '../modules/clients/clientRoutes.js';
// importe mais conforme crescer

const router = express.Router();

// Agrupar todas as rotas por prefixo
router.use('/auth', authRoutes);
router.use('/usuarios', userRoutes);
router.use('/produtos', productRoutes);
router.use('/vendas', saleRoutes);
router.use('/relatorios', reportRoutes);
router.use('/categorias', categoryRoutes);
router.use('/fornecedores', supplierRoutes);
router.use('/clientes', clientRoutes);

export default router;