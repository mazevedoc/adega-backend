const express = require('express');
const router = express.Router();
const autenticarToken = require('../middlewares/authMiddleware');
const autorizarPorPapel = require('../middlewares/roleMiddleware');

// Apenas usuários com papel 'admin' ou 'gerente' podem acessar
router.get('/admin/painel', autenticarToken, autorizarPorPapel('admin', 'gerente'), (req, res) => {
    res.json({
        mensagem: 'Bem-vindo ao painel administrativo!',
        usuario: req.usuario
    });
});

module.exports = router;
