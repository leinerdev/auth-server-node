const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, login, revalidateToken } = require('../controllers/AuthController');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

// Ruta, Middlewares, Controlador

// Create user
router.post('/new', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').isLength({min: 6}),
    validarCampos
], createUser);

// Login
router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').isLength({min: 6}),
    validarCampos
], login);


// Revalidate Token
router.get('/renew', revalidateToken);

module.exports =  router;