import mongoose ,{Schema} from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = new Schema(
    {
        usernmae:{
            type: String,
            require: true,
            unique: true,
            lowercase : true,
            trime: true,
            index: true,
        },
        email:{
            type: String,
            require: true,
            unique: true,
            lowercase : true,         
        },
        fullName:{
            type: String,
            require: true,
            trime: true,
            index: true,
        },
        avatar :{
            type :String ,//Cloudinary URL
            require: true,
        },
        coverImage: {
         type: String ,//cloudinary url
        
        },
        watchHistory:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            require: [true ,"password is requied"],

        },
        refreshToken:{
            type:String,
        },

    },
    {
        timestamps: true
    }
)

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id:this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.Access_Token_secret,
        {
            expiresIn : process.env.Access_Token_Expiry
        }
    )
}

userSchema.methods.generateRefershToken = function(){
    return jwt.sign(
        {
            _id : this._id,
        },
        process.env.Refresh_Token_Secret,
        {
            expiresIn : process.env.Refresh_Token_Expiry
        }
    )
}

export const User = mongoose.model("User" , userSchema)