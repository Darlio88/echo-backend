import jwt from 'jsonwebtoken'


export const Auth = (req, res, next) =>{
    try {
        const token = req.headers.authorization?.split(' ')[1]
        console.log(token)
        let decodedData = jwt.verify(token, process.env.TOKEN_KEY)
        console.log(decodedData)
        req.userId = decodedData?.id
    } catch (error) {
        console.log('an error has occured')
        console.log(error)
        console.log(error.message)
    }
   next() 
   
}