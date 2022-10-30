<template>
	<v-container fluid>
		<Grid ref="grid" :data-items="gridData" :columns="columns" :edit-field="'inEdit'" :skip="skip" :sortable="true" :sort="sort" :filter="filter" @datastatechange="dataStateChange" :column-menu="columnMenu" :resizable="true" @itemchange="itemChange" :navigatable="true" @keydown="onKeydown">
			<template v-slot:myTemplate="{ props }">
				<td class="k-command-cell">
					<kbutton class="k-grid-save-command text-white" :type="'button'" :theme-color="'primary'" @click="editHandler(props)"> Ekle </kbutton>
					<kbutton class="k-grid-cancel-command" :type="'button'" @click="removeHandler(props)"> Sil </kbutton>
				</td>
			</template>
			<grid-toolbar>
				<div @click="closeEdit">
					<kbutton title="Add new" :theme-color="'primary'" @click="addRecord"> Add new (satır) </kbutton>
				</div>
				<div>
					<kbutton title="Add new" :theme-color="'primary'"> Add new (popup) </kbutton>
				</div>
			</grid-toolbar>
		</Grid>
		<dialog-container v-if="productInEdit" :data-item="productInEdit"> </dialog-container>
	</v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { State, process } from "@progress/kendo-data-query"
import { Button } from "@progress/kendo-vue-buttons"
import { Grid, GridColumnProps, GridToolbar } from "@progress/kendo-vue-grid"

interface GridDataItem {
	ProductID: number | null
	ProductName: string
	UnitPrice: number | null
	Discontinued: boolean
	AddedDate: Date
	inEdit?: boolean
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
			productInEdit: {
				ProductName: String(),
				UnitsInStock: Number(),
				Discontinued: Boolean()
			},
			columnMenu: true,
			take: 20,
			skip: 0,
			sort: [],
			filter: null,
			editID: -1,
			editItem: -1,
			editField: "",
			editableColumns: ["ProductID", "ProductName", "UnitPrice", "Discontinued", "FirstOrderedOn"],
			columns: [{ field: "Index" }, { field: "ProductID", filter: "numeric" }, { field: "ProductName", filter: "text", editable: false }, { field: "UnitPrice", filter: "numeric" }, { field: "UnitAmount", filter: "numeric" }, { field: "Discontinued", filter: "boolean", editable: false }, { field: "AddedDate", filter: "date", editable: false }, { cell: "myTemplate", filterable: false, width: "220px" }] || Array<GridColumnProps>(),
			products: [
				{
					ProductID: 1,
					ProductName: "Chai",
					UnitPrice: 39,
					UnitAmount: 100,
					Discontinued: false,
					AddedDate: new Date(1996, 8, 20)
				},
				{
					ProductID: 2,
					ProductName: "Chang",
					UnitPrice: 17,
					UnitAmount: 100,
					Discontinued: false,
					AddedDate: new Date(1996, 7, 12)
				},
				{
					ProductID: 3,
					ProductName: "Aniseed Syrup",
					UnitPrice: 13,
					UnitAmount: 100,
					Discontinued: false,
					AddedDate: new Date(1996, 8, 26)
				},
				{
					ProductID: 4,
					ProductName: "Chef Anton's Cajun Seasoning",
					UnitPrice: 53,
					UnitAmount: 100,
					Discontinued: false,
					AddedDate: new Date(1996, 8, 19)
				},
				{
					ProductID: 5,
					ProductName: " Seasoning",
					UnitPrice: 63,
					UnitAmount: 100,
					Discontinued: false,
					AddedDate: new Date(1996, 11, 19)
				},
				{
					ProductID: 6,
					ProductName: "Cajun Seasoning",
					UnitPrice: 24,
					UnitAmount: 100,
					Discontinued: false,
					AddedDate: new Date(1996, 3, 19)
				}
			],
			emptyProduct: Array<GridDataItem>(),
			gridData: Array<GridDataItem>(),
			dataState: Object as State
		}
	},
	created() {
		this.getData()
	},
	methods: {
		insert() {
			this.productInEdit = {
				ProductName: "",
				UnitsInStock: 0,
				Discontinued: false
			}
		},
		onKeydown(e: any) {
			console.log("onKeydown", e)
		},
		enterFunc(e: any) {
			console.log("enter", e)
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
			this.gridData = this.emptyProduct.map((product: GridDataItem) => Object.assign({ inEdit: true }, product))
			this.gridData = process(this.gridData, this.dataState).data
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
				ProductID: null,
				ProductName: "",
				UnitPrice: null,
				Discontinued: false,
				AddedDate: new Date()
			}
			const data = this.emptyProduct
			data.unshift(newRecord)
			this.emptyProduct = data
			this.editID = 0
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
		editHandler(e: any) {
			console.log(e)
		},
		removeHandler(e: any) {
			console.log(e)
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
