import PostModel from '../Models/PostMessages.js'

export const getPosts = async (req, res) =>{
   
   try {
        const allPosts = await PostModel.find()
        console.log(allPosts)
    res.status(200).send(allPosts)
   } catch (error) {
        res.status(404).json({message: error.message})
   }
}


export const createPost = async (req,res) =>{
try {
   const body =req.body;
  const post = await new PostModel({...body, Tags: body.Tags.split(',')})
  post.save()
  res.status(200).send(post)
} catch (error) {
    res.status(409).json({message: error.message})
}
}


export const updatePost = async (req, res) => {
    try {
       const id = req.params.id
       const body = req.body
     const post = await PostModel.findByIdAndUpdate(id, body)
    await  post.save()
     res.status(200).send(post)
    } catch (error) {
        res.status(409).json({error: error.message})
    }
}

export const deletePost = async (req, res) => {
    try {
        const {id} = req.params
        console.log(id)
        const deletePost = await PostModel.findByIdAndRemove(id)
        res.status(200).send(deletePost) 
    } catch (error) {
        res.status(409).json({error})
    }
}

export const likedPost = async (req, res) =>{
    try {
        const {id} = req.params
        if(!req.userId) return res.status(404).json({error: 'user is unauthenticated'})
        const post = await PostModel.findById(id)
        const index = post.Likes.indexOf(String(req.userId))
        if(index===-1){
         post.Likes.push(req.userId)
        }else{
        post.Likes=post.Likes.filter((id)=>(id!==String(req.userId)))
        }
       const updatedPost = await PostModel.findByIdAndUpdate(id, post, {new:true});
        res.status(200).send(updatedPost)
    } catch (error) {
        res.status(409).json({error: error.message})
    }
}

