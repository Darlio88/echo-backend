import mongoose from 'mongoose'

const PostSchema =  mongoose.Schema(
{
  Title: String,
  Message: String,
  Creator: String,
  CreatorId:String,
  Tags:[String],
  selectedFile: String,
  Likes: {
      type:[String],
      default: []
  },
  createdAt:{
      type:Date,
      immutable: true,
      default: ()=> new Date(),
  }
}
)

const PostModel = mongoose.model('PostModel', PostSchema)
export default PostModel