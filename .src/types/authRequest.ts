import type {Request} from "express";

import  type{JwtPayload} from 'jsonwebtoken';

export interface AuthRequest extends Request{
    user?:{
        userId: string;
        email?: string;
    }
} 

export interface CustomJwtPayload extends JwtPayload {
    userId: string;
    iat?: number;
    exp?: number;
}
  
