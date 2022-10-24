<template>
	<v-container fluid>
		<v-col>Dashboard view</v-col>
		<v-col>
			<v-row>
				<v-col>
					<v-card height="200" elevation="0" color="blue-grey-darken-4" style="border: 1px solid #425863">
						<v-col>
							<v-row>
								<v-col>
									<Button>Deneme</Button>
								</v-col>
								<v-col>
									<AutoComplete :style="{ width: '230px' }" :data-items="countries" :placeholder="'e.g. Denmark'"></AutoComplete>
								</v-col>
							</v-row>
						</v-col>
					</v-card>
				</v-col>
				<v-col>
					<v-card height="200" elevation="0" color="blue-grey-darken-4" style="border: 1px solid #425863">
						<bar-chart></bar-chart>
					</v-card>
				</v-col>
				<v-col>
					<v-card height="200" elevation="0" color="blue-grey-darken-4" style="border: 1px solid #425863"> </v-card>
				</v-col>
			</v-row>
		</v-col>
		<v-col>
			<v-row>
				<v-col cols="8">
					<v-card height="600" elevation="0" color="blue-grey-darken-4" style="border: 1px solid #425863"> </v-card>
				</v-col>
				<v-col cols="4" class="pa-0">
					<v-col>
						<v-card height="200" elevation="0" color="blue-grey-darken-4" style="border: 1px solid #425863"> </v-card>
					</v-col>
					<v-col>
						<v-card height="200" elevation="0" color="blue-grey-darken-4" style="border: 1px solid #425863"> </v-card>
					</v-col>
					<v-col>
						<v-card height="200" elevation="0" color="blue-grey-darken-4" style="border: 1px solid #425863"> </v-card>
					</v-col>
				</v-col>
			</v-row>
		</v-col>
	</v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import BarChart from "@/components/BarChart.vue"
import { Button } from "@progress/kendo-vue-buttons"
import { AutoComplete } from "@progress/kendo-vue-dropdowns"

export default defineComponent({
	name: "DashboardView",
	data() {
		return {
			default: false,
			countries: [
				"Albania",
				"Andorra",
				"Armenia",
				"Austria",
				"Azerbaijan",
				"Belarus",
				"Belgium",
				"Bosnia & Herzegovina",
				"Bulgaria",
				"Croatia",
				"Cyprus",
				"Czech Republic",
				"Denmark",
				"Estonia",
				"Finland",
				"France",
				"Georgia",
				"Germany",
				"Greece",
				"Hungary",
				"Iceland",
				"Ireland",
				"Italy",
				"Kosovo",
				"Latvia",
				"Liechtenstein",
				"Lithuania",
				"Luxembourg",
				"Macedonia",
				"Malta",
				"Moldova",
				"Monaco",
				"Montenegro",
				"Netherlands",
				"Norway",
				"Poland",
				"Portugal",
				"Romania",
				"Russia",
				"San Marino",
				"Serbia",
				"Slovakia",
				"Slovenia",
				"Spain",
				"Sweden",
				"Switzerland",
				"Turkey",
				"Ukraine",
				"United Kingdom",
				"Vatican City"
			]
		}
	},
	components: { BarChart, Button, AutoComplete }
})
</script>

<style></style>
