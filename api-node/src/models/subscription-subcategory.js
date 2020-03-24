import mongoose from 'mongoose'

const subscriptionSubcategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

export default mongoose.model('SubscriptionSubcategory', subscriptionSubcategorySchema)