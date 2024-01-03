//Helper function to 
const mysql = require('mysql2')
require("dotenv").config()

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    console.log(`Connected to the employees_db`)
)
db.connect(function (err) {
    if (err) throw err
})


module.exports = db;