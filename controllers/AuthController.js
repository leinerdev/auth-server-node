const { response, request } = require("express");
const { validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt')

const createUser = async (req, res = response) => {
  const { email, name, password } = req.body;

  try {
    // Verificar Email
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario ya existe con ese email",
      });
    }

    // Crear usuario con el modelo
    const dbUser = new User(req.body);

    // Hashear contraseña
    const salt = bcrypt.genSaltSync(10);
    dbUser.password = bcrypt.hashSync(password, salt);

    // Generar JWT
    const token = await generateJWT(dbUser.id, name);

    // Crear usuario de BBDD
    await dbUser.save();

    // Generar respuesta exitosa
    return res.status(200).json({
      ok: true,
      uid: dbUser.id,
      name,
      msg: 'Usuario creado exitosamente',
      token
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Por favor hable con el admnistrador",
    });
  }
};

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const dbUser = await User.findOne({ email });
    if (!dbUser) {
      return res.json({
        ok: false,
        msg: 'El correo no existe'
      });
    }
    
    // Confirmar si el password hace match
    const validPassword = bcrypt.compareSync(password, dbUser.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'La contraseña no es válida'
      });
    }

    // Generar JWT
    const token = await generateJWT(dbUser.id, dbUser.name);

    // Respuesta del servicio
    return res.status(200).json({
      ok: true,
      uid: dbUser.id,
      name: dbUser.name,
      token
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    });
  }
};

const revalidateToken = async (req = request, res = response) => {
  const { uid, name } = req;
  const token = await generateJWT(uid, name);
  return res.json({
    ok: true,
    uid,
    name,
    token
  });
};

module.exports = {
  createUser,
  login,
  revalidateToken,
};
