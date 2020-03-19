import { UserController } from '../controllers/user-controller'
import { SubscriptionController } from '../controllers/subscription-controller'
import { utils } from '../utils'

const routes = app => {
    app.route('/auth/signup').post(UserController.signup)
    app.route('/auth/login').post(UserController.login)
    app.route('/subscriptions').get(utils.validateToken, SubscriptionController.index)
}

export default routes
