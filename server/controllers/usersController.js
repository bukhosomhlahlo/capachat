const User = require("../model/userModel")
const brcypt = require("bcrypt")


module.exports.register= async(req, res, next)=>{

    try{
        const {username, email, password} = req.body;
const usernameCheck = await User.findOne({username});

if(usernameCheck)
    return res.json({msg:"Username already exists", status:false});
    const emailCheck = await User.findOne({email});

if(emailCheck)
    return res.json({msg:"Email already exists", status:false});


    const hashedPassword = await brcypt.hash(password, 10);
    const user = await User.create({
        email,
        username,
        password:hashedPassword,
    })
    delete user.password;
    return res.json({status:true, user});
    }catch (ex){
        next(ex);

    }


};

module.exports.login= async(req, res, next)=>{

    try{
        const { email, password} = req.body;
const Email = await User.findOne({email});

if(!Email)
    return res.json({msg:"Incorrect email or Password", status:false});
    const emailCheck = await User.findOne({email});
        const isPasswordValid = await brcypt.compare(password, emailCheck.password);

        if(!isPasswordValid)
            return res.json({msg:"Incorrect email or Password", status:false});

        delete email.password;
        return res.json({status:true, email});
        }catch (ex){
            next(ex);
            
        }


};