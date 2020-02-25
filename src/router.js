import Vue from 'vue'
import Router from 'vue-router'
import PageNotFound from './components/PageNotFound'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		/*{
			path: '/',
			redirect: to => {
				const { hash, params, query } = to
				if (query.to === 'foo') {
				  return { path: '/foo', query: null }
				}
				if (hash === '#baz') {
				  return { name: 'baz', hash: '' }
				}
				if (params.id) {
				  return '/with-params/:id'
				} else {
				  return '/bar'
				}
	    }
		},*/
		{
			path: '/login',
			name: 'Login',
			component: require('./components/Login').default
		},
		{
			path: '/app',
			name: 'AppFrame',
			alias: '',
			component: require('./components/AppFrame').default
		},
		{
			path: '*',
			name: 'PageNotFound',
			component: require('./components/PageNotFound').default
		}
	]
})