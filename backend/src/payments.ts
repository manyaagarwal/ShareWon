import Stripe from 'stripe';
import * as dotenv from 'dotenv';
const env = dotenv.config()
// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/account/apikeys
if (env.error){
    throw env.error
}
const stripeSecretKey = env.parsed.STRIPE_SECRET_KEY
export const stripePublicKey = env.parsed.STRIPE_PUBLIC_KEY
console.log(stripeSecretKey)
export const stripe = new Stripe(stripeSecretKey,
{
    apiVersion: '2020-08-27'
});


