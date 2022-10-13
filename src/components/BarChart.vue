<template>
	<Bar :chart-data="chartData" />
</template>

<script lang="ts">
import { Bar } from "vue-chartjs"
import { defineComponent } from "vue"
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js"

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default defineComponent({
	name: "BarChart",
	components: { Bar },
	data() {
		return {
			chartData: {
				labels: ["Ocak", "Şubat", "Mart"],
				datasets: [
					{
						label: "Data",
						backgroundColor: "#f87979",
						data: [40, 20, 12]
					}
				]
			}
		}
	}
})
</script>
