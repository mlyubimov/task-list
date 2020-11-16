module.exports = {
	publicPath: process.env.NODE_ENV === "production" ? "/task-manager/" : "/",
	pages: {
		index: {
			entry: "src/main.js",
			title: "Task manager"
		},
		404: {
			entry: "src/main.js",
			title: "Task manager"
		}
	},

	transpileDependencies: ["v-calendar"]
};
