<template>
	<section class="content">
		<div class="content__header">
			<div class="pagename">
				<input :class="`pagename__title pagename__title--${tasks.color}`" type="text" placeholder="Введите здесь название категории" required v-model="tasks.pagename" @blur="$emit('blur', tasks)">
				<div class="pagename__color-container">
					<button class="btn pagename__color pagename__color--pink" type="button" @click="$emit('categoryColor', 'pink', tasks.pagename)"></button>
					<button class="btn pagename__color pagename__color--red" type="button" @click="$emit('categoryColor', 'red', tasks.pagename)"></button>
					<button class="btn pagename__color pagename__color--green" type="button" @click="$emit('categoryColor', 'green', tasks.pagename)"></button>
					<button class="btn pagename__color pagename__color--purple" type="button" @click="$emit('categoryColor', 'purple', tasks.pagename)"></button>
					<button class="btn pagename__color pagename__color--blue" type="button" @click="$emit('categoryColor', 'blue', tasks.pagename)"></button>
					<button class="btn pagename__color pagename__color--cyan" type="button" @click="$emit('categoryColor', 'cyan', tasks.pagename)"></button>
				</div>
			</div>
			<button class="btn content__btn content__remove" type="button" @click="$emit('removeCategory', tasks.category)">
				<svg width="18" height="20" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M19 1C19.5523 1 20 1.44772 20 2C20 2.55228 19.5523 3 19 3L0.999999 3C0.447715 3 -7.8068e-07 2.55228 -7.57402e-07 2C-7.34125e-07 1.44771 0.447715 0.999999 0.999999 0.999999L19 1Z" fill="#4F4F4F"/>
					<path fill-rule="evenodd" clip-rule="evenodd" d="M18 4H2V20C2 21.1046 2.89543 22 4 22H16C17.1046 22 18 21.1046 18 20V4ZM10 18C10.5523 18 11 17.5523 11 17L11 9C11 8.44771 10.5523 8 10 8C9.44772 8 9 8.44772 9 9L9 17C9 17.5523 9.44772 18 10 18ZM15 17C15 17.5523 14.5523 18 14 18C13.4477 18 13 17.5523 13 17L13 9C13 8.44772 13.4477 8 14 8C14.5523 8 15 8.44771 15 9L15 17ZM6 18C6.55228 18 7 17.5523 7 17L7 9C7 8.44771 6.55229 8 6 8C5.44772 8 5 8.44772 5 9L5 17C5 17.5523 5.44772 18 6 18Z" fill="#4F4F4F"/>
					<rect x="5" y="2" width="2" height="10" rx="1" transform="rotate(-90 5 2)" fill="#4F4F4F"/>
				</svg>
			</button>
		</div>
		<ul v-if="this.tasks.category === 'complete' || this.tasks.category === 'selected'" class="content__list">
			<section-item v-for="(task, index) in tasks.data" :key="index" :task="task" @completeTask="$emit('completeTask', index, task, tasks.category)" @selectedTask="$emit('selectedTask', index, task, tasks.category)" @removeTask="$emit('removeTask', index, task.category)"></section-item>
		</ul>
		<ul v-else-if="this.tasks.category != 'complete' || this.tasks.category != 'selected'" class="content__list">
			<section-item v-for="(task, index) in tasks.data" :key="index" :task="task" @completeTask="$emit('completeTask', index, task, tasks.category)" @selectedTask="$emit('selectedTask', index, task, tasks.category)" @removeTask="$emit('removeTask', index, tasks.category)" @blurRemove="$emit('blurRemove', index, tasks.category, task)"></section-item>
		</ul>
		<button class="btn btn-add" type="button" @click="$emit('addTask', tasks.category)">
			<svg class="plus" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
				<rect x="8" width="4" height="20" rx="2"/>
				<rect x="20" y="8" width="4" height="20" rx="2" transform="rotate(90 20 8)"/>
			</svg>
			<p class="btn-add__text">Новая задача</p>
		</button>

		
	</section>
</template>

<script>
import SectionItem from './section-item'

export default {
	name: 'section-list',
	components: {
		SectionItem
	},
	data() {
		return {
			tasks: []
		}
	},
	props: ['category', 'allTasks', 'tasksCompleted', 'tasksSelected'],
	created() {
		switch(this.category) {
			case 'today':
				this.tasks.pagename = 'Задачи на сегодня'
				for(let i = 0; i < this.allTasks.length; i++) {

				}
				break
			case 'date':
				this.tasks.pagename = 'Календарь задач'
				for(let i = 0; i < this.allTasks.length; i++) {
					
				}
				break
			case 'selected':
				this.tasks = this.tasksSelected
				// this.tasks.pagename = 'Избранное'
				// this.tasks.data = this.allTasks[0].data
				break
			case 'complete':
				this.tasks = this.tasksCompleted
				// this.tasks.pagename = 'Выполненное'	
				break
			default:
				for(let i = 0; i < this.allTasks.length; i++) {
					if(this.category === this.allTasks[i].category) {	
						this.tasks = this.allTasks[i]
						break
					}
				}
				break
		}		
	}
}
</script>

<style lang="scss">
	.content {
		position: relative;
		width: calc(100% - 360px);
		padding: 30px;

		&__header {
			display: flex;
			align-items: center;
			width: 100%;
			height: 41px;

			margin-bottom: 30px;

			overflow: initial;
		}

		&__list {
			width: 100%;
			height: calc(100% - 41px - 50px - 30px - 20px);

			margin-bottom: 20px;

			overflow-y: auto;
		}

		&__item {
			display: flex;
			width: 100%;
			height: 54px;
			border: 1px solid #EEEEEE;
			border-radius: 16px;

			&--selected {
				background-color: rgba(254, 203, 46, .35);
			}

			&--completed {
				background-color: rgba(83, 215, 105, .35);
			}

			&:not(:last-child) {
				margin-bottom: 20px;
			}
		}

		&__title {
			width: calc(100% - 54px * 4);
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
			opacity: .15;

			transition: opacity .1s;

			&:hover,
			&:focus-within {
				opacity: 1;
			}

			&:active {
				opacity: .5;
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

			&--pink {
				color: var(--pink);
			}

			&--red {
				color: var(--red);
			}

			&--yellow {
				color: var(--yellow);
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

			&:focus {
				& + .pagename__color-container {
					display: flex;
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

			&--yellow {
				background-color: var(--yellow);
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
				opacity: .5;
			}

			&:active {
				opacity: .35;
			}
		}
	}
</style>