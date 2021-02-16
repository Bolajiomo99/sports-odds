// const newUser = User({
//     email: email,
//     password: password
// });


const newUser = User({
    username: {
        type: String,
        required: [true, 'Username cannot be blank']
    },
    password: {
        type: String,
        required: [true, 'Password cannot be blank']
    },
    email: {
        type: String,
        required: [true, 'Email cannot be blank']
    },
    text: {
        type: String,
        required: [true, 'text cannot be blank']
    }
})

module.exports = mongoose.model('newUser', userSchema);