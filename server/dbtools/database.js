const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '43.128.86.125',  // e.g., 'localhost' or your cloud database IP
    user: 'debug',       // e.g., 'root'
    password: '12345678',   // e.g., 'password'
    database: 'surveydb' // e.g., 'my_database'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database as id ' + connection.threadId);
});

// Export the connection for use in other files
module.exports = connection;
