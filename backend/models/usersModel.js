const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "Introduce tu nombre de usuario."]
    },
    email: {
        type: String,
        required: [true, "Introduce tu correo."],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Introduce tu contraseña."]
    }
} , {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)