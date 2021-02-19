const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { AssistantFallbackActionsInstance } = require('twilio/lib/rest/preview/understand/assistant/assistantFallbackActions');

const userSchema = new mongoose.Schema({
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
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    dateCreated:{
        type : Date, 
        default: Date.now 
    },
    haveAccess:{
        type: Boolean,
        default: false
    }

})

userSchema.statics.findAndValidate = async function (username, password) {
    const foundUser = await this.findOne({ username });
    const isValid = await bcrypt.compare(password, foundUser.password);
    return isValid ? foundUser : false;
}

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
})

module.exports = mongoose.model('User', userSchema);