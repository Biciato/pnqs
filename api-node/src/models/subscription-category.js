import mongoose from 'mongoose'

const subscriptionCategorySchema = new mongoose.Schema({
    _id: Number,
    name: {
        type: String,
        required: true
    }
}, { collection: 'subscriptionCategories' })

export default mongoose.model('SubscriptionCategory', subscriptionCategorySchema)