import api from "@/api/idb";

export default {
	addTaskToDb(context, { task }) {
		return api.saveTask(task);
	},

	async getTasks({ commit }) {
		let tasks = await api.getTasks();
		commit("SET_TASKS", tasks);
	},

	updateTaskToDb(context, { task }) {
		return api.updateTask(task);
	},

	deleteTaskFromDb(context, { task }) {
		return api.deleteTask(task);
	},

	addCategoryToDb(context, { category }) {
		return api.addCategory(category);
	},

	deleteCategoriesFromDb(context, { category }) {
		return api.deleteCategory(category);
	},

	updateCategoryToDb(context, { allTasks, category }) {
		return api.updateCategory(allTasks, category);
	},

	async getCategoryFromDb({ commit }, { category }) {
		let tasks = await api.getCategory(category);
		commit("SET_TASKS", tasks);
	},

	async getPageTasks({ commit }, { NameForGettingTasks }) {
		let tasks = await api.getPageTasks(NameForGettingTasks);
		commit("SET_PAGE_TASKS", tasks);
	}
};
