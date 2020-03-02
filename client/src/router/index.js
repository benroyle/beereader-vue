import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import AppFrame from '@/components/AppFrame'
import Register from '@/components/Register'
import Logout from '@/components/Logout'
import PageNotFound from '@/components/PageNotFound'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'Login',
			component: Login
		},
		{
			path: '/app',
			name: 'AppFrame',
			component: AppFrame
		},
		{
      path: '/register',
      name: 'Register',
      component: Register
    },
		{
			path: '/logout',
			name: 'Logout',
			component: Logout
		},
		{
			path: '*',
			name: 'PageNotFound',
			component: PageNotFound
		}
	]
})