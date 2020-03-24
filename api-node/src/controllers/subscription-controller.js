import mongoose from "mongoose"
import Subscription from "../models/subscription"
import SubscriptionPlace from "../models/subscription-place"
import SubscriptionContact from "../models/subscription-contact"
import SubscriptionPractice from "../models/subscription-practice"
import SubscriptionCategory from "../models/subscription-category"
import User from "../models/user"
import propOr from 'ramda/src/propOr'
import jwt from "jsonwebtoken";

export const SubscriptionController = {
    index: (req, res) => {
        mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }, err => {
            let result = {}
            if (!err) {
                Subscription.find((err, subscriptions) => {
                    if (!err) {
                        // mapping subs because it needs to add category object
                        const subscriptionsMap = subscriptions.map(async (sub) => {
                            let cat = await SubscriptionCategory.findOne({ _id: parseInt(sub.subscription_category_id)})
                            return ({ ...sub._doc, category: cat })
                        })
                        Promise.all(subscriptionsMap).then(subs => {
                            result.status = 200
                            result.result = subs
                            res.status(200).send(result)
                        })                        
                    } else {
                        result.status = 404
                        result.error = err
                        res.status(404).send(result)
                    }
                })
            } else {
                result.status = 500
                result.error = err
                res.status(500).send(result)
            }
        })
    },
    show: (req, res) => 
        mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }, err => {
            let result = {}
            if (!err) {
                Subscription.findById(req.params.id, (err, sub) => {
                    if (!err && sub) {
                        const subDepAsync = [1,2,3].map(async (item) => {
                            let places = []
                            let contacts = []
                            let practices = []
                            if (item === 1) {
                                return places = await SubscriptionPlace.find({ subscription_id: parseInt(sub._id)})
                            }
                            if (item === 2) {
                                return contacts = await SubscriptionContact.find({ subscription_id: parseInt(sub._id)})
                            }
                            if (item === 3) {
                                return practices = await SubscriptionPractice.find({ subscription_id: parseInt(sub._id)})
                            }
                        })
                        Promise.all(subDepAsync).then(subs => {
                            console.log(subs)
                            result.status = 200
                            result.result = {
                                ...sub._doc,
                                places: subs[0],
                                contacts: subs[1],
                                practices: subs[2]
                            }
                            res.status(200).send(result)
                        })      
                    } else {
                        result.status = 500
                        result.error = !sub ? 'Não encontrado' : err 
                        res.status(500).send(result)
                    }
                })
            } else {
                result.status = 500
                result.error = err
                res.status(500).send(result)
            }
        }),
    store: (req, res) => 
        mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }, err => {
            let result = {}
            if (!err) {
                const token = req.headers.authorization.split(" ")[1]
                const options = {
                    expiresIn: "2d",
                    issuer: "http://abes-app.org.br",
                }
                const user = jwt.verify(token, process.env.JWT_SECRET, options)
                User.findOne({'name': user.user }, (err, user) => {
                    const subscription = new Subscription({
                        user_id: user.id,
                        tema_igs: req.body.tema_igs,
                        tema_peos: req.body.tema_peos,
                        organization_name: req.body.name,
                        name: req.body.name,
                        document_id: req.body.document_id,
                        economic_activities: req.body.economic_activities || null,
                        economic_activity_start: req.body.economic_activity_start ,
                        homepage: req.body.homepage || null ,
                        subscription_category_id: req.body.subscription_category_id || null ,
                        persons_qt: req.body.persons_qt || null ,
                        group_id: req.body.group_id || null ,
                        subgroup_id: req.body.subgroup_id || null ,
                        practice_category_id: req.body.practice_category_id || null ,
                        practice_name: req.body.practice_name || null ,
                        implantation_start_dt: req.body.implantation_start_dt || null ,
                        practice_resume: req.body.practice_resume || null ,
                        practice_area: req.body.practice_area || null ,
                        criteria_questions: req.body.criteria_questions || null ,
                        results: req.body.results || null ,
                        stakeholders: req.body.stakeholders || null ,
                        has_autonomy: req.body.has_autonomy || null ,
                        agree_suspend: req.body.agree_suspend || null ,
                        agree_examiners: req.body.agree_examiners || null ,
                        subscription_company_size_id: req.body.subscription_company_size_id || null ,
                        subscription_subcategory_id: req.body.subscription_subcategory_id || null ,
                        agree_sqfsa: req.body.agree_sqfsa || null ,
                        has_restriction: req.body.has_restriction || null ,
                        persons_perc: req.body.persons_perc || null , 
                        organization_type: req.body.organization_type || null , 
                        candidate: req.body.candidate,
                        indicate_company_name: req.body.indicate_company_name || null ,
                        year: req.body.year
                    }) 
                    subscription.save((err, subscription) => {
                        if (!err) {
                            req.body.subscription_places.forEach(item => {
                                const subscriptionPlace = new SubscriptionPlace({
                                    name: item.name ,
                                    zipcode: item.zipcode ,
                                    street: item.street ,
                                    city: item.city ,
                                    neighborhood: item.neighborhood ,
                                    state: item.state ,
                                    number: item.number ,
                                    complement: item.complement || null,
                                    persons_qtd: item.persons_qtd ,
                                    subscription_id: subscription._id ,
                                })
                                subscriptionPlace.save((err) => {
                                    result.error = err
                                })
                            })
                            if (req.body.subscription_contacts.length > 0) {
                                req.body.subscription_contacts.forEach(item => {
                                    const subscriptionContact = new SubscriptionContact({
                                        type: item.type ,
                                        name: item.name ,
                                        phone: item.phone ,
                                        email: item.email ,
                                        subscription_id: subscription.id  
                                    })
                                    subscriptionContact.save((err) => {
                                        result.error = err
                                    })
                                })
                            }
                            if (req.body.subscription_practices.length > 0) {
                                req.body.subscription_practices.forEach(item => {
                                    const subscriptionPractice = new SubscriptionPractice({
                                        practice_category: item.practice_category,
                                        subgroup_id:item.subgroup_id,
                                        name: item.name,
                                        area:item.area,
                                        resume: item.resume,
                                        criteria_questions:item.criteria_questions,
                                        implantation_start_dt: item.implantation_start_dt,
                                        results: item.results,
                                        stakeholders:item.stakeholders,
                                        subscription_id: subscription.id  
                                    })
                                    subscriptionPractice.save((err) => {
                                        result.error = err
                                    })
                                })
                            }
                            res.status(200).send({
                                status: result.error ? 500 : 200,
                                message: result.error ? result.error : subscription
                            })
                        } else {
                            result.status = 500
                            result.error = err
                            res.status(result.status).send(result)
                        }                        
                    })
                })                
            } else {
                result.status = 500
                result.error = err
                res.status(result.status).send(result)
            }
        })
}