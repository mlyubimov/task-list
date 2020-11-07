import RusToLatin from '@/functions/rus_to_latin'
import GetTasksCategory from '@/functions/getting_tasks_category'

const DB_NAME = 'taskdb'
const STORAGE_NAME = 'tasks'
const DB_VERSION = 1
let DB

export default {
	async getDb () {
		return new Promise((resolve, reject) => {
			if (DB) {
				return resolve(DB)
			}
			const request = window.indexedDB.open(DB_NAME, DB_VERSION)

			request.onerror = e => {
				console.log('Error opening db', e)
				reject('Error')
			}

			request.onsuccess = e => {
				DB = e.target.result
				resolve(DB)
			}

			request.onupgradeneeded = e => {
				let db = e.target.result
				let objectStore = db.createObjectStore(STORAGE_NAME, { autoIncrement: true, keyPath: 'category' })

				objectStore.createIndex('today', 'category')
			}
		})
	},

	async getTasks () {
		let db = await this.getDb()
		return new Promise(resolve => {
			let trans = db.transaction([STORAGE_NAME], 'readonly')
			trans.oncomplete = () => {
				resolve(tasks)
			}

			const store = trans.objectStore(STORAGE_NAME)
			const tasks = []
			
			store.openCursor().onsuccess = e => {
				const cursor = e.target.result
				if (cursor) {
					tasks.push(cursor.value)
					cursor.continue()
				}
			}
		})
	},

	async getPageTasks (NameForGettingTasks) {
		let db = await this.getDb()
		return new Promise(resolve => {
			let trans = db.transaction([STORAGE_NAME], 'readonly')
			trans.oncomplete = () => {
				resolve(tasks)
			}

			let tasks = {}

			switch (NameForGettingTasks) {
				case 'today':
					tasks.pagename = 'Задачи на сегодня'
					tasks.category = 'today'
					tasks.color = 'cyan'
					tasks.data = []
					break;

				case 'calendar':
					tasks.pagename = 'Календарь задач'
					tasks.category = 'today'
					tasks.color = 'blue'
					tasks.data = []
					break;

				case 'selected':
					tasks.pagename = 'Избранные задачи'
					tasks.category = 'today'
					tasks.color = 'yellow'
					tasks.data = []
					break;

				case 'complete':
					tasks.pagename = 'Выполненные задачи'
					tasks.category = 'today'
					tasks.color = 'green'
					tasks.data = []
					break;

				default:
					const store = trans.objectStore(STORAGE_NAME).get(NameForGettingTasks)
			
					store.onsuccess = e => {
						tasks = e.target.result
					}	
					break;
			}	
		})
	},

	async saveTask (task) {
		let db = await this.getDb()
		return new Promise(resolve => {
			let trans = db.transaction([STORAGE_NAME], 'readwrite')
			trans.oncomplete = () => {
				resolve()
			}

			let store = trans.objectStore(STORAGE_NAME)
			let taskCategory = task.id.split('_')
			taskCategory.shift()
			taskCategory.pop()

			let getTaskCategory = store.get(taskCategory.join('_'))

			getTaskCategory.onsuccess = (e) => {
				e.target.result.data.push(task) // обновляем data у значения с ключём category
				store.put(e.target.result) // обновляем данные в хранилище объектов
			}
		})
	},

	async updateTask (task) {
		let db = await this.getDb()
		return new Promise(resolve => {
			let trans = db.transaction([STORAGE_NAME], 'readwrite')
			trans.oncomplete = () => {
				resolve()
			}

			let store = trans.objectStore(STORAGE_NAME)
			let taskCategory = task.id.split('_')
			taskCategory.shift()
			taskCategory.pop()

			let getTaskCategory = store.get(taskCategory.join('_'))

			getTaskCategory.onsuccess = (e) => {
				for (let i = 0; i < e.target.result.data.length; i++) {
					if (task.id === e.target.result.data[i].id) {
						e.target.result.data[i] = task
					}
				}
				store.put(e.target.result)
			}
		})
	},

	async deleteTask (task) {
		const db = await this.getDb()
		return new Promise(resolve => {
			const trans = db.transaction([STORAGE_NAME], 'readwrite')
			trans.oncomplete = () => {
				resolve()
			}

			const store = trans.objectStore(STORAGE_NAME)
			let taskCategory = task.id.split('_')
			taskCategory.shift()
			taskCategory.pop()

			let getTaskCategory = store.get(taskCategory.join('_'))

			getTaskCategory.onsuccess = (e) => { //определяем index элемента
				let indexOf = () => {
					for(let i = 0; i < e.target.result.data.length; i ++) {
						if(e.target.result.data[i].id === task.id) {
							return i
						}
					}
				}
				let index = indexOf()
				e.target.result.data.splice(index, 1) //удаляем элемент по его index

				store.put(e.target.result) // обновляем данные в хранилище объектов
			}
		})
	},

	async addCategory (category) {
		let db = await this.getDb()
		return new Promise(resolve => {
			let trans = db.transaction([STORAGE_NAME], 'readwrite')

			let store = trans.objectStore(STORAGE_NAME)
			store.add(category)

			trans.oncomplete = () => {
				console.log('Category added!')
				resolve()
			}
		})
	},

	async deleteCategory (category) {
		let db = await this.getDb()
		return new Promise(resolve => {
			let trans = db.transaction([STORAGE_NAME], 'readwrite')

			let store = trans.objectStore(STORAGE_NAME)
			
			store.delete(category.category)

			trans.oncomplete = () => {
				console.log('Category deleted!')
				resolve()
			}
		})
	},

	async updateCategory (allTasks, category) {
		let db = await this.getDb()
		return new Promise(resolve => {
			let trans = db.transaction([STORAGE_NAME], 'readwrite')
			trans.oncomplete = () => {
				resolve(resultCategory)
			}

			let store = trans.objectStore(STORAGE_NAME)
			let taskCategory = store.get(category.category)
			let resultCategory
			
			taskCategory.onsuccess = (e) => {

				let result = e.target.result

				store.delete(result.category)

				if (result.pagename != category.pagename) {
					result.category = GetTasksCategory(allTasks, RusToLatin(category.pagename))
				}
				
				result.pagename = category.pagename
				resultCategory = result.category
				result.color = category.color

				for (let i = 0; i < category.data.length; i++) {
					category.data[i].id = category.data[i].id.split('_')
					let FirstPartOfCategory = category.data[i].id.shift()
					let LastPartOfCategory = category.data[i].id.pop()
					category.data[i].id = FirstPartOfCategory + '_' + resultCategory + '_' + LastPartOfCategory
				}

				result.data = category.data

				store.add(result)
			}
		})
	}
}