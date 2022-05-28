import express from 'express'

import {createUser, signinUser} from '../Controllers/Users.js'


const route = express.Router()



route.post('/signup', createUser)
route.post('/signin', signinUser)


export default route