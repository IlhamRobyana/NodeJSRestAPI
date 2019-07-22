var express = require('express'),
	bodyParser = require('body-parser'),
	app = express(),
	port = process.env.PORT || 1323;

app.use(bodyParser.json())
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

const routes = require('./api/routes/userRoutes.js')
routes(app);

app.listen(port, () => {
	console.log(`App running on port ${port}.`)
})
