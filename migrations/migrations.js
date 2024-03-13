const mongodb = require('mongodb');
const migration = require('mongodb-migrations');

const MongoClient = mongodb.MongoClient;
const url = "process.env.DB_CNN";

const migrationUp = async () => {
  // Lógica para actualizar el esquema
  const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = client.db();

  // Ejemplo: cambiar la estructura del documento "usuario"
  await db.collection('usuario').updateMany({}, { $set: { edad: 2 } });

  console.log('Migración ascendente completada');
  client.close();
};

module.exports = {
  up: migrationUp,
};

// const migrationDown = async () => {
//   // Lógica para revertir la actualización del esquema 
//   const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
//   const db = client.db();

//   // Ejemplo: revertir la estructura del documento "usuario"
//   await db.collection('usuario').updateMany({}, { $unset: { edad: 1 } }); // 1 indica que se elimina el campo

//   console.log('Migración descendente completada');
//   client.close();
// };

// module.exports = {
//   up: migrationUp,
//   down: migrationDown
// };
