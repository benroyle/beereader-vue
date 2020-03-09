import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import AppFrame from '@/components/AppFrame'
import MyDetails from '@/components/myDetails/MyDetails'
import AddFeed from '@/components/myDetails/AddFeed'
import DeleteAllFeeds from '@/components/myDetails/DeleteAllFeeds'
import DeleteFeed from '@/components/myDetails/DeleteFeed'
import EditFeed from '@/components/myDetails/EditFeed'
import ImportOPML from '@/components/myDetails/ImportOPML'
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
			component: MyDetails,
		},
		{
			path: '/user/addFeed',
			name: 'AddFeed',
			component: AddFeed
		},
		{
			path: '/user/editFeed/:id',
			name: 'EditFeed',
			component: EditFeed
		},
		{
			path: '/user/deleteAllFeeds',
			name: 'DeleteAllFeeds',
			component: DeleteAllFeeds
		},
		{
			path: '/user/deleteFeed/:id',
			name: 'DeleteFeed',
			component: DeleteFeed
		},
		{
			path: '/user/importOPML',
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