const express = require("express");
const router = express.Router();
const passport = require("passport");
const FacebookTokenStrategy = require("passport-facebook-token");
const GoogleTokenStrategy = require("passport-google-token").Strategy;
const client = require("twilio")(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const userModule = require("../models/queries");



passport.use("facebookToken",new FacebookTokenStrategy({
    clientID: process.env.FACEBOOK_APP_SECRET,
    clientSecret: process.env.FACEBOOK_APP_SECRET
  }, async (accessToken, refreshToken, profile, done)=>{
   try{
       console.log(profile);
       const exeistingUser = await userModule.getUser(profile.id);
       if(exeistingUser){
           return done(null,exeistingUser);
       }
       userModule.addUser(profile.id,profile.displayName).save((err,user)=>{
           if(err) throw err;
           done(null,user);
       })
   }catch(error){
       done(error,false,error.message);
   }
  }
));
router.post('/facebook',
  passport.authenticate('facebookToken'),
  function (req, res) {
     res.status(200).send({message:"user login with facebook successfully ",user:req.user});
  }
);


passport.use("googleToken", new GoogleTokenStrategy({
    clientID: process.env.GOOGLE_CLINTE_ID ,
    clientSecret: process.env.GOOGLE_CLINTE_SECRET
  }, async (accessToken, refreshToken, profile, done)=>{
   try{
       console.log(profile);
       const exeistingUser = await userModule.getUser(profile.id);
       if(exeistingUser){
           return done(null,exeistingUser);
       }
       userModule.addUser(profile.id,profile.displayName).save((err,user)=>{
           if(err) throw err;
           done(null,user);
       })
   }catch(error){
       done(error,false,error.message);
   }
  }
));
router.post('/googleauth',
  passport.authenticate('googleToken'),
  function (req, res) {
     res.status(200).send({message:"user login with google successfully ",user:req.user});
  }
);

passport.serializeUser((user, cb) => {
    cb(null, user);
});
passport.deserializeUser((obj, cb) => {
    cb(null, obj);
});




router.post("/twiliologin",(req,res)=>{
    client.verify.services(process.env.TWILIO_SERVICE_ID)
    .verifications.create({
        to: req.body.number,
        channel: req.body.channel
    }).then((data)=>{
        console.log(data);
        res.status(200).send(data);
    }).catch((err)=>{
        console.log(err);
        res.status(400).send(err);
    });
});

router.post("/verify",(req,res)=>{
    client.verify.services(process.env.TWILIO_SERVICE_ID)
    .verificationChecks.create({
        to: req.body.number,
        code: req.body.code
    }).then((data)=>{
        console.log(data);
        res.status(200).send(data);
    }).catch((err)=>{
        console.log(err);
        res.status(400).send(err);
    });
});



module.exports = router;
