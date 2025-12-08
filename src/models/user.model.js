import mongoose, { Schema } from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = new Schema(
    {
        
        username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true, // This creates a unique index
        trim: true,
        index: true
    },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index:true
        },
        avatar: {
            type: String, // Cloudinary URL
            required: true,
        },
        coverImage: {
            type: String, // cloudinary url
        },
        watchHistory: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            required: [true, "password is required"],
        },
        refreshToken: {
            type: String,
        },
    },
    {
        timestamps: true
    }
);

// FIXED: Add proper error handling
userSchema.pre("save", async function(next) {
    // Only hash the password if it has been modified
    if (!this.isModified("password")) {
        console.log("Password not modified, skipping hash");
       
    }
    
    try {
        console.log("Hashing password...");
        // Use bcrypt with salt rounds
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
        console.log("Password hashed successfully");
        
    } catch (error) {
        console.error("Error hashing password:", error);
        next(error)
    }
});

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
}

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
}

export const User = mongoose.model("User", userSchema);