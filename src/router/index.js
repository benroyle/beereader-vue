import Vue from 'vue'
import Router from 'vue-router'
import PageNotFound from './../components/PageNotFound'

Vue.use(Router)

export default new Router({
	routes: [
		/*{
			path: '/',
			name: 'Login',
			component: require('./../components/Login').default
		},*/
		{
			path: '/login',
			name: 'Login',
			component: require('./../components/Login').default
		},
		{
			path: '/app',
			name: 'Content',
			component: require('./../components/Content').default
		},
		{ path: '', redirectTo: '/login', pathMatch: 'full' },
		{ path: '**', component: PageNotFound }
	]
})