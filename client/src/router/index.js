import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import AppFrame from '@/components/AppFrame'
import Profile from '@/components/profile/Profile'
import AddFeed from '@/components/profile/AddFeed'
import DeleteAllFeeds from '@/components/profile/DeleteAllFeeds'
import DeleteFeed from '@/components/profile/DeleteFeed'
import EditFeed from '@/components/profile/EditFeed'
import ImportOPML from '@/components/profile/ImportOPML'
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
			path: '/profile',
			name: 'Profile',
			component: Profile,
		},
		{
			path: '/profile/addFeed',
			name: 'AddFeed',
			component: AddFeed
		},
		{
			path: '/profile/editFeed/:id',
			name: 'EditFeed',
			component: EditFeed
		},
		{
			path: '/profile/deleteAllFeeds',
			name: 'DeleteAllFeeds',
			component: DeleteAllFeeds
		},
		{
			path: '/profile/deleteFeed/:id',
			name: 'DeleteFeed',
			component: DeleteFeed
		},
		{
			path: '/profile/importOPML',
			name: 'ImportOPML',
			component: ImportOPML
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