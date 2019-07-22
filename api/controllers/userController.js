const Pool = require('pg').Pool
const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'restapi_test',
	password: 'ujangbedil',
	port: 5432
})

exports.getAllUsers = function(request, response) {
	pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
		if (error) {
			throw error
		}
		response.status(200).json(results.rows)
	})
}

exports.getUser = function(request, response) {
	const id = parseInt(request.params.id)

	pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
		if (error) {
			throw error
		}

		response.status(200).json(results.rows)
	})
}

exports.updateUser = function(request, response) {
	const id = parseInt(request.params.id)
	const { first_name, last_name, age, email } = request.body

	pool.query(
		'UPDATE users SET first_name = $1, last_name = $2, age = $3, email = $4 WHERE id = $5',
		[first_name, last_name, age, email, id],
		(error, results) => {
			if (error){
				throw error
			}
			response.status(200).send(`User modified with ID: ${id}`)
		}
	)
}

exports.createUser = function(request, response) {
	const { first_name, last_name, age, email } = request.body

	pool.query('INSERT INTO users (first_name, last_name, age, email) VALUES ($1, $2, $3, $4)', 
		[first_name, last_name, age, email], 
		(error, results) => {
		if (error) {
			throw error
		}
		response.status(200).json(results.rows)
	})
}

exports.deleteUser = function(request, response) {
	const id = parseInt(request.params.id)

	pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
		if (error) {
			throw error
		}
		response.status(200).send(`User deleted with ID: ${id}`)
	})
}
