const routes = require('express').Router()
const entities = {
    repositories: '/repositories',
    likes: 'likes'
  }

const RepositoriesController = require('./controllers/RepositoriesController')

function redirectHome(req, res, next) {
    if(req.originalUrl === '/')
      return res.redirect(301, '/repositories')
  
      next()
  }


routes.use('/', redirectHome)


// Respositories routes
routes.get(entities.repositories, RepositoriesController.get)
routes.post(entities.repositories, RepositoriesController.store)
routes.put(`${entities.repositories}/:id`, RepositoriesController.update)
routes.delete(`${entities.repositories}/:id`, RepositoriesController.destroy)
routes.post(`${entities.repositories}/:id/${entities.likes}`, RepositoriesController.likes)

module.exports = routes