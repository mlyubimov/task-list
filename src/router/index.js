import Vue from 'vue'
import VueRouter from 'vue-router'
import SectionList from '@/components/section-list'

Vue.use(VueRouter)

let Component = SectionList

let routes = [
	{
		path: '/',
		redirect: '/today',
	},
	{
		path: '/today',
		component: Component,
		props: {category: 'today'}
	},
	{
		path: '/selected',
		component: Component,
		props: {category: 'selected'}
	},
	{
		path: '/complete',
		component: Component,
		props: {category: 'complete'}
	},
	{
		path: '/calendar',
		component: Component,
		props: {category: 'date'}
	},
	{
		path: '/:pagenameCategory',
		name: 'pagenameCategory',
		component: Component,
		props: true
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	props: ['category'],
	routes
})

export default router
