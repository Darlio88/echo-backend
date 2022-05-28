import express from 'express'

//importing the controllers
import {getPosts, createPost,updatePost, deletePost, likedPost} from '../Controllers/Posts.js'

//importing authorization middleware
import {Auth} from '../Middleware/Auth.js'


const route = express.Router()

route.get('/', getPosts)
route.post('/', Auth, createPost)
route.patch('/:id',Auth, updatePost)
route.delete('/:id',Auth, deletePost)
route.patch('/liked/:id', Auth, likedPost)
export default route