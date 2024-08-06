const cloudinary = require('cloudinary')
const productModel = require('../models/product.model')
const userModel = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

const addProduct =(req, res)=>{
    let payload = req.body
    if (payload.product == '' | payload.desc == '' | payload.price == '' | payload.image == '') {
        res.status(302).json({msg: 'All inputs are required'})
    } else {
        cloudinary.v2.uploader.upload(payload.image, (err, result)=>{
            if(err){
                res.status(302).json({message: 'Unable to upload image', err})
            }else{
                payload.imageUrl = result.secure_url
                payload.createdBy = req.user._id
                const productForm = new productModel(payload)
                productForm.save((err)=>{
                    if(err){
                        res.status(302).json({message: 'Internal Server Error'})
                    }else{
                        res.status(202).json({message: 'Product Added Successfully'})
                    }
                })
            }
        })        
    }
}
const allProduct =(req, res)=>{
    productModel.find((err, product)=>{
        if (err) {
            res.status(500).json({message: 'Internal Server Error'})
        } else {
            res.status(200).json({product})
        }
    })
}

const productByUserId = (req, res)=>{
    const userId = req.user._id
    productModel.find({createdBy: userId}, (err, product)=>{
        if (!err) {
            res.status(200).json({product})
        } else {
            res.status(500).json({message: 'Internal Server Error'})
        }
    })
}

const delProduct = (req, res)=>{
    const id = req.body._id
    productModel.findByIdAndDelete(id, (err, result)=>{
        if (!err) {
            res.status(200).json({
                message: result ? 'Product Deleted Successfully' : 'The Product could not be deleted'
            })
        } else {
            res.status(500).json({message: 'Internal Server Error', err})
        }
    })
}

const updateProduct = (req, res)=>{
    const id = req.params.id
    const payload = req.body
    productModel.findByIdAndUpdate(id, payload, (err, result)=>{
        if (!err) {
            res.status(200).json({
                message: result ? 'Product Updated Successfully' : 'The Product could not be updated'
            })
        } else {
            res.status(500).json({message: 'Internal Server Error', err})
        }
    })
}

const signup = (req, res)=>{
    const payload = req.body
    userModel.find({email: payload.email}, async(err, result)=>{
        if (err) {
            res.status(500).json({message: 'Internal Server Error'})
        } else {
            if (result.length == 0) {
                const hashedPassword = await bcrypt.hash(payload.password, 10);
                payload.password = hashedPassword
                const form = new userModel(payload)
                form.save(err=>{
                    if (!err) {
                        res.status(200).json({message: 'Please proceed to login'})
                    } else {
                        res.status(500).json({message: 'Internal Server Error'})
                    }
                })
            } else {
                res.status(300).json({message: 'Email Already exist'})
            }
        }
    })
}

const signin = (req, res)=>{
    const payload = req.body
    userModel.findOne({email: payload.email}, (err, result)=>{
        if (err) {
            res.status(500).json({message: 'Internal Server Error'})
        } else {
            if (result == null) {
                res.status(300).json({message: 'User not found'})
            } else {
                bcrypt.compare(payload.password, result.password).then(same=>{
                    if (same) {                                      
                        const access_token = jwt.sign({result}, process.env.JWT_SECRET, {expiresIn: '6h'})
                        res.status(200).json({message: 'Login Successful', access_token})
                    } else {
                        res.status(300).json({message: 'Incorrect Password'})
                    }
                }).catch((err)=>{            
                    res.status(500).json({message: 'Internal Server Error', err: 'Bcrypt Error'})
                })
            }
        }
    })
}

const currentUser = (req, res)=>{
    res.status(200).json({
        message: 'User retrieved successfully', 
        user: req.user
    })
}

const controller = {
    addProduct, 
    allProduct, 
    signup, 
    signin, 
    currentUser, 
    productByUserId, 
    delProduct,
    updateProduct
}
module.exports = controller