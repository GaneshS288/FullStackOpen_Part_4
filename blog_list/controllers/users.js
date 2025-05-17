import bcrypt from "bcryptjs";
import User from "../models/user.js";

async function postUser(req, res) {
    const { username, name, password } = req.body;

    if(!name || !username || !password) {
        return res.status(400).json({error: "Some of the properties are missing"})
    }
    if(username?.trim().length < 3) {
        return res.status(400).json({error: "username must be at least 3 characters long"})
    }
    if(password?.trim().length < 3) {
        return res.status(400).json({error: "password must be at least 3 characters long"})
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({username, passwordHash, name});
    const savedUser = await newUser.save();

    res.status(201).json(savedUser.toJSON());
}

async function getAllUsers(req, res) {
    let allUsers = await User.find({});
    allUsers = allUsers.map((user) => user.toJSON());

    res.json(allUsers);
}

export { getAllUsers, postUser}