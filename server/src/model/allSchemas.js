import mongoose from 'mongoose'
import validator from 'email-validator'

const userSchema = new mongoose.Schema({
    fullName : {type: String, required: true},
    username:{type: String, required: true, unique: true},
    password: {type:String, required:true},
    email: {type:String, required:true, unique: true, trim: true,   validate: {
      validator: (value) => validator.validate(value),
      message: "Please enter a valid email address"
    }},
    subscriptionStatus: {
        type: String,
        enum: ['free', 'premium'],
        default: 'free'
    },
    stripeCustomerId: {type: String}
})

const subSchema = new mongoose.Schema({
    userId: {type:mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    plan: {type: String, required: true},
    price: {type: Number, required: true},
    currency: {type: String, default: 'USD'},
    renewalDate: {type: Date, required: true}
})

const User = mongoose.model('User', userSchema)
const Subscription = mongoose.model('Subscription', subSchema)

export {User, Subscription} 