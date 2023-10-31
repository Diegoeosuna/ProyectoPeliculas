const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asynchHandler = require('express-async-handler')
const User = require('../models/usersModel')

const registerUser = asynchHandler( async(req,res) =>{
    const { nombre, email, password } = req.body
    if(!nombre || !email || !password) {
        res.status(400)
        throw new Error ('Los datos no están completos, revise de nuevo.')
    }

    const userExists = await User.findOne({ email })
    if(userExists) {
        res.status(400)
        throw new Error ('El usuario ya existe, por favor usa uno diferente.')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    const user = await User.create({
        nombre,
        email,
        password:hashedPassword
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            nombre: user.nombre,
            email: user.email,
            message: 'Tu usuario ha sido creado'
        })
    } else {
        res.status(400)
        throw new Error ('No se pudo crear el usuario.')
    }
})

const loginUser = asynchHandler( async(req,res) =>{
    const { email, password} = req.body
    if(!email || !password) {
        res.status(400)
        throw new Error ('Hacen falta datos.')
    }

    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            nombre: user.nombre,
            email: user.email,
            token: generateToken(user._id),
            message:`Te has loggeado como ${user.nombre}`
        })
    } else {
        res.status(400)
        throw new Error('Credenciales incorrectas.')
    }
})

const getUserData = asynchHandler( async(req,res) =>{
    res.json(req.user)
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '999d'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getUserData
}