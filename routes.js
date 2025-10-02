import express from 'express'
import {User, Subscription} from "./model/users.js";
const routes = express.Router()

routes.post('/register', async(req, res)=>{
    try{

        const user = User(req.body)
        await user.save()
        res.status(201).json('User Registered')
    }catch(err){
        console.log(err)
        res.status(400).json('the user request is invalid')
    }
})

routes.get('/subscription/:username', async(req, res)=>{
    try{
         const subDetails = await Subscription.find({userName: req.params.username})
        res.status(200).json(subDetails)
    }catch(err){
        console.error(err)
        res.status(404).json('Details not found')
    }
})

// routes.post('/login', async(req, res)=>{
//     try{
//         const userLogin = {username || email}
//     }catch(err){

//     }
// })