import mongoose from 'mongoose'

const subscriptionSubgroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

export default mongoose.model('SubscriptionSubgroup', subscriptionSubgroupSchema)