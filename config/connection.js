const mysql = require("mysql2/promise")

const db = mysql.createPool({
    user : "root",
    password : "",
    host : "localhost",
    database : "back"
})

module.exports = db 