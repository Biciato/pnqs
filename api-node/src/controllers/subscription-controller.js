import mongoose from "mongoose";
import Subscription from "../models/subscription";

export const SubscriptionController = {
    index: (req, res) => {
        mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }, err => {
            let result = {};
            if (!err) {
                Subscription.find((err, subscriptions) => {
                    if (!err) {
                        result.status = 200;
                        result.result = subscriptions;
                        res.status(200).send(result);
                    } else {
                        result.status = 404;
                        result.error = err;
                        res.status(404).send(result);
                    }
                })
            } else {
                result.status = 500;
                result.error = err;
                res.status(500).send(result);
            }
        })
    }
}