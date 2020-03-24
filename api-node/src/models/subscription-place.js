import mongoose from 'mongoose'

const subscriptionPlaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    zipcode: {
        type: String, 
        required: true
    },
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        default: 'Brazil'
    },
    neighborhood: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    number: {
        type: Number, 
        required: true
    },
    complement: {
        type: String
    },
    persons_qtd: {
        type: Number, 
        required: true
    },
    subscription_id: {
        type: String, 
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('SubscriptionPlace', subscriptionPlaceSchema)