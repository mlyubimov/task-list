<template>
	<li
		:class="[
			'content__item',
			this.task.completed
				? 'content__item--completed'
				: this.task.selected
				? 'content__item--selected'
				: ''
		]"
	>
		<button class="btn content__btn" type="button" @click="completeTask">
			<svg
				width="22"
				height="22"
				viewBox="0 0 25 25"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<rect
					x="1"
					y="1"
					width="23"
					height="23"
					rx="11.5"
					stroke="#4F4F4F"
					stroke-width="2"
				/>
				<g>
					<rect
						x="6"
						y="12.4853"
						width="2"
						height="7"
						rx="1"
						transform="rotate(-45 6 12.4853)"
						fill="#4F4F4F"
					/>
					<rect
						x="18.0209"
						y="7.53552"
						width="2"
						height="12"
						rx="1"
						transform="rotate(45 18.0209 7.53552)"
						fill="#4F4F4F"
					/>
				</g>
			</svg>
		</button>
		<input
			:class="[
				'content__title',
				this.task.completed ? 'content__title--completed' : ''
			]"
			type="text"
			v-model="task.title"
			v-focus
			@focus="task.focused = true"
			@blur="
				task.focused = false;
				deleteTask(task, 'input');
				taskId(task);
			"
		/>
		<v-date-picker v-model="task.date" class="abc">
			<template v-slot="{ togglePopover }">
				<button
					class="btn content__btn"
					type="button"
					@click="togglePopover({ placement: 'auto' })"
				>
					<svg
						width="21"
						height="21"
						viewBox="0 0 25 25"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<rect
							x="1"
							y="1"
							width="23"
							height="23"
							rx="5"
							stroke="black"
							stroke-width="2"
						/>
						<path
							d="M6 1H19C21.7614 1 24 3.23858 24 6V8H1V6C1 3.23858 3.23858 1 6 1Z"
							fill="black"
							stroke="black"
							stroke-width="2"
						/>
						<path
							d="M10.2967 20.5C9.69673 20.5 9.16473 20.376 8.70073 20.128C8.23673 19.872 7.87273 19.528 7.60873 19.096C7.34473 18.656 7.21273 18.164 7.21273 17.62C7.21273 17.436 7.26473 17.288 7.36873 17.176C7.48073 17.056 7.61273 16.996 7.76473 16.996C7.92473 16.996 8.05673 17.056 8.16073 17.176C8.26473 17.288 8.31673 17.436 8.31673 17.62C8.31673 17.948 8.40073 18.252 8.56873 18.532C8.73673 18.804 8.96473 19.024 9.25273 19.192C9.54073 19.352 9.86473 19.432 10.2247 19.432C10.7527 19.432 11.1767 19.288 11.4967 19C11.8247 18.704 11.9887 18.292 11.9887 17.764C11.9887 17.428 11.9167 17.128 11.7727 16.864C11.6287 16.592 11.4327 16.376 11.1847 16.216C10.9367 16.056 10.6567 15.976 10.3447 15.976C10.1687 15.976 10.0207 15.916 9.90073 15.796C9.78873 15.676 9.73273 15.528 9.73273 15.352C9.73273 15.176 9.78873 15.032 9.90073 14.92C10.0207 14.8 10.1687 14.74 10.3447 14.74C10.5687 14.74 10.7847 14.684 10.9927 14.572C11.2007 14.452 11.3727 14.296 11.5087 14.104C11.6447 13.904 11.7127 13.68 11.7127 13.432C11.7127 13.08 11.5847 12.784 11.3287 12.544C11.0727 12.304 10.7447 12.184 10.3447 12.184C10.0407 12.184 9.76073 12.244 9.50473 12.364C9.25673 12.484 9.05673 12.644 8.90473 12.844C8.76073 13.044 8.68873 13.268 8.68873 13.516C8.68873 13.7 8.63673 13.856 8.53273 13.984C8.42873 14.104 8.29673 14.164 8.13673 14.164C7.98473 14.164 7.85273 14.108 7.74073 13.996C7.63673 13.876 7.58473 13.728 7.58473 13.552C7.58473 13.088 7.70473 12.672 7.94473 12.304C8.18473 11.936 8.51273 11.648 8.92873 11.44C9.34473 11.224 9.80873 11.116 10.3207 11.116C10.7927 11.116 11.2167 11.22 11.5927 11.428C11.9767 11.628 12.2767 11.904 12.4927 12.256C12.7167 12.6 12.8287 12.992 12.8287 13.432C12.8287 13.744 12.7567 14.02 12.6127 14.26C12.4767 14.5 12.3007 14.708 12.0847 14.884C11.8687 15.052 11.6407 15.192 11.4007 15.304C12.0327 15.52 12.4887 15.848 12.7687 16.288C13.0567 16.72 13.2007 17.216 13.2007 17.776C13.2007 18.296 13.0687 18.764 12.8047 19.18C12.5407 19.588 12.1887 19.912 11.7487 20.152C11.3087 20.384 10.8247 20.5 10.2967 20.5ZM16.6283 20.5C16.4683 20.5 16.3283 20.44 16.2083 20.32C16.0883 20.2 16.0283 20.056 16.0283 19.888V12.568L15.1523 12.94C15.0163 12.996 14.8883 13.024 14.7683 13.024C14.5923 13.024 14.4443 12.968 14.3243 12.856C14.2123 12.744 14.1563 12.6 14.1563 12.424C14.1563 12.296 14.1883 12.18 14.2523 12.076C14.3163 11.972 14.4163 11.896 14.5523 11.848L16.4243 11.176C16.4643 11.16 16.5043 11.148 16.5443 11.14C16.5843 11.132 16.6203 11.128 16.6523 11.128C16.8363 11.128 16.9803 11.188 17.0843 11.308C17.1963 11.42 17.2523 11.568 17.2523 11.752V19.888C17.2523 20.056 17.1923 20.2 17.0723 20.32C16.9523 20.44 16.8043 20.5 16.6283 20.5Z"
							fill="black"
						/>
					</svg>
				</button>
			</template>
		</v-date-picker>

		<button
			:class="[
				'btn content__btn',
				this.task.selected ? 'content__btn--selected' : ''
			]"
			type="button"
			@click="selectedTask"
		>
			<svg
				width="23"
				height="21"
				viewBox="0 0 27 25"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M14.4511 1.69098C14.3172 1.27896 13.9332 1 13.5 1C13.0668 1 12.6828 1.27896 12.5489 1.69098L10.1915 8.9463H2.56285C2.12962 8.9463 1.74567 9.22526 1.61179 9.63729C1.47792 10.0493 1.62458 10.5007 1.97506 10.7553L8.14681 15.2394L5.78941 22.4947C5.65554 22.9067 5.8022 23.3581 6.15268 23.6127C6.50317 23.8674 6.97777 23.8674 7.32825 23.6127L13.5 19.1287L19.6717 23.6127C20.0222 23.8674 20.4968 23.8674 20.8473 23.6127C21.1978 23.3581 21.3445 22.9067 21.2106 22.4947L18.8532 15.2394L25.0249 10.7553C25.3754 10.5007 25.5221 10.0493 25.3882 9.63729C25.2543 9.22526 24.8704 8.9463 24.4371 8.9463H16.8085L14.4511 1.69098Z"
					stroke="#4F4F4F"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</button>
		<button
			class="btn content__btn"
			type="button"
			@click="deleteTask(task, 'button')"
		>
			<svg
				width="18"
				height="20"
				viewBox="0 0 20 22"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M19 1C19.5523 1 20 1.44772 20 2C20 2.55228 19.5523 3 19 3L0.999999 3C0.447715 3 -7.8068e-07 2.55228 -7.57402e-07 2C-7.34125e-07 1.44771 0.447715 0.999999 0.999999 0.999999L19 1Z"
					fill="#4F4F4F"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M18 4H2V20C2 21.1046 2.89543 22 4 22H16C17.1046 22 18 21.1046 18 20V4ZM10 18C10.5523 18 11 17.5523 11 17L11 9C11 8.44771 10.5523 8 10 8C9.44772 8 9 8.44772 9 9L9 17C9 17.5523 9.44772 18 10 18ZM15 17C15 17.5523 14.5523 18 14 18C13.4477 18 13 17.5523 13 17L13 9C13 8.44772 13.4477 8 14 8C14.5523 8 15 8.44771 15 9L15 17ZM6 18C6.55228 18 7 17.5523 7 17L7 9C7 8.44771 6.55229 8 6 8C5.44772 8 5 8.44772 5 9L5 17C5 17.5523 5.44772 18 6 18Z"
					fill="#4F4F4F"
				/>
				<rect
					x="5"
					y="2"
					width="2"
					height="10"
					rx="1"
					transform="rotate(-90 5 2)"
					fill="#4F4F4F"
				/>
			</svg>
		</button>
	</li>
</template>

<script>
import Vue from "vue";
import VCalendar from "v-calendar";
import { mapActions } from "vuex";
import GetItemId from "@/functions/getting_item_id";

Vue.use(VCalendar);

export default {
	name: "section-item",

	directives: {
		focus: {
			inserted: function(el) {
				if (el.value === "") {
					el.focus();
				}
			}
		}
	},

	props: ["task"],

	watch: {
		"task.date"() {
			this.updateTask(this.task);
		}
	},

	computed: {
		// classText() {
		// 	if (this.task.completed) {
		// 		return ["content__title--completed"];
		// 	}
		// },

		// classButton() {
		// 	if (this.task.completed) {
		// 		return ["content__item--completed"];
		// 	} else if (this.task.selected) {
		// 		return ["content__item--selected"];
		// 	}
		// },

		// classStar() {
		// 	if (this.task.selected) {
		// 		return ["content__btn--selected"];
		// 	}
		// },

		tasks() {
			return this.$store.state.pageTasks;
		}
	},

	methods: {
		...mapActions([
			"getTasks",
			"getPageTasks",
			"addTaskToDb",
			"updateTaskToDb"
		]),

		completeTask() {
			this.task.selected = false;
			this.task.completed = !this.task.completed;
			this.updateTask(this.task);
		},

		selectedTask() {
			if (this.task.completed === false) {
				this.task.selected = !this.task.selected;
			}
			this.updateTask(this.task);
		},

		async deleteTask(task, type) {
			if (
				(task.title.trim() === "" && type === "input") ||
				type === "button"
			) {
				await this.$store.dispatch("deleteTaskFromDb", { task });
				this.getTasks();

				let NameForGettingTasks = this.$router.currentRoute.path.slice(
					1
				);
				this.getPageTasks({ NameForGettingTasks });
			}
		},

		async updateTask(task) {
			await this.updateTaskToDb({ task });
		},

		async taskId(task) {
			// console.log(this.tasks)
			// console.log(this.tasks.data.indexOf(task))

			task.id = GetItemId(this.tasks, task);

			// await this.addTaskToDb({ task })
			// this.getTasks()

			// let NameForGettingTasks = task.id.split('_')
			// NameForGettingTasks.shift()
			// NameForGettingTasks.pop()
			// NameForGettingTasks = NameForGettingTasks.join('_')

			// this.getPageTasks({ NameForGettingTasks })
		}
	}
};
</script>
