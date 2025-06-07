import express from 'express';
import { autenticarToken, autorizarPorPapel } from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/admin/painel', autenticarToken, autorizarPorPapel('admin', 'gerente'), (req, res) => {
    res.json({
        mensagem: 'Bem-vindo ao painel administrativo!',
        usuario: req.usuario
    });
});

export default router;