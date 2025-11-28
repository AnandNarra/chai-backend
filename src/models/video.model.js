
import mongoose ,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


const videoSchema = new Schema (
    {
        vedioFile: {
            type: String,//cloudinary url
            require: true
        },
        thumbail: {
            type: String,
            require: true,
        },
        title: {
            type: String,
            require: true
        },
        description: {
            type: String,
            require: true
        },
        duration: {
            type: Number,
            require: true
        },
        views: {
            type: Number,
            require: true,
        },
        isPublished: {
            type: Boolean,
            default: true
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }        
    },
    {
        timestamps: true
    }
)

videoSchema.plugin(mongooseAggregatePaginate)
export const Video = mongoose.model("Video" ,videoSchema)