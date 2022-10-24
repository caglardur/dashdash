<template>
	<v-container fluid>
		<GridTemplateVue />
	</v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import GridTemplateVue from "@/components/GridTemplate.vue"
export default defineComponent({
	name: "DataView",
	data() {
		return {
			default: false
		}
	},
	components: {
		GridTemplateVue
	}
})
</script>

<style></style>
