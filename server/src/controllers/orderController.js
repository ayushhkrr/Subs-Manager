import Stripe from 'stripe'
import { User } from '../model/allSchemas.js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const handleStripeWebhook = async(req, res)=>{
    const sig = req.headers['stripe-signature']
    let event

    try{
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        )
    }catch(e){
        console.error('Webhook signature verification failed:', e.message)
        res.status(400).send(`Webhook error: ${e.message}`)
        return
    }

    switch(event.type){
        case 'checkout.session.completed':{
            const session = event.data.object
            console.log('Checkout completed for session:', session.id)

            // Upgrade user to premium
            try {
                const user = await User.findOne({ stripeCustomerId: session.customer })
                if (user) {
                    user.subscriptionStatus = 'premium'
                    await user.save()
                    console.log(`User ${user.username} upgraded to premium`)
                } else {
                    console.log('User not found for customer:', session.customer)
                }
            } catch (error) {
                console.error('Error upgrading user to premium:', error.message)
            }
            break
        }
        case 'invoice.payment_succeeded':{
            const invoice = event.data.object
            console.log('Payment succeeded', invoice.id)

            // Ensure user is still premium (for recurring payments)
            try {
                const user = await User.findOne({ stripeCustomerId: invoice.customer })
                if (user && user.subscriptionStatus !== 'premium') {
                    user.subscriptionStatus = 'premium'
                    await user.save()
                    console.log(`User ${user.username} subscription renewed`)
                }
            } catch (error) {
                console.error('Error renewing subscription:', error.message)
            }
            break
        }
        case 'customer.subscription.deleted':{
            const sub = event.data.object
            console.log('Subscription cancelled', sub.id)

            // Downgrade user to free
            try {
                const user = await User.findOne({ stripeCustomerId: sub.customer })
                if (user) {
                    user.subscriptionStatus = 'free'
                    await user.save()
                    console.log(`User ${user.username} downgraded to free`)
                }
            } catch (error) {
                console.error('Error downgrading user:', error.message)
            }
            break
        }
        default:
            console.log(`Unhandeled event type: ${event.type}`)
    }
   return res.json({received: true})

}


