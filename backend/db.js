const mysql = require('mysql2');

const connection = mysql.createConnection({

  host: process.env.MYSQLHOST || 'localhost',

  user: process.env.MYSQLUSER || 'root',

  password: process.env.MYSQLPASSWORD || '',

  database:
    process.env.MYSQLDATABASE ||
    'xenoverse_db',

  port: process.env.MYSQLPORT || 3306

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