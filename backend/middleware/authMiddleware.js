const jwt = require('jsonwebtoken')
const asynchHandler = require('express-async-handler')
const User = require('../models/usersModel')

const protect = asynchHandler(async(req, res, next) =>{
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try{
            token = req.headers.authorization.split(' ') [1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select('-password')

            next()

        } catch (error){
            console.log(error)
            res.status(401)
            throw new Error('No tienes acceso autorizado.')
        }
    }

    if(!token){
        res.status(401)
        throw new Error('Acceso no autorizado, no se proporcionó el token.')
    }
})

module.exports = { protect }