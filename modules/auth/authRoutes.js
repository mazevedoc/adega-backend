import express from 'express';
import * as authController from './authController.js';

const router = express.Router();

router.post('/register', authController.registrarUsuario);
router.post('/login', authController.login);

export default router;
