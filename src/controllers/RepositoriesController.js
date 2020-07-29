const { uuid } = require("uuidv4");

const repositories = [];
const likes = []

exports.get = function(request, response) {
  const repos = repositories.map(repo => {
    return {
      ...repo,
      likes: likes.filter(like => like.userId === repo.id)
    }
  })
  
  response.json(repos)
}

exports.store = function(request, response) {
  const {name, url, techs, senderId} = request.body
  const data = {id: uuid(), name, url, techs}

  const repositoryExist = repositories.filter(repo => repo.url === data.url).length

  if(repositoryExist)
    return response.status(400).json({error: 'repository already exists'})
    
  repositories.push(data)
  return response.json(data)
}

exports.update = function(request, response) {
  const { id } = request.params
  const {name, url, techs, likes} = request.body
  const data = {id, name, url, techs}

  const repoIndex = repositories.findIndex(repo => repo.id === id)

    if(!repoIndex < 0)
      return response.status(400).json({error: 'Repository not found'})

  repositories[repoIndex] = {...repositories[repoIndex], ...data}

  return response.json(data)
}

exports.destroy = function(request, response) {
  const { id } = request.params
    const repoIndex = repositories.findIndex(repo => repo.id === id)

    if(repoIndex < 0)
        return response.status(400).json({"error": "Repository not found"})

    repositories.splice(repoIndex, 1)

    return response.status(204).send()
}

exports.likes = function(request, response) {
  const { id } = request.params
  const {senderId} = request.body

  const repositoryExist = repositories.filter(repo => repo.id === id).length
  const senderExist = likes.filter(like => like.senderId === senderId).length

  if(!repositoryExist)
    return response.status(400).json({error: 'repository not found'})

  if(senderExist)
    return response.status(400).json({error: 'User already liked'})

  const data = {userId: id, senderId}

  likes.push(data)

  return response.json(data)
}