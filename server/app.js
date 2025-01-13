const express = require('express')
const path = require('path')


const app = express()
const port = 5000
const ROOT_DIR = path.dirname(__dirname)
let ACCESS_TOKEN = null

app.use(express.json())
app.use('/static', express.static(path.join(ROOT_DIR, 'public')))

app.get('/', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.sendFile(path.join(ROOT_DIR, 'public/index.html'))
})


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

