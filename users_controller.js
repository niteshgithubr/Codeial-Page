const { response } = require("express");
const User = require("../models/user");

module.exports.profile=async function(req,res){
  User.findById(req.params.id).then (function(user){
    return res.render('user_profile',{
      title:'User Profile',
      profile_user: user,
      user: req.user
  });
  });
} 

module.exports.update = async function(req, res){
  if(req.user.id == req.params.id){
    await User.findByIdAndUpdate(req.params.id, req.body);
        return res.redirect('back');
  
  }else{
    return res.status(401).send('Unauthorized');
  }
}
   
  


module.exports.signUp = function (req, res) {
  if(req.isAuthenticated()){
   return res.redirect('/users/profile');
  }
  return res.render("user_sign_up", {
    title: "Codeial | Sign Up",
  });
};

module.exports.signIn = function (req, res) {
  if(req.isAuthenticated()){
   return res.redirect('/users/profile');
  }
  return res.render("user_sign_in", {
    title: "Codeial | Sign In",
  });
};
module.exports.create = async function (req, res) {
  try {
    if (req.body.password != req.body.confirm_password) {
      return res.redirect("back");
    }
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      console.log(req.body);
      const newuser = await User.create(req.body);
      return res.redirect("/users/sign-in");
    } else {
      return res.redirect("back");
    }
  } catch (err) {
    console.log(err);
    res.redirect("back");
  }
};

module.exports.createSession = async function (req, res) {
  req.flash('success', 'Logged in Successfully');
  return res.redirect('/');
};

module.exports.destroySession = function(req, res){
  req.logout(function(error){
    if(error){
      console.log(error);
      return next(error);
    }
    req.flash('success', 'You have Logged Out!');
    return res.redirect('/');
  });
 
}