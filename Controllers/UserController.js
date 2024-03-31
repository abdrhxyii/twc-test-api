const UserModel = require('../Models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.Register  = async (request, response) => {
    const {email, password} = request.body;
    try{
        const userExist = await UserModel.findOne({email});
        if (userExist){
            return response.status(400).json({message: "User Already Exist"})
        } else {
            const hasshedPassword = bcrypt.hashSync(password);
            const user = await UserModel.create({
                email: email,
                password: hasshedPassword
            })
            return response.status(201).json({message: "Registerred Successfully", user})
        }
    } catch(error){
        return response.status(500).json({message: "Error occurred in the Register Controller", error})
    }
}

exports.Login = async (request, response) => {
    const {email, password} = request.body;
    try{
        const user = await UserModel.findOne({ email });
        if (!user) {
            return response.status(404).json({ message: "The user doesn't exist. Please, register to login" });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return response.status(400).json({ message: "Incorrect Password" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY); 

        return response.status(200).json({ message: "Login Successful", token });
    }catch (error){
        console.log(error)
        return response.status(500).json({message: "Error occurred in the Login Controller", error})
    }
}