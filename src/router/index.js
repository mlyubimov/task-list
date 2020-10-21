import Vue from 'vue'
import VueRouter from 'vue-router'
import SectionList from '../components/section-list'

Vue.use(VueRouter)

export const routes = [
	{
		path: '/',
		redirect: '/today',
	},
	{
		path: '/today',
		component: SectionList,
		props: {category: 'today'}
	},
	{
		path: '/selected',
		component: SectionList,
		props: {category: 'selected'}
	},
	{
		path: '/complete',
		component: SectionList,
		props: {category: 'complete'}
	},
	{
		path: '/calendar',
		component: SectionList,
		props: {category: 'date'}
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
