<template>
	<section class="content">
		<div class="content__header">
			<div class="pagename">
				<input :class="[`pagename__title pagename__title--${tasks.color}`, classPage]" type="text" v-model="tasks.pagename">
			</div>
		</div>
		<v-calendar
			class="custom-calendar max-w-full"
			:masks="masks"
			:attributes="attributes"
			disable-page-swipe
			is-expanded
		>
			<template v-slot:day-content="{ day, attributes }">
				<div class="flex flex-col h-full z-10 overflow-hidden">
					<span class="day-label text-sm text-gray-900">{{ day.day }}</span>
					<div class="flex-grow overflow-y-auto overflow-x-auto">
						<p
							v-for="attr in attributes"
							class="text-xs leading-tight rounded-sm p-1 mt-0 mb-1"
							:class="attr.customData.class"
						>
							{{ attr.customData.title }}
						</p>
					</div>
				</div>
			</template>
		</v-calendar>
	</section>
</template>

<script>
	import { mapActions } from 'vuex'
	import Vue from 'vue'
	import VCalendar from 'v-calendar'

	Vue.use(VCalendar);

	export default {
		name: 'section-calendar',

		 data() {
			const month = new Date().getMonth();
			const year = new Date().getFullYear();
			return {
				masks: {
					weekdays: 'WWW',
				},
				attributes: [
					{
						key: 1,
						customData: {
							title: 'Lunch with mom.',
							class: 'bg-red-600 text-white',
						},
						dates: new Date(year, month, 1),
					},
					{
						key: 2,
						customData: {
							title: 'Take Noah to basketball practice',
							class: 'bg-blue-500 text-white',
						},
						dates: new Date(year, month, 2),
					},
					{
						key: 3,
						customData: {
							title: "Noah's basketball game.",
							class: 'bg-blue-500 text-white',
						},
						dates: new Date(year, month, 5),
					},
					{
						key: 4,
						customData: {
							title: 'Take car to the shop',
							class: 'bg-indigo-500 text-white',
						},
						dates: new Date(year, month, 5),
					},
					{
						key: 5,
						customData: {
							title: 'Take car to the shop',
							class: 'bg-indigo-500 text-white',
						},
						dates: new Date(year, month, 5),
					},
					{
						key: 6,
						customData: {
							title: 'Meeting with new client.',
							class: 'bg-teal-500 text-white',
						},
						dates: new Date(year, month, 7),
					},
					{
						key: 7,
						customData: {
							title: "Mia's gymnastics practice.",
							class: 'bg-pink-500 text-white',
						},
						dates: new Date(year, month, 11),
					},
					{
						key: 8,
						customData: {
							title: 'Cookout with friends.',
							class: 'bg-orange-500 text-white',
						},
						dates: { months: 5, ordinalWeekdays: { 2: 1 } },
					},
					{
						key: 9,
						customData: {
							title: "Mia's gymnastics recital.",
							class: 'bg-pink-500 text-white',
						},
						dates: new Date(year, month, 22),
					},
					{
						key: 10,
						customData: {
							title: 'Visit great grandma.',
							class: 'bg-red-600 text-white',
						},
						dates: new Date(year, month, 25),
					},
				],
			};
		},
		
    	beforeUpdate() { 
			document.title = `${this.$store.state.pageTasks.pagename} | Task manager` 
		},

		computed: {
			allTasks() {
				return this.$store.state.tasks
			},

			tasks() {
				return this.$store.state.pageTasks
			},

			classPage() {
				switch (this.$router.currentRoute.path.slice(1)) {
					case 'today':
						return ['pagename__title--today']
						break;

					case 'calendar':
						return ['pagename__title--calendar']
						break;

					case 'selected':
						return ['pagename__title--selected']
						break;

					case 'complete':
						return ['pagename__title--complete']
						break;
				
					default:
						return ['titleContent']
						break;
				}
				// if (this.$router.currentRoute.path.slice(1) != 'today' && 
				// 	this.$router.currentRoute.path.slice(1) != 'calendar' &&
				// 	this.$router.currentRoute.path.slice(1) != 'selected' &&
				// 	this.$router.currentRoute.path.slice(1) != 'complete') {
				// 		return ['titleContent']
				// }
			}
		},

		created() {
			this.getTasks()

			let NameForGettingTasks = this.$router.currentRoute.path.slice(1)
			this.getPageTasks({ NameForGettingTasks })
		},

		methods: {
			...mapActions(['getTasks', 'getPageTasks']),
		}
	}
</script>

<style lang="scss">
	::-webkit-scrollbar {
		width: 0px;
	}

	::-webkit-scrollbar-track {
		display: none;
	}

	.custom-calendar.vc-container {
		--day-border: 1px solid #b8c2cc;
		--day-border-highlight: 1px solid #b8c2cc;
		--day-width: 90px;
		--day-height: 90px;
		--weekday-bg: #f8fafc;
		--weekday-border: 1px solid #eaeaea;
		border-radius: 0;
		width: 100%;

		& .vc-header {
			background-color: #f1f5f8;
			padding: 10px 0;
		}

		& .vc-weeks {
			padding: 0;
		}

		& .vc-weekday {
			background-color: var(--weekday-bg);
			border-bottom: var(--weekday-border);
			border-top: var(--weekday-border);
			padding: 5px 0;
		}

		& .vc-day {
			padding: 0 5px 3px 5px;
			text-align: left;
			height: var(--day-height);
			min-width: var(--day-width);
			background-color: white;
			
				&.weekday-1,
				&.weekday-7 {
					background-color: #eff8ff;
				}

				&:not(.on-bottom) {
					border-bottom: var(--day-border);

					&.weekday-1 {
						border-bottom: var(--day-border-highlight);
					}
				}

				&:not(.on-right) {
					border-right: var(--day-border);
				}
		}

		& .vc-day-dots {
			margin-bottom: 5px;
		}
	}
</style>