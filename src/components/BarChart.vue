<template>
	<Chart
		:style="{
			width: '300px',
			height: '100%'
		}"
	>
		<ChartTitle :text="'Günlük satışlar'" />
		<ChartCategoryAxis>
			<ChartCategoryAxisItem :categories="categories">
				<ChartCategoryAxisTitle :text="'Haftanın günleri'" />
			</ChartCategoryAxisItem>
		</ChartCategoryAxis>
		<ChartSeries>
			<ChartSeriesItem :type="'bar'" :gap="1" :spacing="0.25" :data-items="firstSeries" />
			<ChartSeriesItem :type="'bar'" :gap="1" :data-items="secondSeries" />
		</ChartSeries>
	</Chart>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { Chart, ChartSeries, ChartSeriesItem, ChartTitle, ChartCategoryAxis, ChartCategoryAxisItem, ChartCategoryAxisTitle } from "@progress/kendo-vue-charts"

export default defineComponent({
	name: "BarChart",
	components: {
		Chart,
		ChartSeries,
		ChartSeriesItem,
		ChartTitle,
		ChartCategoryAxis,
		ChartCategoryAxisItem,
		ChartCategoryAxisTitle
	},
	data() {
		return {
			firstSeries: [1, 2, 3, 5, 4],
			secondSeries: [2, 3, 4, 6, 1],
			categories: ["Pts", "Sal", "Çar", "Per", "Cum"]
		}
	}
})
</script>
<style scoped>
.k-chart {
	height: auto;
	background-color: black;
}
</style>
