import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import AppFrame from '@/components/AppFrame'
import Admin from '@/components/admin/Admin'
import AdminHome from '@/components/admin/AdminHome'
import DeleteUser from '@/components/admin/DeleteUser'
import EditUser from '@/components/admin/EditUser'
import Profile from '@/components/profile/Profile'
import ProfileHome from '@/components/profile/ProfileHome'
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
			path: '/admin',
			component: Admin,
			children: [
				{
					path: 'editUser/:id',
					name: 'EditUser',
					component: EditUser
				},
				{
					path: 'deleteUser/:id',
					name: 'DeleteUser',
					component: DeleteUser
				},
				{
					path: '',
					name: 'AdminHome',
					component: AdminHome,
				}
			]
		},
		{
			path: '/profile',
			component: Profile,
			children: [
				{
					path: 'addFeed',
					name: 'AddFeed',
					component: AddFeed
				},
				{
					path: 'editFeed/:id',
					name: 'EditFeed',
					component: EditFeed
				},
				{
					path: 'deleteAllFeeds',
					name: 'DeleteAllFeeds',
					component: DeleteAllFeeds
				},
				{
					path: 'deleteFeed/:id',
					name: 'DeleteFeed',
					component: DeleteFeed
				},
				{
					path: 'importOPML',
					name: 'ImportOPML',
					component: ImportOPML
				},
				{
					path: '',
					name: 'ProfileHome',
					component: ProfileHome,
				}
			]
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