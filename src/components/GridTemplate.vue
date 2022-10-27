<template>
	<v-container fluid>
		<Grid ref="grid" :data-items="gridData" :columns="columns" :edit-field="'inEdit'" :skip="skip" :sortable="true" :sort="sort" :filter="filter" @datastatechange="dataStateChange" :column-menu="columnMenu" :resizable="true" @itemchange="itemChange" @cellclick="cellClick" :navigatable="true" @keydown="onKeydown">
			<grid-toolbar>
				<div @click="closeEdit">
					<kbutton title="Add new" :theme-color="'primary'" @click="addRecord"> Add new </kbutton>
				</div>
			</grid-toolbar>
		</Grid>
	</v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { State } from "@progress/kendo-data-query"
import { Button } from "@progress/kendo-vue-buttons"
import { Grid, GridColumnProps, GridToolbar } from "@progress/kendo-vue-grid"

interface GridDataItem {
	ProductID: number
	ProductName: string
	UnitPrice: number
	Discontinued: boolean
	FirstOrderedOn: string
}

export default defineComponent({
	name: "GridTemplate",
	components: {
		Grid: Grid,
		kbutton: Button,
		"grid-toolbar": GridToolbar
	},
	data() {
		return {
			columnMenu: true,
			take: 20,
			skip: 0,
			sort: [],
			filter: null,
			editID: -1,
			editItem: -1,
			editField: "",
			editableColumns: ["ProductID", "ProductName", "UnitPrice", "Discontinued", "FirstOrderedOn"],
			columns:
				[
					{ field: "ProductID", filter: "numeric" },
					{ field: "ProductName", filter: "text" },
					{ field: "UnitPrice", filter: "numeric" },
					{ field: "Discontinued", filter: "boolean" },
					{ field: "FirstOrderedOn", filter: "date" }
				] ||
				Array<GridColumnProps>() ||
				null,
			products:
				[
					{
						ProductID: 1,
						ProductName: "Chai",
						UnitPrice: 39,
						Discontinued: false,
						FirstOrderedOn: new Date(1996, 8, 20).toDateString()
					},
					{
						ProductID: 2,
						ProductName: "Chang",
						UnitPrice: 17,
						Discontinued: false,
						FirstOrderedOn: new Date(1996, 7, 12).toDateString()
					},
					{
						ProductID: 3,
						ProductName: "Aniseed Syrup",
						UnitPrice: 13,
						Discontinued: false,
						FirstOrderedOn: new Date(1996, 8, 26).toDateString()
					},
					{
						ProductID: 4,
						ProductName: "Chef Anton's Cajun Seasoning",
						UnitPrice: 53,
						Discontinued: false,
						FirstOrderedOn: new Date(1996, 8, 19).toDateString()
					},
					{
						ProductID: 5,
						ProductName: " Seasoning",
						UnitPrice: 63,
						Discontinued: false,
						FirstOrderedOn: new Date(1996, 11, 19).toDateString()
					},
					{
						ProductID: 6,
						ProductName: "Cajun Seasoning",
						UnitPrice: 24,
						Discontinued: false,
						FirstOrderedOn: new Date(1996, 3, 19).toDateString()
					}
				] || Array<GridDataItem>(),
			gridData: Array<GridDataItem>(),
			dataState: Object as State
		}
	},
	created() {
		this.getData()
	},
	methods: {
		onKeydown(e: any) {
			console.log("onKeydown", e)
		},
		enterFunc(e: any) {
			console.log("enter", e)
		},
		cellClick: function (e: any) {
			// if (e.dataItem.inEdit && e.field === this.editField) {
			//     return;
			// }
			console.log("cellClick", e)
			this.editField = e.field
			this.gridData = [...this.gridData]

			e.dataItem.inEdit = e.field
		},
		rowClick: function (e: any) {
			this.gridData.forEach((d: any) => {
				console.log("rowClick forEach", d.inEdit)
				if (d.inEdit) {
					d.inEdit = undefined
				}
			})
			this.gridData = [...this.gridData]
		},
		getData() {
			this.dataState = {
				take: this.take,
				skip: this.skip,
				filter: this.filter!,
				sort: this.sort
			}
			this.gridData = this.products.map(product => Object.assign({}, product))
			// this.gridData = process(this.products, this.dataState).data
		},
		createAppState(dataState: any) {
			this.take = dataState.take
			this.skip = dataState.skip
			this.sort = dataState.sort
			this.filter = dataState.filter
			this.getData()
		},
		dataStateChange(event: any) {
			console.log(event, "dataStateChange")
			this.createAppState(event.data)
		},
		addRecord() {
			const newRecord = {
				ProductID: this.gridData.length + 1,
				ProductName: "",
				UnitPrice: 0,
				Discontinued: false,
				FirstOrderedOn: new Date().toDateString()
			}
			const data = this.products
			data.unshift(newRecord)
			this.products = data
			this.editID = newRecord.ProductID
			this.getData()
		},
		itemChange(e: any) {
			const data = this.gridData.slice()
			const index = data.findIndex(d => d.ProductID === e.dataItem.ProductID)
			data[index] = { ...data[index], [e.field]: e.value }
			this.gridData = data
			console.log(e, "itemChange")
		},
		closeEdit(e: any) {
			if (e.target === e.currentTarget) {
				this.editID = -1
			}
			console.log("closeEdit", e)
		},
		edit: function (e: any) {
			console.log("edit", e)
		},
		save: function (e: any) {
			console.log("save", e)
		},
		cancel(e: any) {
			console.log("cancel", e)
		},
		remove(e: any) {
			console.log("remove", e)
		}
	},
	watch: {
		gridData() {
			console.log("gridData watch", this.gridData)
		}
	}
})
</script>
<style></style>
