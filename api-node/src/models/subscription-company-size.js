import mongoose from 'mongoose'

const subscriptionCompanySizeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

export default mongoose.model('SubscriptionCompanySize', subscriptionCompanySizeSchema)