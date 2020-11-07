import api from '@/api/idb'

export default {
	addTaskToDb ({ commit }, { task }) {
		return api.saveTask(task)
	},

	async getTasks({ commit }) {
		let tasks = await api.getTasks()
		commit('SET_TASKS', tasks)
	},

	updateTaskToDb({ commit }, { task }) {
		return api.updateTask(task)
	},

	deleteTaskFromDb({ commit }, { task }) {
		return api.deleteTask(task)
	},

	addCategoryToDb({ commit }, { category }) {
		return api.addCategory(category)
	},

	deleteCategoriesFromDb({ commit }, { category }) {
		return api.deleteCategory(category)
	},

	updateCategoryToDb({ commit }, { category, allTasks }) {
		return api.updateCategory(allTasks, category)
	},

	async getCategoryFromDb({ commit }, { category }) {
		let tasks = await api.getCategory(category)
		commit('SET_TASKS', tasks)
	},

	async getPageTasks({ commit }, { NameForGettingTasks }) {
		let tasks = await api.getPageTasks(NameForGettingTasks)
		commit('SET_PAGE_TASKS', tasks)
	}
}