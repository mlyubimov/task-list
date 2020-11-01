<template>
	<div>
		<button @click=addCategory(pagename)>Добавить категорию</button>
		<input v-model="pagename" type="text">
		<ul v-for="(tasks, index) in allTasks" :key="tasks.category">
			<button @click="addTask(tasks)">Добавить задачу</button>
			<button @click="deleteCategory(tasks)">Удалить категорию</button>
			<li> 
				<input v-model="tasks.pagename" @blur="updateCategory(tasks)" type="text">
				<h2>{{tasks.pagename}}</h2>
				<h2>{{tasks.category}}</h2>
			</li>
			<li v-for="task in tasks.data" :key="task.id">
				<strong>Title:</strong> {{task.title}} 
				<br>
				<strong>id:</strong> {{task.id}}. <button @click="deleteTask(task)">Delete</button>
			</li>
		</ul>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
	import RusToLatin from '@/functions/rus_to_latin'
	import GetItemId from '@/functions/getting_item_id'

	export default {
		name: 'Tasks',
		data() {
			return {
				pagename: 'Новая категория'
			}
		},
		computed: {
			allTasks() {
				return this.$store.state.tasks
			}
		},
		created () {
			this.getTasks()
		},
		methods: {
			...mapActions(['getTasks', 'getPageTasks', 'addTaskToDb', 'addCategoryToDb', 'updateCategoryToDb']),
			async addTask (tasks) {
				// random task for now
				const task = {
					title: 'Task_' + Math.floor(Math.random() * 10),
					id: '',
					date: null,
					completed: false,
					selected: false,
					focused: false
				}
				task.id = GetItemId(tasks, task)

				await this.addTaskToDb({ task })
				this.getTasks()
				let NameForGettingTasks = tasks.category
				this.getPageTasks({ NameForGettingTasks })
			},

			async deleteTask(task) {
				await this.$store.dispatch('deleteTaskFromDb', { task })
				this.getTasks()
			},

			async addCategory(pagename) {
				const category = {
					pagename: pagename,
					category: RusToLatin(pagename),
					color: 'purple',
					data: []
				}

				this._data.pagename = 'Новая категория'

				await this.addCategoryToDb({ category })
				this.getTasks()
			},

			async deleteCategory(category) {
				await this.$store.dispatch('deleteCategoriesFromDb', { category })
				this.getTasks()
			},

			async updateCategory(category) {
				await this.updateCategoryToDb({ category })
				// this.$router.push({name: 'pagenameCategory', params: {pagenameCategory: category, category: category} })
				this.getTasks()
			}
		}
	}
</script>