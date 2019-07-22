const result = require('dotenv').config()

if (result.error) {
	throw result.error
}

const Sequelize = require("Sequelize");

var sequelize = new Sequelize(process.env.db_name, process.env.db_user, process.env.db_pass, {
	host: process.env.db_host,
	dialect: 'postgres',
	port: process.env.db_port
});

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('users', {
		id : {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
		},
		age : {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		firstName: {
			type: DataTypes.STRING,
			field: 'first_name',
			allowNull: false
		},
		lastName: {
			type: DataTypes.STRING,
			field: 'last_name',
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false
		}
	});
	return User;
};
