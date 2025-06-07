import express from 'express';
import { validarErros } from '../../middlewares/validationMiddleware.js';
import { regrasDeRegistro, regrasDeLogin } from './authValidator.js';
import * as authController from './authController.js';

const router = express.Router();

router.post('/register', regrasDeRegistro, validarErros, authController.registrar);

router.post('/login', regrasDeLogin, validarErros, authController.login);

export default router;