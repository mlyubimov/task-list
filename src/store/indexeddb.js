let db
let dbReq = indexedDB.open('myDB', 1)

dbReq.onupgradeneeded = (event) => {
	// Зададим переменной db ссылку на базу данных
	db = event.target.result

	// Создадим хранилище объектов с именем notes
	let allTasks = db.createObjectStore('allTasks', {keyPath: 'category'})
}

// console.log(dbReq)

// let array = [
// 	{
// 		title: 'Первая домашняя задача',
// 		date: null,
// 		completed: false,
// 		selected: false,
// 		focused: false
// 	},
// 	{
// 		title: 'Вторая домашняя задача',
// 		date: null,
// 		completed: false,
// 		selected: false,
// 		focused: false
// 	},
// 	{
// 		title: 'Третья домашняя задача',
// 		date: null,
// 		completed: false,
// 		selected: false,
// 		focused: false
// 	},
// 	{
// 		title: 'Четвёртая домашняя задача',
// 		date: null,
// 		completed: false,
// 		selected: false,
// 		focused: false
// 	}
// ]

dbReq.onsuccess = (event) => {
	db = event.target.result

	// addStickyNote(db, 'Home', 'ctr', 'purple')
	// addData(db, 'ctr', array)
}

dbReq.onerror = (event) => {
	alert('error opening database ' + event.target.errorCode)
}

const addStickyNote = (pagename, category, color) => {
	// Запустим транзакцию базы данных и получите хранилище объектов Notes
	let tx = db.transaction(['allTasks'], 'readwrite');
	let store = tx.objectStore('allTasks');

	// Добаляем категорию в хранилище объектов
	let task = {
		pagename: pagename,
		category: category,
		color: color,
		data: [],
		timestamp: Date.now()
	};
	store.add(task);
	
	// Ожидаем завершения транзакции базы данных
	tx.oncomplete = () => {
		console.log('stored note!')
	}
	tx.onerror = (event) => {
		// alert('error storing note ' + event.target.errorCode);
	}
}

const addData = function(category, array) {
	let tx = db.transaction(['allTasks'], 'readwrite');
	let store = tx.objectStore('allTasks');

	let task = store.get(category)

	task.onsuccess = (e) => {
		e.target.result.data = array // обновляем data у значения с ключём category

		store.put(e.target.result) // обновляем данные в хранилище объектов
	}

	task.onerror = (event) => {
		console.log(event.target.errorCode)
	}
}