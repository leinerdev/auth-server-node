const moongose = require('mongoose');

const dbConnection = async () => {
  try {
    await moongose.connect(process.env.DB_CNN, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    console.log('BBDD Online...');
  } catch (error) {
    console.log(error);
    throw new Error('Error a la hora de inicializar la base de datos');
  }
};

module.exports = {
    dbConnection
}
