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
					v-model="tasks.pagename"
				/>
			</div>
		</div>
		<div class="content__list">
			<div class="empty-warning content__warning">
				<span
					v-show="this.$router.currentRoute.path.slice(1) === 'today'"
					class="empty-warning__icon-container"
				>
					<svg
						:class="[
							'empty-warning__icon empty-warning__icon--sun',
							this.$router.currentRoute.path.slice(1) === 'today'
								? 'navigation__icon--sun-page'
								: ''
						]"
						viewBox="0 0 26 26"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<circle
							cx="13"
							cy="13"
							r="4"
							stroke="black"
							stroke-width="2"
						/>
						<rect x="12" width="2" height="6" rx="1" fill="black" />
						<rect
							x="12"
							y="20"
							width="2"
							height="6"
							rx="1"
							fill="black"
						/>
						<rect
							x="6"
							y="12"
							width="2"
							height="6"
							rx="1"
							transform="rotate(90 6 12)"
							fill="black"
						/>
						<rect
							x="26"
							y="12"
							width="2"
							height="6"
							rx="1"
							transform="rotate(90 26 12)"
							fill="black"
						/>
						<rect
							x="21.4854"
							y="3.10051"
							width="2"
							height="6"
							rx="1"
							transform="rotate(45 21.4854 3.10051)"
							fill="black"
						/>
						<rect
							x="7.34326"
							y="17.2426"
							width="2"
							height="6"
							rx="1"
							transform="rotate(45 7.34326 17.2426)"
							fill="black"
						/>
						<rect
							x="8.75732"
							y="7.34315"
							width="2"
							height="6"
							rx="1"
							transform="rotate(135 8.75732 7.34315)"
							fill="black"
						/>
						<rect
							x="22.8994"
							y="21.4853"
							width="2"
							height="6"
							rx="1"
							transform="rotate(135 22.8994 21.4853)"
							fill="black"
						/>
					</svg>
				</span>
				<span
					v-show="
						this.$router.currentRoute.path.slice(1) === 'calendar'
					"
					class="empty-warning__icon-container"
				>
					<svg
						:class="[
							'empty-warning__icon',
							this.$router.currentRoute.path.slice(1) ===
							'calendar'
								? 'navigation__icon--calendar-page'
								: ''
						]"
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
				</span>
				<span
					v-show="
						this.$router.currentRoute.path.slice(1) === 'selected'
					"
					class="empty-warning__icon-container"
				>
					<svg
						:class="[
							'empty-warning__icon empty-warning__icon--star',
							this.$router.currentRoute.path.slice(1) ===
							'selected'
								? 'navigation__icon--star-page'
								: ''
						]"
						viewBox="0 0 22 21"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M11.9511 1.69098C11.8172 1.27896 11.4332 1 11 1C10.5668 1 10.1828 1.27896 10.0489 1.69098L8.25283 7.21885H2.44049C2.00727 7.21885 1.62331 7.49781 1.48944 7.90983C1.35556 8.32185 1.50222 8.77322 1.85271 9.02786L6.55499 12.4443L4.75888 17.9721C4.625 18.3842 4.77166 18.8355 5.12215 19.0902C5.47264 19.3448 5.94723 19.3448 6.29772 19.0902L11 15.6738L15.7023 19.0902C16.0528 19.3448 16.5274 19.3448 16.8779 19.0902C17.2283 18.8355 17.375 18.3842 17.2411 17.9721L15.445 12.4443L20.1473 9.02786C20.4978 8.77322 20.6444 8.32185 20.5106 7.90983C20.3767 7.49781 19.9927 7.21885 19.5595 7.21885H13.7472L11.9511 1.69098Z"
							stroke="black"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</span>
				<span
					v-show="
						this.$router.currentRoute.path.slice(1) === 'complete'
					"
					class="empty-warning__icon-container"
				>
					<svg
						:class="[
							'empty-warning__icon empty-warning__icon--complete',
							this.$router.currentRoute.path.slice(1) ===
							'complete'
								? 'navigation__icon--complete-page'
								: ''
						]"
						viewBox="0 0 20 20"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<rect
							x="1"
							y="1"
							width="18"
							height="18"
							rx="9"
							stroke="black"
							stroke-width="2"
						/>
						<rect
							x="4.5"
							y="10.2426"
							width="2"
							height="6"
							rx="1"
							transform="rotate(-45 4.5 10.2426)"
							fill="black"
						/>
						<rect
							x="14.3994"
							y="6"
							width="2"
							height="10"
							rx="1"
							transform="rotate(45 14.3994 6)"
							fill="black"
						/>
					</svg>
				</span>
				<p class="empty-warning__text">
					Данный раздел <br />
					в стадии разработки
				</p>
			</div>
		</div>
	</section>
</template>

<script>
import { mapActions } from "vuex";

export default {
	name: "section-list",

	beforeUpdate() {
		document.title = `${this.$store.state.pageTasks.pagename} | Task manager`;
	},

	data() {
		return {
			showBack: false
		};
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
			// if (this.$router.currentRoute.path.slice(1) != 'today' &&
			// 	this.$router.currentRoute.path.slice(1) != 'calendar' &&
			// 	this.$router.currentRoute.path.slice(1) != 'selected' &&
			// 	this.$router.currentRoute.path.slice(1) != 'complete') {
			// 		return ['titleContent']
			// }
		},

		// classTodayIcon() {
		// 	if (this.$router.currentRoute.path.slice(1) === "today") {
		// 		return ["navigation__icon--sun-page"];
		// 	}
		// },

		// classCalendarIcon() {
		// 	if (this.$router.currentRoute.path.slice(1) === "calendar") {
		// 		return ["navigation__icon--calendar-page"];
		// 	}
		// },

		// classSelectedIcon() {
		// 	if (this.$router.currentRoute.path.slice(1) === "selected") {
		// 		return ["navigation__icon--star-page"];
		// 	}
		// },

		// classCompleteIcon() {
		// 	if (this.$router.currentRoute.path.slice(1) === "complete") {
		// 		return ["navigation__icon--complete-page"];
		// 	}
		// },

		classIconNavigationButton() {
			if (window.matchMedia("(max-width: 992px)").matches) {
				// return ["navigation__icon-container--button"];
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
		...mapActions(["getTasks", "getPageTasks"]),

		navigationOpen() {
			this.$attrs.navigationShow = !this.$attrs.navigationShow;
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
	&__warning {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		width: 300px;
		height: 300px;
		padding: 40px;

		background-color: var(--white);

		border-radius: 48px;
	}
}

.empty-warning {
	&__icon {
		width: 100%;
		height: 100%;

		&-container {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100px;
			height: 100px;
			margin-bottom: 50px;
		}
	}

	&__text {
		font-size: 20px;
		font-weight: bold;
		text-align: center;
	}
}

@media (max-heigth: 500px) {
	.content {
		&__header {
			margin-bottom: 20px;
		}

		&__list {
			height: calc(100% - 41px - 20px);
		}
	}
}
</style>
