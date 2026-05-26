const mysql = require('mysql2');

const connection = mysql.createConnection({

  host: process.env.DB_HOST || 'localhost',

  user: process.env.DB_USER || 'root',

  password: process.env.DB_PASSWORD || '',

  database: process.env.DB_NAME || 'xenoverse_db',

  port: process.env.DB_PORT || 3306

});

connection.connect(error => {

  if (error) {

    console.error(
      'Error al conectar a MySQL:',
      error
    );

    return;
  }

  console.log(
    'Conectado a MySQL correctamente'
  );

});

module.exports = connection;