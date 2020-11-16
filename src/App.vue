<template>
	<div id="app">
		<AsideList
			@navigationAction="navigationAction"
			:navigationShow="this.navigationShow"
			:key="'aside-' + $route.fullPath.slice(1)"
		/>
		<router-view
			@navigationAction="navigationAction"
			:key="$route.fullPath.slice(1)"
		/>
	</div>
</template>

<script>
import AsideList from "@/components/aside-list";

export default {
	name: "app",
	components: {
		AsideList
	},

	data() {
		return {
			navigationShow: false
		};
	},

	methods: {
		navigationAction() {
			this.navigationShow = !this.navigationShow;
		}
	}
};
</script>

<style lang="scss">
@import "@/assets/style/color.scss";
@import "@/assets/style/fonts.scss";

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
		transition: fill 0.2s;
	}
}

.btn {
	cursor: pointer;

	&--hide {
		cursor: default;
	}

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

		transition: 0.2s;

		&--special {
			display: none;
		}

		&__text {
			padding: 13px 20px 14px;
			color: var(--deep-orange);
			transition: color 0.2s;
		}

		&--category {
			width: calc(100% - 30px * 2);
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
			opacity: 0.5;
		}
	}
}
</style>
