import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username:{type: String, required: true, unique: true},
    password: {type:String, required:true},
    email: {type:String, required:true, unique: true}
})

const subSchema = new mongoose.Schema({
    userName: {type: String, required: true},
    userId: {type:mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    plan: {type: String, required: true},
    price: {type: Number, required: true},
    renewalDate: {type: Date, required: true}
})

const User = mongoose.model('User', userSchema)
const Subscription = mongoose.model('Subscription', subSchema)

export {User, Subscription} 