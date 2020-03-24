import mongoose from 'mongoose'

const subscriptionGroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

export default mongoose.model('SubscriptionGroup', subscriptionGroupSchema)