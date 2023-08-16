// const passport  = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// //const user = require('../models/user');
// const User = require('../models/user');
// passport.use(new LocalStrategy({
//     usernameField:'email'
// }, function(email, password, done){
//     User.findOne({email:email}, function(err, user){
//           if(err){
//             console.log('error finding in user --> paasport');
//             return done(err);
//           }
//           if(!user || user.password != password){
//             console.log('invalid Username/Password');
//             return done(null, false);
//           }
//           return done(null, user);
//     });
// }
// ));
// passport.serializeUser(function(user, done){
//     done(null, user.id);
// });
// passport.deserializeUser(function(id, done){
//   User.findById(id, function(err, user){
//     if(err){
//         console.log('error finding in user --> paasport');
//         return done(err);
//     }
//     return done(null, user);
//   })
// });
// passport.checkAuthentication = function(req,res,next){
//   if(req.isAuthenticated()){
//     return next();
//   }
//   return res.redirect('/users/sign-in');
// }
// passport.setAuthenticatedUser = function(req,res,next){
//   if(req.isAuthenticated()){
//           res.locals.user = req.user;
//   }
//    next();
// }
// module.exports = passport;
const passport = require('passport');
 const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user')

passport.use(new LocalStrategy({
  usernameField: 'email',
  passReqToCallback: true
 },   async function (req, email, password, done) {
    try {
      let user = await User.findOne({ email: email })
      if (!user) {
        req.flash('error', err);
        return done(null, false);
     }
      if (user.password != password) {
        req.flash('error', 'Invalid User/Passward');
       return done(null, false);
     }
     return done(null, user);
    } catch (err) {
     return done(err);
   }

  }));

 passport.serializeUser(function (user, done) {
  done(null, user.id);
 });

 passport.deserializeUser(async function (id, done) {
  try {
    let user = await User.findById(id);
  //   if (!user) {
  //     return done(null, false)
  //  }
   return done(null, user);
} catch (error) {
  return done(err);
 }
});

 passport.checkAuthentication = function (req, res, next) {
 if (req.isAuthenticated()) {  
   return next();
 }
  //req.flash('error', 'You are not Authorize plz sign in !');
  return res.redirect('/users/sign-in');
} 
  passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
      
      res.locals.user = req.user;
    }
     next();
  }

 module.exports = passport;