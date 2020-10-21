<template>
	<div id="app">
		<aside-list :tasks="allTasks" @addCategory="addCategory"/>
		<router-view :allTasks="allTasks" :tasksCompleted="tasksCompleted" :tasksSelected="tasksSelected" :key="$route.fullPath" @addTask="addTask" @completeTask="completeTask" @selectedTask="selectedTask" @removeTask="removeTask" @blurRemove="blurRemove" @removeCategory="removeCategory" @categoryColor="categoryColor" @blur="blur"/>
	</div>
</template>

<script>
	import AsideList from './components/aside-list'
	import SectionList from './components/section-list'
	import ToLatin from './function/rus_to_latin'
	import Router from './router'

	export default {
		name: 'App',
		components: {
			AsideList
		},

		data() {
			return {
				allTasks: [
					{	
						pagename: 'Home',
						category: '',
						color: 'purple',
						data: [
							{
								title: 'Первая домашняя задача',
								date: null,
								completed: false,
								selected: false,
								focused: false
							},
							{
								title: 'Вторая домашняя задача',
								date: null,
								completed: false,
								selected: false,
								focused: false
							},
							{
								title: 'Третья домашняя задача',
								date: null,
								completed: false,
								selected: false,
								focused: false
							}
						]
					},
					{	
						pagename: 'Рабочие задачи',
						category: '',
						color: 'red',
						data: [
							{
								title: 'Первая задача',
								date: null,
								completed: false,
								selected: false,
								focused: false
							},
							{
								title: 'Вторая задача',
								date: null,
								completed: false,
								selected: false,
								focused: false
							},
							{
								title: 'Третья задача',
								date: null,
								completed: false,
								selected: false,
								focused: false
							}
						]
					}
				],
				tasksCompleted: {
					pagename: 'Выполненные задачи',
					category: 'complete',
					color: '',
					data: []
				},
				tasksSelected: {
					pagename: 'Избранные задачи',
					category: 'selected',
					color: '',
					data: []
				}
			}
		},

		methods: {
			addTask(category) {
				for (let i = 0; i < this.allTasks.length; i++) {
					if (category === this.allTasks[i].category) {
						this.allTasks[i].data.push(
							{
								title: '',
								date: null,
								completed: false,
								selected: false,
								focused: true
							}
						);
						break;
					}
				}
			},

			completeTask(index, task, category) {
				task.completed = !task.completed;

				if (task.selected === true) {
					task.selected = !task.selected
					// this.tasksSelected.data.splice(index, 1)
				}

				// if (task.completed === true) {
				// 	this.tasksCompleted.data.push(task)
				// 	// this.tasksCompleted.data[index].category = category
				// } else {
				// 	this.tasksCompleted.data.splice(index, 1)
				// }
			},

			selectedTask(index, task) {
				if (task.completed === false) {
					task.selected = !task.selected
				}

				// if (task.selected === true) {
				// 	// this.tasksSelected.data.category
				// 	// this.tasksSelected.data.data.push(task)
				// 	this.tasksSelected.data.push(task)
				// 	// this.tasksSelected.data[index].category = category
				// } else {
				// 	this.tasksSelected.data.splice(index, 1)
				// }
			},

			blurRemove(index, category, task) {
				if (task.title.trim().length === 0) {
					this.removeTask(index, category);
				}
			},

			removeTask(index, category) {
				for(let i = 0; i < this._data.allTasks.length; i++) {
					if (this._data.allTasks[i].category === category) {
						this.allTasks[i].data.splice(index, 1);
						break
					}
				}
			},

			addCategory() {
				this.allTasks.push({
					pagename: 'Новая категория',
					category: '',
					color: 'purple',
					data: []
				})
			},

			removeCategory(category) {
				for(let i = 0; i < this._data.allTasks.length; i++) {
					if (this._data.allTasks[i].category === category) {
						this.allTasks.splice(i, 1);
						break
					}
				}
			},

			categoryColor(color, pagename) {
				for(let i = 0; i < this._data.allTasks.length; i++) {
					if(this._data.allTasks[i].pagename === pagename) {
						this.allTasks[i].color = color
						break
					}
				}
			},

			blur(tasks) {
				// if (tasks.pagename === '') {
					// удалить категорию
				// } else {
					for(let i = 0; i < this._data.allTasks.length; i++) {
						if(tasks.category === this._data.allTasks[i].category) {
							this.addPath(i)
							Router.push({ path: '/' +  this._data.allTasks[i].category})
							break
						}
					}
				// }
			},

			transitionWhenCreate() {
				let i = this._data.allTasks.length - 1

				this.addPath(i)
				Router.push({ path: '/' +  this._data.allTasks[i].category})
			},

			addPath(i) {
				let category = ToLatin(this._data.allTasks[i].pagename.trim())
				this._data.allTasks[i].category = category
				Router.addRoutes([{ path: '/' + category, component: SectionList, props: {category: category}}])
			}
		},

		mounted() {
			for(let i = 0; i < this._data.allTasks.length; i++) {
				if (this._data.allTasks[i].category.trim() === '') {
					this.addPath(i)
				} else {
					break;
				}
			}
		},

		watch: {
			allTasks() {	
				this.transitionWhenCreate()
			}
		}
	}
</script>

<style lang="scss">
	
	@import '@/assets/style/color.scss';
	@import '@/assets/style/fonts.scss';

	*,
	*::before,
	*::after {
		margin: 0;
		padding: 0;
		box-sizing: border-box;

		font-family: Raleway;
		font-style: normal;
		font-weight: 500;
		font-size: 18px;
		line-height: 23px;

		overflow: hidden;
		outline: none;

		color: var(--black);
	}

	body {
		width: 100vw;
		height: 100vh;
	}

	a {
		text-decoration: none;
	}

	li {
		list-style-type: none;
	}

	.visually-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		margin: -1px;
		border: 0;
		padding: 0;
		clip: rect(0 0 0 0);
		overflow: hidden;
	}

	#app {
		display: flex;
		width: 100%;
		height: 100%;
	}

	.plus {
		width: 20px;
		height: 20px;
		margin: 13px 0 13px 13px;
		fill: none;

		& rect {
			fill: var(--deep-orange);
			transition: fill .2s;
		}
	}

	.btn {
		cursor: pointer;

		&-add {
			position: absolute;
			left: 30px;
			bottom: 10px;

			display: flex;
			align-items: center;

			width: auto;
			height: auto;

			background-color: transparent;

			border: none;
			border-radius: 16px;

			transition: .2s;

			&__text {
				padding: 13px 20px 14px;
				color: var(--deep-orange);
				transition: color .2s;
			}

			&--category {
				width: calc(100% - 30px *2 );
			}

			&:hover,
			&:focus-within {
				background-color: var(--deep-orange);

				& .btn-add__text {
					color: var(--white);
				}

				& .plus rect {
					fill: var(--white);
				}
			}

			&:active {
				opacity: .5;
			}
		}
	}
</style>
