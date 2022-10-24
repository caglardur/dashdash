<template>
	<v-container fluid class="example-config">
		<v-col> Calendar View</v-col>
		<v-col class="example-config">
			<v-row>
				<v-col>
					<Scheduler :model-fields="customModelFields" :view="view" :views="views" :editable="true" :resources="resources"></Scheduler>
				</v-col>
			</v-row>
		</v-col>
	</v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue"

import { Scheduler } from "@progress/kendo-vue-scheduler"
import { timezoneNames } from "@progress/kendo-date-math"
import { customModelFields } from "./events-utc"

export default defineComponent({
	name: "CalendarView",
	data() {
		return {
			timezone: "Etc/UTC",
			timezones: timezoneNames(),
			customModelFields: customModelFields,
			view: "day",
			views: [
				{ name: "timeline", title: "Timeline" },
				{ name: "day", title: "Day View" },
				{ name: "workweek", title: "Work Week View" },
				{ name: "month", title: "Month View" },
				{ name: "agenda", title: "Agenda View" }
			],
			resources: [
				{
					name: "Rooms",
					data: [
						{ text: "Meeting Room 101", value: 1 },
						{ text: "Meeting Room 201", value: 2, color: "#5392E4" }
					],
					field: "RoomID",
					valueField: "value",
					textField: "text",
					colorField: "color"
				},
				{
					name: "Persons",
					data: [
						{ text: "Peter", value: 1, color: "#5392E4" },
						{ text: "Alex", value: 2, color: "#54677B" }
					],
					field: "PersonIDs",
					valueField: "value",
					textField: "text",
					colorField: "color"
				}
			],
			group: {
				resources: ["Rooms"],
				orientation: "horizontal"
			}
		}
	},
	components: {
		Scheduler
	}
})
</script>

<style scoped>
.example-config {
	margin: 0 0 20px;
	padding: 20px;
	background-color: rgba(0, 0, 0, 0.03);
	border: 1px solid rgba(0, 0, 0, 0.08);
}
</style>
