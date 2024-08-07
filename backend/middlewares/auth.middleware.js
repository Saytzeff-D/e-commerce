const jwt = require('jsonwebtoken')

const authenticate = (req, res, next)=>{
    const splitJWT = req.headers.authorization
    if (splitJWT) {
        const token = splitJWT.split(' ')[1]        
        jwt.verify(token, process.env.JWT_SECRET, (err, data)=>{
            if (err) {                
                res.status(300).json({message: 'Expired Access Token'})
            } else {            
                req.user = data.result
                next()
            }
        })
    } else {
        res.status(500).json({message: 'Invalid Access Token'})
    }
}

module.exports = { authenticate }