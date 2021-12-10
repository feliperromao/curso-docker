const express = require('express')
const mysql = require('mysql')

const app = express()
const port = 3003

const dbConfig = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}

const dbConnection = mysql.createConnection(dbConfig)

const sqlQuery = `INSERT INTO people(name) values('Felipe')`

dbConnection.query(sqlQuery)
dbConnection.end()

app.get('/', function (req, res) {
    return res.json({
        'status': 'success',
        'message': 'Its work'
    })
})

app.listen(port, function() {
    console.log(`Application is running at port ${port}`)
})