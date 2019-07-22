const UserService = require('../services/userService');
const Util = require('../utils/Utils');

const util = new Util();

class UserController {
	static async getAllUsers(req, res) {
		try {
			const allUsers = await UserService.getAllUsers();
			
			console.log("aaaaaaa");
			if (allUsers.length > 0) {
				util.setSuccess(200, 'Users retrieved', allUsers);
			} else {
				util.setSuccess(200, 'No user found');
			}
			return util.send(res);
		} catch (error) {
			console.log(error);
			util.setError(400, error);
			return util.send(res);
		}
	}

	static async getUser(req, res) {
		const id = parseInt(req.params.id);

		try {
			console.log(id);
			const user = await UserService.getUser(id);

			if (!user) {
				util.setError(404, `cannot find user with id ${id}`);
			} else {
				util.setSuccess(200, 'Found user', user);
			}
			return util.send(res);
		} catch (error) {
			console.log(error);
			util.setError(404, error);
		
		return util.send(res);
		}
	}
	
	static async createUser(req, res) {
		const newUser = req.body;
		try {
			const createdUser = await UserService.createUser(newUser);
			util.setSuccess(201, 'User Added!', createdUser);
			return util.send(res);
		} catch (error) {
			util.setError(400, error.message);
			return util.send(res);
		}
	}

	static async updateUser(req,res) {
		const alteredUser = req.body;
		const { id } = req.params;
		try {
			const updatedUser = await UserService.updateUser(id, alteredUser);
			if (!updatedUser) {
				util.setError(404, `cannot find user with id: ${id}`);
			} else {
				util.setSuccess(200, 'User updated', updatedUser);
			}
			return util.send(res);
		} catch (error) {
			console.log(error);
			util.setError(404, error);
			return util.send(res);
		}
	}
	
	static async deleteUser(req, res) {
		const id = parseInt(req.params.id);

		try {
			const userToDelete = await UserService.deleteUser(id);

			if (userToDelete) {
				util.setSuccess(200, 'User deleted');
			} else {
				util.setError(404, `User with id ${id} cannot be found`);
			}
			return util.send(res);
		} catch (error) {
			console.log(error);
			util.setError(400, error);
			return util.send(res);
		}
	}

}

module.exports = UserController;
