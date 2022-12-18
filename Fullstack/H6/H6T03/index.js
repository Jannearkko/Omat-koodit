let users = 
[
  { 'id':'1', 'name':'Kirsi Kernel' },
  { 'id':'2', 'name':'Matti Mainio' }
]

const express = require('express') 
const app = express()
app.use(express.json())
const port = 3000
const fs = require("fs")
const path = require('path')

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

// get all users
app.get('/users', (request, response) => {
	nav = `
    <a href=/add>Add User</a> |
	<a href=/users> List users</a><br><br>
	`;
	tableform = `
	<table>
		<tr>
			<th>Id</th>
			<th>Name</th>
		</tr>
	` 
	users.forEach(user => {
		tableform = tableform + `
			<tr>
				<td>${user.id}</td>
				<td>${user.name}</td>
			</tr>
		`
	})
	tableform = tableform + '</table'
    response.send(nav + tableform)
})
// get user data
app.get('/users/:id', (request, response) => {
    const { id } = request.params
    const user = users.find(user => user.id === id)
    if (user) response.json(user)
    else response.status(404).end()
})
// delete user data
app.delete('/users/:id', (request, response) => {
    const { id } = request.params
    users = users.filter(user => user.id !== id)
    // Just send "204 no content" status code back
    response.status(204).end()
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

// create user
app.post('/users/', (request, response) => {
    const maxId = Math.max(...users.map(user => user.id), 0)
    const user = request.body
    user.id = (maxId+1).toString() 
    users = users.concat(user) 
    response.redirect('/users')
  })
