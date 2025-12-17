import mongoose, { Schema, Document, Model } from 'mongoose';


export interface IUser extends Document {
    fullName: string;
    email: string;
    password: string;
    phoneNumber?:String;
    isAvailable?: boolean; 
    isAccountDeleted?:boolean;
    passwordChangedAt?:Date;
 
    }

const UserSchema =new Schema<IUser>({
    fullName:{
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password:{
        type: String,
        required: true,
        select:false,
    },
    isAvailable:{
        type: Boolean,
        default: false,
    },
    isAccountDeleted:{
        type:Boolean,
        default:false,
    },
      passwordChangedAt: { 
        type: 
        Date
     },
 
},{timestamps:true});

const UserModel: Model<IUser> = mongoose.model<IUser>("User", UserSchema);
export default UserModel;