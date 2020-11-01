import RusToLatin from '@/functions/rus_to_latin'

export default function (array, task) {
	let id = RusToLatin(task.title) + '_' + array.category + '_' + (array.data.filter(data => data.title === task.title).length + 1)
	let taskIndex
	let taskId
	checkId(id)
	return taskId
	
	function checkId (id) {
		let check = true
		for (let i = 0; i < array.data.length; i++) {
			if (id === array.data[i].id) {
				check = false
				taskIndex = Number(array.data[i].id.split('_')[2])
				break
			}
		}
		
		if (check === true) {
			taskId = id
		} else {
			id = RusToLatin(task.title) + '_' + array.category + '_' + (taskIndex + 1)
			checkId(id)
		}
	}
}