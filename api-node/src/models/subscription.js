import mongoose from "mongoose";

// Subscription Columns
const subscriptionSchema = new mongoose.Schema({
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
        type: Boolean
    },
    is_public: {
        type: Boolean,
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
        type: Boolean
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
        type: Boolean
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
        type: Boolean
    },
    year: {
        type: Date
    },
    active: {
        type: Boolean
    },
})

export default mongoose.model("Subscription", subscriptionSchema);