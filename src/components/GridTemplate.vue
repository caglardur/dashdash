<template>
	<v-container fluid>
		<Grid :data-items="gridData" :take="take" :skip="skip" :sortable="true" :sort="sort" :filter="filter" @datastatechange="dataStateChange" :pageable="true" :column-menu="columnMenu" :columns="columns"> </Grid>
	</v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { Grid, GridColumnProps } from "@progress/kendo-vue-grid"
import { orderBy, SortDescriptor } from "@progress/kendo-data-query"
import { process } from "@progress/kendo-data-query"

interface GridDataItem {
	ProductID: number
	ProductName: string
	UnitsInStock: number
	Discontinued: boolean
	FirstOrderedOn: Date
}

export default defineComponent({
	name: "GridTemplate",
	components: {
		Grid: Grid
	},
	data: function () {
		return {
			columnMenu: true,
			take: 10,
			skip: 0,
			sort: [],
			filter: null,
			columns:
				[
					{ field: "ProductID", title: "ID", filter: "numeric" },
					{ field: "ProductName", title: "Name" },
					{ field: "UnitPrice", filter: "numeric" },
					{ field: "Discontinued", filter: "boolean" }
				] || Array<GridColumnProps>(),
			products:
				[
					{
						ProductID: 1,
						ProductName: "Chai",
						UnitsInStock: 39,
						Discontinued: false,
						FirstOrderedOn: new Date(1996, 8, 20)
					},
					{
						ProductID: 2,
						ProductName: "Chang",
						UnitsInStock: 17,
						Discontinued: false,
						FirstOrderedOn: new Date(1996, 7, 12)
					},
					{
						ProductID: 3,
						ProductName: "Aniseed Syrup",
						UnitsInStock: 13,
						Discontinued: false,
						FirstOrderedOn: new Date(1996, 8, 26)
					},
					{
						ProductID: 4,
						ProductName: "Chef Anton's Cajun Seasoning",
						UnitsInStock: 53,
						Discontinued: false,
						FirstOrderedOn: new Date(1996, 8, 19)
					},
					{
						ProductID: 5,
						ProductName: " Seasoning",
						UnitsInStock: 63,
						Discontinued: false,
						FirstOrderedOn: new Date(1996, 11, 19)
					},
					{
						ProductID: 6,
						ProductName: "Cajun Seasoning",
						UnitsInStock: 24,
						Discontinued: false,
						FirstOrderedOn: new Date(1996, 3, 19)
					}
				] || Array<GridDataItem>(),
			gridData: Array<GridDataItem>()
		}
	},
	created: function () {
		this.getData()
	},
	methods: {
		getData: function () {
			let dataState = {
				take: this.take,
				skip: this.skip,
				filter: this.filter,
				sort: this.sort
			}
			this.gridData = process(this.products, dataState)
		},
		createAppState(dataState: any) {
			this.take = dataState.take
			this.skip = dataState.skip
			this.sort = dataState.sort
			this.filter = dataState.filter
			this.getData()
		},
		dataStateChange(event: any) {
			console.log(event)
			this.createAppState(event.data)
		}
	}
})
</script>

<style></style>
