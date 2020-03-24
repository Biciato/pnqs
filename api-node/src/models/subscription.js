import mongoose from "mongoose"
import {MongooseAutoIncrementID} from 'mongoose-auto-increment-reworked'

// Subscription Columns
const subscriptionSchema = new mongoose.Schema({
    _id: Number,
    user_id: {
        type: String,
        required: true
    },
    tema_igs: {
        type: String
    },
    tema_peos: {
        type: String
    },
    organization_name: {
        type: String,
        required: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    document_id: {
        type: String,
        required: true,
        trim: true,
    },
    economic_activities: {
        type: String,
        required: true,
        trim: true,
    },
    economic_activity_start: {
        type: String,
        required: true,
        trim: true,
    },
    homepage: {
        type: String
    },
    subscription_category_id: {
        type: String,
        required: true,
        trim: true,
    },
    is_autonomous: {
        type: Boolean,
        default: false
    },
    is_public: {
        type: Boolean,
        default: false
    },
    persons_qt: {
        type: Number
    },
    group_id: {
        type: Number
    },
    subgroup_id: {
        type: Number
    },
    status: {
        type: String,
        default: 'ANL'
    },
    status_reason: {
        type: String
    },
    practice_category_id: {
        type: Number
    },
    practice_name: {
        type: String
    },
    implantation_start_dt: {
        type: Date
    },
    practice_resume: {
        type: String
    },
    practice_area: {
        type: String
    },
    criteria_questions: {
        type: String
    },
    results: {
        type: String
    },
    stakeholders: {
        type: String
    },
    has_autonomy: {
        type: Boolean
    },
    agree_suspend: {
        type: String
    },
    agree_examiners: {
        type: String
    },
    subscription_company_size_id: {
        type: Number
    },
    subscription_subcategory_id: {
        type: Number
    },
    agree_sqfsa: {
        type: Boolean
    },
    has_restriction: {
        type: Boolean
    },
    removed: {
        type: Boolean,
        default: false
    },
    persons_perc: {
        type: String
    }, 
    organization_type: {
        type: String
    }, 
    candidate: {
        type: String,
        required: true,
    },
    indicate_company_name: {
        type: String
    },
    reviewer_id: {
        type: Number,
        default: 7
    },
    year: {
        type: Date
    },
    active: {
        type: Boolean,
        default: true
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
 
/*
 * Alternatively, just use schema.plugin(). The options passed MUST contain the "modelName" key and, optionally,
 * any of the parameters from the configuration section below.
 */
subscriptionSchema.plugin(MongooseAutoIncrementID.plugin, {modelName: 'Subscription'})

export default mongoose.model("Subscription", subscriptionSchema)