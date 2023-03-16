const express= require('express')
const fs= require('fs')
const path= require('path')
const { v4: uuidv4 } = require('uuid');

const app = express()
const port = 3000
const dbPath= path.join(__dirname,'db','db.json')

app.use(express.json())
app.use(express.static(path.join(__dirname,'public')))
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'public','index.html'))
    
})
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname,'public','notes.html'))
    
})
app.get('/api/notes',(req,res) => {
    const notes= fs.readFileSync(dbPath)
    res.json(JSON.parse(notes.toString()))
})
app.post('/api/notes',(req,res) => {
    const id= uuidv4()
    const title= req.body.title
    const text= req.body.text
    const newNotes={id,title,text}
    let notes=fs.readFileSync(dbPath).toString()
    notes=JSON.parse(notes)
    notes.push(newNotes)
    fs.writeFileSync(path.join(__dirname,'db','db.json'),JSON.stringify(notes))
    res.json({message:'entry saved with success'}).status(201)
})

app.listen(port, () => {
    console.log('app listening')
})

