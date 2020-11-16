<template>
	<section class="content">
		<div class="content__header">
			<button
				:class="[
					'navigation__icon-container navigation__icon-container--button',
					classIconNavigationButton
				]"
				v-show="this.showBack"
				@click="$emit('navigationAction')"
			>
				<svg
					width="29"
					height="29"
					viewBox="0 0 29 29"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<rect
						:class="[`icon--${tasks.color}`]"
						x="14.1421"
						width="4"
						height="20"
						rx="2"
						transform="rotate(45 14.1421 0)"
						fill="black"
					/>
					<rect
						:class="[`icon--${tasks.color}`]"
						x="16.9705"
						y="25.4558"
						width="4"
						height="20"
						rx="2"
						transform="rotate(135 16.9705 25.4558)"
						fill="black"
					/>
				</svg>
			</button>
			<div class="pagename">
				<input
					:class="[
						`pagename__title pagename__title--${tasks.color}`,
						classPage
					]"
					type="text"
					placeholder="Введите здесь название категории"
					required
					v-model="tasks.pagename"
					@blur="updateCategory(tasks)"
				/>
				<div class="pagename__color-container">
					<button
						class="btn pagename__color pagename__color--pink"
						type="button"
						@click="changingCategoryColor('pink', tasks)"
					></button>
					<button
						class="btn pagename__color pagename__color--red"
						type="button"
						@click="changingCategoryColor('red', tasks)"
					></button>
					<button
						class="btn pagename__color pagename__color--green"
						type="button"
						@click="changingCategoryColor('green', tasks)"
					></button>
					<button
						class="btn pagename__color pagename__color--purple"
						type="button"
						@click="changingCategoryColor('purple', tasks)"
					></button>
					<button
						class="btn pagename__color pagename__color--blue"
						type="button"
						@click="changingCategoryColor('blue', tasks)"
					></button>
					<button
						class="btn pagename__color pagename__color--cyan"
						type="button"
						@click="changingCategoryColor('cyan', tasks)"
					></button>
				</div>
			</div>
			<button
				:class="['btn content__btn content__remove', classButtonDelete]"
				type="button"
				@click="deleteCategory(tasks)"
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
		</div>
		<ul class="content__list">
			<SectionItem
				v-for="(task, index) in tasks.data"
				:key="index"
				:task="task"
			></SectionItem>
			<li class="content__item" v-show="taskShow">
				<div class="btn content__btn btn--hide"></div>
				<input
					class="content__title"
					type="text"
					v-model="taskTitle"
					v-focus
					@blur="
						addTask();
						addTaskHide();
					"
					@keyup.enter="addTask()"
				/>
				<button
					class="btn content__btn"
					type="button"
					@click="addTaskHide()"
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
		</ul>

		<button
			:class="['btn btn-add', classButtonAddTask]"
			type="button"
			@click="addTaskShow"
		>
			<svg
				class="plus"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
			>
				<rect x="8" width="4" height="20" rx="2" />
				<rect
					x="20"
					y="8"
					width="4"
					height="20"
					rx="2"
					transform="rotate(90 20 8)"
				/>
			</svg>
			<p class="btn-add__text">Новая задача</p>
		</button>
	</section>
</template>

<script>
import { mapActions } from "vuex";
import SectionItem from "./section-item";
import GetItemId from "@/functions/getting_item_id";

export default {
	name: "section-list",
	components: {
		SectionItem
	},

	data() {
		return {
			taskShow: false,
			taskTitle: "",
			showBack: false
		};
	},

	beforeUpdate() {
		document.title = `${this.$store.state.pageTasks.pagename} | Task manager`;
	},

	directives: {
		focus: {
			update: function(el) {
				if (el.value === "") {
					el.focus();
				}
			}
		}
	},

	computed: {
		allTasks() {
			return this.$store.state.tasks;
		},

		tasks() {
			return this.$store.state.pageTasks;
		},

		classPage() {
			switch (this.$router.currentRoute.path.slice(1)) {
				case "today": {
					return ["pagename__title--today"];
				}
				case "calendar": {
					return ["pagename__title--calendar"];
				}
				case "selected": {
					return ["pagename__title--selected"];
				}
				case "complete": {
					return ["pagename__title--complete"];
				}
				default: {
					return ["titleContent"];
				}
			}
		},

		classButtonDelete() {
			return {
				buttonRemoveContent:
					this.$router.currentRoute.path.slice(1) != "today" &&
					this.$router.currentRoute.path.slice(1) != "calendar" &&
					this.$router.currentRoute.path.slice(1) != "selected" &&
					this.$router.currentRoute.path.slice(1) != "complete"
			};
		},

		classButtonAddTask() {
			return {
				"btn-add--special":
					this.$router.currentRoute.path.slice(1) === "today" ||
					this.$router.currentRoute.path.slice(1) === "calendar" ||
					this.$router.currentRoute.path.slice(1) === "selected" ||
					this.$router.currentRoute.path.slice(1) === "complete"
			};
		},

		classIconNavigationButton() {
			if (window.matchMedia("(max-width: 992px)").matches) {
				return "navigation__icon-container--button";
			} else {
				return "";
			}
		}
	},

	mounted() {
		window.addEventListener("orientationchange", () => {
			this.handleOrientationChange();
		});
	},

	created() {
		this.getTasks();

		let NameForGettingTasks = this.$router.currentRoute.path.slice(1);
		this.getPageTasks({ NameForGettingTasks });

		if (window.matchMedia("(max-width: 992px)").matches) {
			this.showBack = true;
		} else {
			this.showBack = false;
		}
	},

	methods: {
		...mapActions([
			"getTasks",
			"getPageTasks",
			"addTaskToDb",
			"addCategoryToDb",
			"updateCategoryToDb"
		]),

		async addTask() {
			if (this.taskTitle.trim() != "") {
				const task = {
					title: this.taskTitle,
					id: "",
					date: null,
					completed: false,
					selected: false
				};

				task.id = GetItemId(this.tasks, task);

				await this.addTaskToDb({ task });
				this.getTasks();

				let NameForGettingTasks = task.id.split("_");
				NameForGettingTasks.shift();
				NameForGettingTasks.pop();
				NameForGettingTasks = NameForGettingTasks.join("_");

				this.getPageTasks({ NameForGettingTasks });

				this.taskTitle = "";
			}
		},

		async deleteCategory(category) {
			await this.$store.dispatch("deleteCategoriesFromDb", { category });
			this.$router.push({ path: "today" });
			this.getTasks();
			let NameForGettingTasks = "today";
			this.getPageTasks({ NameForGettingTasks });
		},

		async updateCategory(category) {
			let allTasks = this.allTasks;
			let pagenameCategory = await this.updateCategoryToDb({
				category,
				allTasks
			});

			this.getTasks();

			if (this.$router.currentRoute.path != "/" + pagenameCategory) {
				this.$router.push({
					name: "pagenameCategory",
					params: {
						pagenameCategory: pagenameCategory,
						category: pagenameCategory
					}
				});
			}

			let NameForGettingTasks = pagenameCategory;
			this.getPageTasks({ NameForGettingTasks });
		},

		async changingCategoryColor(color, category) {
			category.color = color;

			this.updateCategory(category);
		},

		addTaskShow() {
			this.taskShow = true;
		},

		addTaskHide() {
			this.taskTitle = "";

			this.taskShow = false;
		},

		handleOrientationChange() {
			if (window.matchMedia("(max-height: 992px)").matches) {
				this.showBack = true;
			} else {
				this.showBack = false;
			}
		}
	}
};
</script>

<style lang="scss">
.content {
	position: relative;
	width: calc(100% - 360px);
	padding: 30px;

	&__warning {
		position: absolute;
		top: 50%;
		left: 50%;

		transform: translate(-50%, -50%);
	}

	&__header {
		display: flex;
		align-items: center;
		width: 100%;
		height: 41px;

		margin-bottom: 30px;

		overflow: initial;
	}

	&__list {
		position: relative;
		width: 100%;
		height: calc(100% - 41px - 50px - 30px - 20px);

		margin-bottom: 20px;

		overflow-y: auto;

		& * {
			overflow: visible;
		}
	}

	&__item {
		display: flex;
		width: 100%;
		height: 54px;
		border: 1px solid #eeeeee;
		border-radius: 16px;

		&--selected {
			background-color: rgba(254, 203, 46, 0.35);
		}

		&--completed {
			background-color: rgba(83, 215, 105, 0.35);
		}

		&:not(:last-child) {
			margin-bottom: 20px;
		}
	}

	&__title {
		flex: 1;
		padding: 15px 6px 16px;
		height: 100%;
		border: none;

		background-color: transparent;

		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;

		&--completed {
			text-decoration-line: line-through;
		}
	}

	&__btn {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 54px;
		height: 100%;
		border: none;
		background-color: transparent;
		opacity: 0.15;

		transition: opacity 0.1s;

		&:hover,
		&:focus-within {
			opacity: 1;
		}

		&:active {
			opacity: 0.5;
		}

		&--selected {
			opacity: 1;

			& svg {
				fill: rgba(254, 203, 46, 1);
			}

			& path {
				stroke: rgba(254, 203, 46, 1);
			}
		}
	}

	&__remove {
		display: none;
		width: 41px;
		border-radius: 16px;

		&:hover,
		&:focus-within {
			background-color: var(--gallery);
		}
	}
}

.pagename {
	position: relative;
	width: calc(100% - 41px);

	overflow: initial;

	&__title {
		width: 100%;

		font-size: 35px;
		font-weight: 600;
		line-height: 41px;

		border: none;

		pointer-events: none;

		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;

		&--pink {
			color: var(--pink);
		}

		&--red {
			color: var(--red);
		}

		&--green {
			color: var(--green);
		}

		&--purple {
			color: var(--purple);
		}

		&--blue {
			color: var(--blue);
		}

		&--cyan {
			color: var(--cyan);
		}

		&--yellow {
			color: var(--yellow);
		}

		&.titleContent {
			pointer-events: auto;

			&:focus {
				& + .pagename__color-container {
					display: flex;
				}
			}
		}
	}

	&__color {
		width: 25px;
		height: 25px;
		margin: 0 15px;

		border: none;
		border-radius: 50%;

		background-color: var(--purple);

		&-container {
			position: absolute;
			top: 10px;

			display: none;
			flex-wrap: wrap;

			background-color: var(--ivory);

			border: 2px solid var(--gallery);
			border-radius: 16px;

			transform: translate(0, 100%);

			z-index: 999;

			& .pagename__color {
				margin: 7px;
			}

			&:hover,
			&:focus-within {
				display: flex;
			}
		}

		&--pink {
			background-color: var(--pink);
		}

		&--red {
			background-color: var(--red);
		}

		&--green {
			background-color: var(--green);
		}

		&--purple {
			background-color: var(--purple);
		}

		&--blue {
			background-color: var(--blue);
		}

		&--cyan {
			background-color: var(--cyan);
		}

		&:hover,
		&:focus-within {
			opacity: 0.5;
		}

		&:active {
			opacity: 0.35;
		}
	}
}

.buttonRemoveContent {
	display: flex;
}

@media (max-width: 500px) {
	.content {
		&__item {
			position: relative;
			height: 100px;

			align-items: flex-end;

			& .content__btn,
			& span {
				flex: 1;
				height: 50%;
			}

			& span .content__btn {
				flex: auto;
				width: 100%;
				height: 100%;
			}
		}

		&__title {
			position: absolute;
			top: 0;
			width: 100%;
			height: 50%;

			padding: 15px 9.5% 10px;
		}
	}
}

@media (max-width: 992px) {
	.content {
		width: 100%;
	}

	.pagename {
		&__title {
			font-size: 28px;
		}
	}

	.icon {
		&--pink {
			fill: var(--pink);
		}

		&--red {
			fill: var(--red);
		}

		&--green {
			fill: var(--green);
		}

		&--purple {
			fill: var(--purple);
		}

		&--blue {
			fill: var(--blue);
		}

		&--cyan {
			fill: var(--cyan);
		}
	}
}

@media (max-width: 1400px) {
}
</style>
