//requirements
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { AssistantFallbackActionsInstance } = require('twilio/lib/rest/preview/understand/assistant/assistantFallbackActions');

//Creates the schema for mongoose on MongoDB
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
    },
    passwordLastModified:{
        type: Date,
        default: Date.now
    }

})

//method to check if the user is found and validated
userSchema.statics.findAndValidate = async function (username, password) {
    const foundUser = await this.findOne({ username });
    const isValid = await bcrypt.compare(password, foundUser.password);
    return isValid ? foundUser : false;
}

//method to check if the user exists then if it exists update password on the other side.
userSchema.statics.findAndUpdatePW = async function (email){
    const foundUser = await this.findOne({email});
    
    
    
    //Need to update password.
    // console.log(foundUser)
    return foundUser

}


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
})

module.exports = mongoose.model('User', userSchema);