const mysql = require('mysql');
const options = {
  host: 'localhost',
  user: 'sora',
  password: 'chym12333',
  database: 'online_album'
}

class CreateDatabase {
  constructor() {
    this.connection = mysql.createConnection(options);
    this.open();
  }

  open() {
    this.connection.connect();
    this.connection.on('error', (err) => {
      // 如果是连接断开，自动重新连接
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        this.connection.connect();
      } else {
        console.error(err.stack || err);
      }
    });
  }

  close() {
    this.connection.release();
  }

  sql (sqlString) {
    sqlString = sqlString.replace(/;$/, '') + ';';
    console.log(sqlString);
    return new Promise((resolve, reject) => {
      this.connection.query(sqlString, (err, res) => {
        if (err) {
          reject({ code: 1, err });
        }
        resolve({ code: 0, res });
      });
    }).then((res) => {
      return res;
    }, (reject) => {
      console.log(reject);
      return reject;
    });
  }
};

const Database = function() {
  let instance = null;
  return (function() {
    if (!instance) {
      instance = new CreateDatabase();
    }
    return instance;
  })();
}

module.exports = Database;