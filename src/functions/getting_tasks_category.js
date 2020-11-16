export default function(allTasks, categoryName) {
	categoryName = categoryName.replace(/_+/g, "-");

	let id =
		categoryName +
		"_" +
		(allTasks.filter(data => data.category === categoryName).length + 1);
	let taskIndex;
	let taskId;
	checkId(id);
	return taskId;

	function checkId(id) {
		let check = true;
		for (let i = 0; i < allTasks.length; i++) {
			if (id === allTasks[i].category) {
				check = false;
				taskIndex = Number(allTasks[i].category.split("_")[1]);
				break;
			}
		}

		if (check === true) {
			taskId = id;
		} else {
			id = categoryName + "_" + (taskIndex + 1);
			checkId(id);
		}
	}
}
