const { response } = require("express");
const { validationResult } = require("express-validator");

const createUser = (req, res = response) => {
  console.log(req.body);

  return res.json({
    ok: true,
    msg: "Crear usuario /new",
  });
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
