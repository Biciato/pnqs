import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

// NotFound Page
import NotFound from '../components/NotFound'

// Maintenance
import Maintenance from '../components/Maintenance'

// Auth Pages
import Login from '../components/Auth/Login'
import Signup from '../components/Auth/Signup'
import RememberPassword from '../components/Auth/RememberPassword'

// Candidaturas Pages
import NewCandidatura from '../components/Candidatura/New.vue';
import Candidaturas from '../components/Candidatura/Index.vue';
import ViewCandidatura from "../components/Candidatura/View.vue";

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
  {
		path: "/login",
		component: Login,
		alias: "/",
    meta: {
      public: true, 
      onlyWhenLoggedOut: true
    }
	},
	{
		path: "/signup",
		component: Signup,
    meta: {
      public: true,  
      onlyWhenLoggedOut: true
    }
	},
	{
		path: "/remember-password/:hash",
		component: RememberPassword,
	},
	{
		path: "/solicitacao-elegibilidade",
		component: NewCandidatura,
    meta: {
      loggedIn: true
    }
	},
	{
		path: "/candidaturas",
    component: Candidaturas,
    meta: {
      loggedIn: true
    }
	},
	{
		path: "/visualizar-candidatura/:id",
    component: ViewCandidatura,
    meta: {
      loggedIn: true
    }
	},
	{
		path: "*",
		component: NotFound,
    meta: {
      public: true, 
    }
  },
  {
    path: '/maintenance',
    component: Maintenance,
    meta: {
      maintenance: true, 
    }
  }
]})

router.beforeEach((to, from, next) => {
  const isPublic = to.matched.some(record => record.meta.public)
  const onlyWhenLoggedOut = to.matched.some(record => record.meta.onlyWhenLoggedOut)
  const loggedIn = !!store.getters['auth/loggedIn'];
  const isMaintenance = to.matched.some(record => record.meta.maintenance)
  const maintenance = false

  if (!isPublic && !loggedIn && !maintenance) {
    return next({
      path:'/login',
      query: {redirect: to.fullPath}  // Store the full path to redirect the user to after login
    });
  }

  // Do not allow user to visit login page or register page if they are logged in
  if (loggedIn && onlyWhenLoggedOut) {
    return next('/candidaturas')
  }

  if (!isMaintenance && maintenance) {
    return next({
      path:'/maintenance',
      query: {redirect: to.fullPath}  // Store the full path to redirect the user to after login
    })
  } 

  next();
})

export default router
