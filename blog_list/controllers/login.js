import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { JWT_SECRET } from "../util/config.js";
import bcrypt from "bcryptjs";

async function loginUser(req, res) {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    const passwordCorrect =
        user === null
            ? false
            : await bcrypt.compare(password, user.passwordHash);

    if (!user || !passwordCorrect) {
        return res.status(401).json({ error: "invalid username or password" });
    }

    const userForToken = {
        username: user.username,
        id: user._id,
    };

    const token = jwt.sign(userForToken, JWT_SECRET);

    res.status(200).json({ token, username: user.username, name: user.name });
}

export { loginUser };
