import type{Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
// import type{CustomJwtPayload} from '../types/authRequest.ts';
import dotenv from "dotenv";
import UserModel from '../model/user.model';


dotenv.config();


//JWT
const { ACCESS_TOKEN_SECRET } = process.env;

if (!ACCESS_TOKEN_SECRET) {
    throw new Error('ACCESS_TOKEN_SECRET is not defined in .env');
}


//@route POST /api/v1/auth/register
//@desc Sign Up User (Create User and Hash Password)
//@access Public
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName,email, password } = req.body;

    // VALIDATION
    if (!fullName || !email || !password) {
      res.status(400).json({
        success: false,
        message: "Full Name, Email and Password are required",
      });
      return;
    }

    if (password.length < 8) {
      res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
      return;
    }


    // CHECK EXISTING EMAIL
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "Email already exists, try logging in.",
      });
      return;
    }

    
    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // CREATE USER
    const newUser = await UserModel.create({
      fullName,
      userName,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


//@route POST /api/v1/auth/login
//@desc Login User (JWT authentication with access token)
//@access Public
export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const {email, password} = req.body;

        //Validation
        if (!email || !password) {
            res.status(400).json({
                success: false,
                message: "All fields are required"
            });
            return
        }

        //Check for existing user
        const existingUser = await UserModel.findOne({email}).select('+password');
        if (!existingUser) {
            res.status(400).json({
                success: false,
                message: "User not found, Please sign up"
            });
            return
        }

        if (existingUser.isAccountDeleted) {
            res.status(404).json({
                success: false,
                message: "Account has been deleted, please sign up again.",
            });
            return;
        }

        //Check Password
        const validPassword = await bcrypt.compare(password, existingUser.password);
        if (!validPassword) {
            res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
            return
        }

        //Create JWT Token
        const accessToken = jwt.sign({
            userId: existingUser._id,
            email: existingUser.email,
            
        }, ACCESS_TOKEN_SECRET as string, {expiresIn: '1h'});

        //Remove password before sending a response
        const userWithoutPassword = existingUser.toObject() as any;
        delete userWithoutPassword.password;

        res.status(200).json({
            success: true,             
            message: "User logged in successfully",
            accessToken,
            data: userWithoutPassword
        });

    } catch (error: unknown) {
        console.log({message: "Error logging in user", error: error});
        res.status(500).json({
            success: false, 
            error: "Internal Server Error"});
        return
    }
}
