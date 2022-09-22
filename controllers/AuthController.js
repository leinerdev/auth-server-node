const { response } = require("express");
const { validationResult } = require("express-validator");
const User = require("../models/User");

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
    // Generar JWT
    // Crear usuario de BBDD
    await dbUser.save();

    // Generar respuesta exitosa
    return res.status(200).json({
      ok: true,
      uid: dbUser.id,
      name,
      msg: 'Usuario creado exitosamente'
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Por favor hable con el admnistrador",
    });
  }
};

const login = (req, res = response) => {
  console.log(req.body);

  return res.json({
    ok: true,
    msg: "Login de usuario /",
  });
};

const revalidateToken = (req, res = response) => {
  return res.json({
    ok: true,
    msg: "Renew",
  });
};

module.exports = {
  createUser,
  login,
  revalidateToken,
};
