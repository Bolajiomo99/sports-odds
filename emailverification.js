const User = require('./models/user');
const mongoose = require('mongoose');
const nev = require('email-verification')(mongoose);



const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/gambitgames';
mongoose.connect(dbUrl);


nev.configure({
    verificationURL: 'http://myawesomewebsite.com/email-verification/${URL}',
    persistentUserModel: User,
    tempUserCollection: 'myawesomewebsite_tempusers',
 
    transportOptions: {
        service: 'Gmail',
        auth: {
            user: process.env.GAMBIT_EMAIL,
            pass: process.env.GAMBIT_PASS
        }
    },
    verifyMailOptions: {
        from: 'Do Not Reply <gambitprofit@gmail.com>',
        subject: 'Please confirm account',
        html: 'Click the following link to confirm your account:</p><p>${URL}</p>',
        text: 'Please confirm your account by clicking the following link: ${URL}'
    }
}, function(error, options){
});


// configuration options go here...
 
// generating the model, pass the User model defined earlier
nev.generateTempUserModel(User);
 
// using a predefined file
var TempUser = require('./app/tempUserModel');
nev.configure({
    tempUserModel: TempUser
}, function(error, options){
});





// get the credentials from request parameters or something
var email = "...",
    password = "...";
 
var newUser = User({
    email: email,
    password: password
});
 
nev.createTempUser(newUser, function(err, existingPersistentUser, newTempUser) {
    // some sort of error
    if (err){
        console.log(err)
    }
        // handle error...
 
    // user already exists in persistent collection...
    if (existingPersistentUser){
        console.log('exiting presisnet')
    }
        // handle user's existence... violently.
 
    // a new user
    if (newTempUser) {
        var URL = newTempUser[nev.options.URLFieldName];
        nev.sendVerificationEmail(email, URL, function(err, info) {
            if (err){
                console.log(err)
            }
                
 
            // flash message of success
        });
 
    // user already exists in temporary collection...
    } else {
        // flash message of failure...
    }
});





// sync version of hashing function
var myHasher = function(password, tempUserData, insertTempUser, callback) {
    var hash = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    return insertTempUser(hash, tempUserData, callback);
  };
   
  // async version of hashing function
  myHasher = function(password, tempUserData, insertTempUser, callback) {
    bcrypt.genSalt(8, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        return insertTempUser(hash, tempUserData, callback);
      });
    });
  };







  var url = '...';
  nev.confirmTempUser(url, function(err, user) {
      if (err){
          console.log(err)
      }
          // handle error...
   
      // user was found!
      if (user) {
          // optional
          nev.sendConfirmationEmail(user['email_field_name'], function(err, info) {
              // redirect to their profile...
          });
      }
   
      // user's data probably expired...
      else{
          console.log('something happened')
      }

          // redirect to sign-up
  });





var email = '...';
nev.resendVerificationEmail(email, function(err, userFound) {
    if (err){
        console.log(err)
    }
        // handle error...
 
    if (userFound){
        console.log('email sent')
    }
        // email has been sent
    else{
        console.log('flash message of failure')
    }
        // flash message of failure...
});