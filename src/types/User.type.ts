import { Document } from "mongoose";


export interface IUser extends Document {
   fullName: string;
     email: string;
     password: string;
     isAvailable?: boolean; 
     isAccountDeleted?:boolean;
     passwordChangedAt?:Date;
}