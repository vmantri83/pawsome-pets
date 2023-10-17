import { User } from "../models/user.models.js"

export const registerUser = async (req, res) => {
    const { username, email, password } = req.body
    try {
        const existedUser = await User.findOne({ $or: [{ username }, { email }] })
        if (existedUser) {
            return res.status(409).json({
                status: "failure",
                data: {
                    statusCode: 409,
                    message: "User with this username or email already exists",
                }
            })
        }
        const userCreated = await User.create({ username, email, password })
        const userGot = await User.findById(userCreated._id).select("-password -refereshToken -isLoggedIn");
        if (!userGot) {
            return res.status(500).json({
                status: "failure",
                data: {
                    statusCode: 500,
                    message: "Internal Server error",
                }
            })
        }
        return res.status(201).json({
            status: "success",
            data: {
                statusCode: 201,
                message: "User created successfully",
                value: userGot,
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: "failure",
            data: {
                statusCode: 500,
                message: "Internal server error"
            }
        })
    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        // finding the user
        const user = await User.findOne({ email })
        // if user not found return unauthorised response
        if (!user) {
            return res.status(401).json({
                status: "failure",
                data: {
                    statusCode: 401,
                    message: "Please enter correct credentials",
                }
            })
        }
        // checking whether password is correct using the method return in user.models.js
        const passwordCorrect = await user.isPasswordCorrect(password);
        // if password is incorrect return unauthorised response
        if (!passwordCorrect) {
            return res.status(401).json({
                status: "failure",
                data: {
                    statusCode: 401,
                    message: "Please enter correct credentials",
                }
            })
        }

        // getting the details of the logged in user
        const loggedInUser = await User.findById(user._id).select(
            "-password -refreshToken"
        );
        return res.status(200)
            .json({
                status: "success",
                data: {
                    message: "User logged in successfully",
                    loggedInUser
                }
            })
    } catch (error) {
        return res.status(500).json({
            status: "failure",
            data: {
                statusCode: 500,
                message: "Internal server error"
            }
        })
    }
}