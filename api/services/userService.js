
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

const User = sequelize.define('users', {
	id : {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	age : {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	firstName: {
		type: Sequelize.STRING,
		field: 'first_name',
		allowNull: false
	},
	lastName: {
		type: Sequelize.STRING,
		field: 'last_name',
		allowNull: false
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

class UserService {
	static async getAllUsers() {
		try {
			return await User.findAll();
		} catch (error) {
			throw error;
		}
	}

	static async createUser(newUser) {
		try {
			return await User.create(newUser);
		} catch (error) {
			throw error;
		}
	}
	
	static async updateUser(id, updateUser) {
		try {
			const userToUpdate = await User.findOne({
				where: { id: Number(id) }
			});

			if (userToUpdate) {
				await User.update(updateUser, { where: { id: Number(id) } });

				return updateUser;
			}
			return null;
		} catch (error) {
			throw error;
		}
	}

	static async getUser(id) {
		try {
			const user = await User.findOne({
				where: { id: Number(id) }
			});
			
			return user;
		} catch (error) {
			throw error;
		}
	}

	static async deleteUser(id) {
		try {
			const userToDelete = await User.findOne({ where: { id: Number(id) } } );

			if (userToDelete) {
				const deletedUser = await User.destroy({
					where: { id: Number(id) }
				});
				return deletedUser;
			}
			return null;
		} catch (error) {
			throw error;
		}
	}
}

module.exports = UserService;
