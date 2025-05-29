// This files manages the connection to the MySQL database - Rueien
const mysql = require('mysql2');
const db = mysql.createConnection({
    host: '43.128.86.125',
    user: 'debug',
    password: '12345678',
    database: 'surveydb'
});

db.connect (err =>{
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('MySQL Connected...');
});

module.exports = db; 