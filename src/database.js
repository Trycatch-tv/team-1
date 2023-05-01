const mysql = require('mysql2');
const { promisify } = require('util');
const { database } = require('./keys');
const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.log('DATABASE CONNECTION WAS CLOSE');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.log('DATABASE HAS TO MANY CONECTIONS');
    }
    if (err.code === 'ECONNREFUSED') {
      console.log('DATABASE CONNECTION WAS REFUSED');
    }
    if (err.code === 'ER_UNKNOWN_ERROR') {
      console.log(
        'DATABASE SERVER DOES NOT ALLOW INSECURE CONNECTIONS, CLIENT MUST USE SSL/TLS'
      );
    }
  }
  if (connection) connection.release();
  console.log('LA CONEXION A LA BASE DE DATOS FUE EXITOSA');
  return;
});

pool.query = promisify(pool.query);

module.exports = pool;
