import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import AppFrame from '@/components/AppFrame'
import MyDetails from '@/components/MyDetails'
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
      path: '/register',
      name: 'Register',
      component: Register
    },
		{
			path: '/app',
			name: 'AppFrame',
			component: AppFrame
		},
		{
			path: '/user',
			name: 'MyDetails',
			component: MyDetails
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