// BUILD YOUR SERVER HERE

const express = require('express')

const User = require('./users/model')

const server = express();

server.use(express.json())


server.delete('api/users/:id', async (req, res) => {
    const possibleUser = await User.findById(req.params.id)
    if (!possibleUser) {
        res.status(404).json({
            message: 'not found'
        })
    } else {
        const deletedUser = await User.remove(possibleUser.id)
        res.status(200).json(deletedUser)
    }
})



server.post('api/user', (req, res) => {
    const user = req.body
    if (!user.name || !user.bio) {
        res.status(400).json({
            message: 'Please provide name and bio for the user',
        })
    }
    else {
        User.insert(user)
            .then(createUser => {
                res.status(200).json(createUser)
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Error Creating User',
                    err: err.message,
                    stack: err.stack,
                })
            })

    }
})

server.get('/api/users', (req, res) => {
    User.find()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error',
                err: err.message,
                stack: err.stack,
            })
        })
})


server.get('/api/users:id', (req, res) => {
    User.findById(req.params.id)
        .then(users => {
            if (!user) {
                res.status(404), json({
                    message: 'The user with spefied ID does not exist'
                })
            }
            res.json(users)
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error',
                err: err.message,
                stack: err.stack,
            })
        })
})




server.use('*', (req, res) => {
    res.status(404).json({
        message: 'not found'
    })
})

module.exports = server; // EXPORT YOUR SERVER instead of {}

