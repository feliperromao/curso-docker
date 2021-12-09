const express = require('express')

const app = express()
const port = 3003

app.get('/', function (req, res) {
    return res.json({
        'status': 'success',
        'message': 'Its work'
    })
})

app.listen(port, function() {
    console.log(`Application is running at port ${port}`)
})