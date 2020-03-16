import Vue from 'vue'
import VueRouter from 'vue-router'

// Component if not found a component
import Login from '../../components/Auth/Login.vue';
import PedidosElegibilidade from "../../components/Pedidos/PedidosElegibilidade.vue";
import NotFound from "../../components/NotFound.vue";
import DadosFormulario from "../../components/Pedidos/DadosFormulario.vue";
import AuthService from '../../auth/AuthService';
const auth = new AuthService();
const { requiresAuth } = auth;

Vue.use(VueRouter);


const routes = [
	{
		path: "/login",
		component: Login,
		alias: "/"
	},
	{
		path: "*",
		component: NotFound,
		meta: {
			headerWithoutNav: true
		}
	},
	{
		path: "/pedidos-elegibilidade",
		component: PedidosElegibilidade,
		beforeEnter: requiresAuth
	},
	{
		path: "/dados-formulario/:id",
		component: DadosFormulario,
		beforeEnter: requiresAuth
	}
];

export const router = new VueRouter({
	routes: routes,
	scrollBehavior (to, from, savedPosition) {
		return { x: 0, y: 0 }
	}
});

router.afterEach((to, from) => {
	scrollToTop(500)
});

function scrollToTop(scrollDuration) {
	var cosParameter = window.scrollY / 2,
	scrollCount = 0,
	oldTimestamp = performance.now();
	function step (newTimestamp) {
		scrollCount += Math.PI / (scrollDuration / (newTimestamp - oldTimestamp));
		if (scrollCount >= Math.PI) window.scrollTo(0, 0);
		if (window.scrollY === 0) return;
		window.scrollTo(0, Math.round(cosParameter + cosParameter * Math.cos(scrollCount)));
		oldTimestamp = newTimestamp;
		window.requestAnimationFrame(step);
	}
	window.requestAnimationFrame(step);
}
