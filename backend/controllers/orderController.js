import Stripe from 'stripe'

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
        break
        }
        case 'invoice.payment_succeeded':{
            const invoice = event.data.object
            console.log('Payment succeeded', invoice.id)
            break
        }
        case 'customer.subscription.deleted':{
            const sub = event.data.object
            console.log('Subscription cancelled', sub.id)
            break
        }
            default:
            console.log(`Unhandeled event type: ${event.type}`)
    }
   return res.json({received: true})

}


