<template>
	<v-app>
		<v-main class="main">
			<top-navigation @changeLeftNavMini="changeLeftNavMini"></top-navigation>
			<left-navigation :leftNavigationMini="leftNavigationMini"> </left-navigation>
			<router-view />
		</v-main>
	</v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import TopNavigation from "./navigations/TopNavigation.vue"
import LeftNavigation from "./navigations/LeftNavigation.vue"
// import { IntlProvider, load } from "@progress/kendo-vue-intl"

// import "@progress/kendo-theme-material/dist/all.css"

export default defineComponent({
	name: "App",
	data() {
		return {
			leftNavigationMini: true,
			locale: "tr-TR"
		}
	},
	methods: {
		changeLeftNavMini() {
			this.leftNavigationMini = !this.leftNavigationMini
		}
	},
	components: { TopNavigation, LeftNavigation }
})
</script>
<style lang="scss">
body {
	font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
	font-size: 1rem !important;
	// background-color: rgb(30, 30, 30);
}
// .main {
// 	background-color: rgb(30, 30, 30);
// 	color: rgb(212, 212, 212);
// }
// $theme-type: dark;
// $base-bg: rgb(30, 30, 30);
// $base-text: rgb(212, 212, 212);
@import "@progress/kendo-theme-default/dist/all.scss";
</style>
