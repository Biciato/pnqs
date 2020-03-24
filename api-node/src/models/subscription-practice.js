import mongoose from 'mongoose'

const subscriptionPracticeSchema = new mongoose.Schema({
    practice_category: {
        type: String, 
        required: true
    },
    subgroup_id: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    area: {
        type: String
    },
    resume: {
        type: String,
        required: true
    },
    criteria_questions: {
        type: String
    },
    implantation_start_dt: {
        type: Date,
        required: true
    },
    results: {
        type: String, 
        required: true
    },
    stakeholders: {
        type: String
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

export default mongoose.model('SubscriptionPractice', subscriptionPracticeSchema)