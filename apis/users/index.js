/**
 * Module dependencies.
 */

const models = require('../../database');

/**
 * Export the user API with its own routes.
 */

exports.register = function (server, options, next) {
	server.route({
		method:'POST',
		path:'/users',
		handler:(request, reply) => {
		const data = request.payload || request.params || request.body;
		models.user.create(data)
			.then(result => {
				return reply(result)
			})
		.catch(err => {
			return reply({
				error : err.message
			})
		})
		}
	})

	server.route({
		method: 'GET',
		path: '/users',
		handler: (request, reply) => {
		models.user.findAll()
			.then(result => {
				return reply(result)
			})
			.catch(err => {
				return reply({
					error: err.message
				})
			})
		}
	})

	server.route({
		method: 'GET',
		path: '/users/{id}',
		handler: (request, reply) => {
		const data = request.payload || request.params || request.body; 
		models.user.findById(data.id)
			.then(result => {
				return reply(result)
			})
			.catch(err => {
				return reply({
					error: err.message
				})
			})
		}
	})

	server.route({
		method: 'PUT',
		path: '/users/{id}',
		handler: (request, reply) => {
		models.user.update(request.payload, {
			where: {
				id: request.params.id
			}
		})
			.then(result => {
				return reply(result)
			})
			.catch(err => {
				return reply({
					error: err.message
				})
			})
		}
	})

	server.route({
    	method: 'DELETE',
		path:'/users/{id}',
		handler:  (request, reply) => {
		models.user.destroy({
			where: {
				id: request.params.id
			}
		})
			.then(result => {
				return reply('User destroyed')
			})
			.catch(err => {
				return reply({
					error:err.message
				})
			})
		}
	})

	server.route({
		method: 'GET',
		path:'/users/{id}/followers',
		handler:  (request, reply) => {
		models.user.findAll({
			where: {
				id: request.params.id
			}
		})
			.then(result => {
				return reply(result)
			})
			.catch(err => {
				return reply({
					error:err.message
				})
			})
		}
	})

	// server.route({
	// 	method: 'POST',
	// 	path:'/users/{id}/followers',
	// 	handler:  (request, reply) => {
	// 	models.user.findAll({
	// 		where: {
	// 			id: request.params.id
	// 		}
	// 	})
	// 		.then(result => {
	// 			return reply(result)
	// 		})
	// 		.catch(err => {
	// 			return reply({
	// 				error:err.message
	// 			})
	// 		})
	// 	}
	// })

	// server.route({
	// 	method: 'GET',
	// 	path:'/users/{id}/followers',
	// 	handler:  (request, reply) => {
	// 	models.user.findAll({
	// 		where: {
	// 			id: request.params.id
	// 		}
	// 	})
	// 		.then(result => {
	// 			return reply(result)
	// 		})
	// 		.catch(err => {
	// 			return reply({
	// 				error:err.message
	// 			})
	// 		})
	// 	}
	// })
	next();
};

exports.register.attributes = {
	name: 'users'
};