const jwt = require("jsonwebtoken");

const generateJWT = (uid, name) => {
  const payload = { uid, name };

  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      {
        expiresIn: "24h",
      },
      (err, token) => {
        if (err) {
          // TODO MAL
          console.log(err);
          reject(err);
        } else {
          // TODO BIEN
          console.log(token);
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generateJWT,
};
