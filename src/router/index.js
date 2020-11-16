import Vue from 'vue'
import VueRouter from 'vue-router'
import SectionList from '@/components/section-list'
// import SectionCalendar from '@/components/section-calendar'
import SectionEmpty from '@/components/section-empty'

Vue.use(VueRouter)

let Component = SectionList

let routes = [
	{
		path: '/',
		redirect: '/today',
	},
	{
		path: '/today',
		component: SectionEmpty,
		props: { category: 'today' }
	},
	{
		path: '/calendar',
		component: SectionEmpty,
		props: { category: 'date' }
	},
	{
		path: '/selected',
		component: SectionEmpty,
		props: { category: 'selected' }
	},
	{
		path: '/complete',
		component: SectionEmpty,
		props: { category: 'complete' }
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
