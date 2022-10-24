<template>
	<v-container fluid>
		<Grid ref="grid" :data-items="result" :sortable="sortable" :sort="sort" @rowclick="rowClick" @sortchange="sortChangeHandler" :columns="columns" @cellclick="cellClick" :edit-field="'inEdit'" :row-render="cellFunction">
			<template v-slot:myTemplate="{ props }">
				<custom :column="props.column" :filterable="props.filterable" :filter="props.filter" :sortable="props.sortable" :sort="props.sort" :columns="columns" @sortchange="e => props.onSortchange(e)" @filterchange="e => props.onFilterchange(e)" @closemenu="e => props.onClosemenu(e)" @contentfocus="e => props.onContentfocus(e)" @columnssubmit="onColumnsSubmit" />
			</template>
		</Grid>
	</v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { Grid } from "@progress/kendo-vue-grid"
import { orderBy, SortDescriptor } from "@progress/kendo-data-query"
import ColumnMenu from "./ColumnMenu.vue"

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
		Grid: Grid,
		custom: ColumnMenu
	},
	computed: {
		sortable(): { allowUnsort: boolean; mode: string } {
			return {
				allowUnsort: this.allowUnsort,
				mode: this.multiple ? "multiple" : "single"
			}
		},
		getData(): GridDataItem[] {
			return this.gridData.map((item: GridDataItem) => Object.assign({ inEdit: item.ProductID === this.editID }, item))
		},
		result(): any {
			return orderBy(this.gridData, this.sort)
		}
	},
	data: function () {
		return {
			editField: undefined,
			allowUnsort: true,
			multiple: false,
			dataState: {
				take: 0,
				skip: 0
			},
			sort: Array<SortDescriptor>(),
			updatedData: [],
			editID: null || Number(),
			group: [{ field: "UnitsInStock" }],
			expandedItems: [],
			columns: [
				{
					title: "Product Id",
					field: "ProductID",
					filter: "numeric",
					columnMenu: "myTemplate"
				},
				{
					title: "Product Name",
					field: "ProductName",
					filter: "text",
					columnMenu: "myTemplate"
				},
				{
					title: "Quantity Per Unit",
					field: "QuantityPerUnit",
					filter: "numeric",
					columnMenu: "myTemplate"
				},
				{
					title: "Unit Price",
					field: "UnitPrice",
					filter: "numeric",
					columnMenu: "myTemplate"
				},
				{
					title: "Units In Stock",
					field: "UnitsInStock",
					filter: "numeric",
					columnMenu: "myTemplate"
				},
				{
					title: "Discontinued",
					field: "Discontinued",
					filter: "boolean",
					columnMenu: "myTemplate"
				}
			],
			gridData:
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
				] || Array<GridDataItem>()
		}
	},
	methods: {
		itemChange: function (e: any) {
			const data = this.gridData.slice()
			const index = data.findIndex(d => d.ProductID === e.dataItem.ProductID)
			data[index] = { ...data[index], [e.field]: e.value }
			this.gridData = data
		},
		rowClick: function (e: any) {
			this.editID = e.dataItem.ProductID
			e.dataItem.inEdit = true
		},
		closeEdit(e: any) {
			if (e.target === e.currentTarget) {
				this.editID = 0
			}
		},
		addRecord() {
			const newRecord = { ProductID: this.gridData.length + 1, ProductName: "", UnitsInStock: 0, Discontinued: false, FirstOrderedOn: new Date() }
			const data = this.gridData.slice()
			data.unshift(newRecord)
			this.gridData = data
			this.editID = newRecord.ProductID
		},
		sortChangeHandler: function (e: any) {
			this.sort = e.sort
		},
		onColumnsSubmit(columnsState: any) {
			this.columns = columnsState
		},
		cellClick: function (e: any) {
			if (e.dataItem.inEdit && e.field === this.editField) {
				return
			}
			this.editField = e.field
			e.dataItem.inEdit = e.field
		}
	}
})
</script>

<style></style>
