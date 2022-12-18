
const { response } = require('express')
const express = require('express') 
const app = express()
app.use(express.json())
const port = 3000
const fs = require("fs")
const mongoose = require("mongoose")

const mongoDB = "mongodb+srv://janne:janne@jannencluster.dfsimun.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology:true})
const db = mongoose.connection

db.on("error", console.error.bind(console, "connection error:"))
db.once("open",function() {
  console.log("Database test connected")
})

const userSchema = new mongoose.Schema({name: String})
const User = mongoose.model("User", userSchema, "users")

app.use(express.urlencoded({extended: true} ))

app.listen(port, () => {
    console.log('Example app listening on port 3000')
})

// create logger
const logger = (request, response, next) => {
	const date = new Date()
	const lDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
	const log = `${lDate}: ${request.method} ${request.url}\n`
	fs.appendFileSync("request_logger.txt", log)
	next()
}
  
  // use own made logger middleware in express app
app.use(logger)

app.get('/',(request,response) => {
  htmlform = `
    <a href=/add>Add User</a> |
    <a href=/users> List users</a><p><br></p>
  `;
  response.send(htmlform)
})

app.get('/add',(request,response) => {
    htmlform = `
	<a href=/add>Add User</a> |
    <a href=/users> List users</a><br><br>
    <form action=/users method=post>
    Add a new user: <input type=text name=name><br>
    <input type=submit value="add user">
    </form>
    `;
    response.send(htmlform)
})
// GET all users
app.get('/users', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

// get user data NUMERO 2
app.get('/users/:id', async (request, response) => {
  const user = await User.findById(request.params.id)
  if (user) response.json(user)
  else response.status(404).end()
})
 // delete user
app.delete('/users/:id', async (request, response) => {
  const deletedUser = await User.findByIdAndRemove(request.params.id)
  if (deletedUser) response.json(deletedUser)
  else response.status(404).end()
})

// update user data
app.put('/users/:id', (request, response) => {
    //const id = request.params.id
    const { id } = request.params
    // const name = request.query.name
    const { name } = request.query
    const user = users.find(user => user.id === id)
    if (user) {
      user.name = name
      response.status(200).end()
    } else {
      response.status(204).end()
    }
  })

// post user
app.post("/users/",async (request,reponse)=>{
  const {name}=request.body
  const user = new User({name : name})
  const savedUser = await user.save()
  response.redirect(savedUser, "/users")
})
