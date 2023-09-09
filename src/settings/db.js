
const mysql = require('mysql')
const db = mysql.createConnection({
host: "containers-us-west-152.railway.app",
user: "root",
password: "0m4K4mELsPJaFjlTTheA",
database:"railway"
})

module.exports = db;