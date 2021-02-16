// configuration options go here...
 

// generating the model, pass the User model defined earlier
nev.generateTempUserModel(User);
 
// using a predefined file
var TempUser = require('./app/tempUserModel');
nev.configure({
    tempUserModel: TempUser
}, function(error, options){
});