<template>
	<v-container>
		<v-col>Dashboard view</v-col>
		<v-card width="300" elevation="0" color="blue-grey-lighter-4" style="border: 1px solid gainsboro">
			<BarChart />
		</v-card>
	</v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import BarChart from "@/components/BarChart.vue"

export default defineComponent({
	name: "DashboardView",
	data() {
		return {
			default: false
		}
	},
	components: { BarChart }
})
</script>

<style></style>
