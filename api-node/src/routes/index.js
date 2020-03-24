import { UserController } from '../controllers/user-controller'
import { SubscriptionController } from '../controllers/subscription-controller'
import { utils } from '../utils'

const routes = app => {
    // User's routes
    app.route('/auth/signup').post(UserController.signup)
    app.route('/auth/login').post(UserController.login)

    // Subscription's routes
    app.route('/subscriptions').get(utils.validateToken, SubscriptionController.index)
    app.route('/subscription').post(utils.validateToken, SubscriptionController.store)
    app.route('/subscription/:id').get(utils.validateToken, SubscriptionController.show)
}

export default routes
