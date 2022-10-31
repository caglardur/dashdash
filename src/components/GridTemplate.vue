<template>
	<v-container fluid>
		<Grid ref="grid" :data-items="gridData" :columns="columns" :edit-field="'inEdit'" :skip="skip" :sortable="true" :sort="sort" :filter="filter" @datastatechange="dataStateChange" :column-menu="columnMenu" :resizable="true" @itemchange="itemChange" :navigatable="true" @cellkeydown="onKeydown">
			<template v-slot:myTemplate="{ props }">
				<td class="k-command-cell" v-bind="props">
					<kbutton class="k-grid-save-command text-white" :type="'button'" :theme-color="'primary'" @click="editHandler(props)"> Ekle </kbutton>
					<kbutton class="k-grid-cancel-command" :type="'button'" @click="removeHandler(props)"> Sil </kbutton>
				</td>
			</template>
			<template v-slot:Index="{ props }">
				<td v-bind="props" class="ta-center">{{ gridData.map(x => x.ProductID).indexOf(props.dataItem.ProductID) }}</td>
			</template>
			<template v-for="(column, index) in editableColumns" v-slot:[column]="{ props }" :key="index">
				<td v-bind="props">{{ props.dataItem[column] }}</td>
			</template>
			<grid-toolbar>
				<div @click="closeEdit">
					<kbutton title="Add new" :theme-color="'primary'" @click="addRecord"> Add new (satır) </kbutton>
				</div>
				<div>
					<kbutton title="Add new" :theme-color="'primary'" @click="toggleDialog"> Add new (popup) </kbutton>
				</div>
			</grid-toolbar>
		</Grid>
		<k-dialog v-if="visibleDialog" :title="'Please confirm'" @close="toggleDialog">
			<p :style="{ margin: '25px', textAlign: 'center' }">Are you sure you want to continue?</p>
			<dialog-actions-bar>
				<kbutton @click="toggleDialog">No</kbutton>
				<kbutton @click="toggleDialog">Yes</kbutton>
			</dialog-actions-bar>
		</k-dialog>
	</v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { State, process } from "@progress/kendo-data-query"
import { Button } from "@progress/kendo-vue-buttons"
import { Grid, GridColumnProps, GridToolbar } from "@progress/kendo-vue-grid"
import { Dialog, DialogActionsBar } from "@progress/kendo-vue-dialogs"

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
		"grid-toolbar": GridToolbar,
		"dialog-actions-bar": DialogActionsBar,
		"k-dialog": Dialog
	},
	data() {
		return {
			visibleDialog: false,
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
			editableColumns: ["ProductID", "UnitPrice", "UnitAmount"],
			columns:
				[
					{ title: "No", field: "Index", cell: "Index", width: "48px", sortable: false, columnMenu: false },
					{ field: "ProductID", filter: "numeric", cell: "ProductID" },
					{ field: "ProductName", filter: "text", editable: false },
					{ field: "UnitPrice", filter: "numeric", cell: "UnitPrice" },
					{ field: "UnitAmount", filter: "numeric", cell: "UnitAmount" },
					{ field: "Discontinued", filter: "boolean", editable: false },
					{ field: "AddedDate", filter: "date", editable: false },
					{ cell: "myTemplate", filterable: false, width: "126px", sortable: false, columnMenu: false }
				] || Array<GridColumnProps>(),
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
		toggleDialog() {
			this.visibleDialog = !this.visibleDialog
		},
		insert() {
			this.productInEdit = {
				ProductName: "",
				UnitsInStock: 0,
				Discontinued: false
			}
		},
		onKeydown(e: any) {
			console.log("onKeydown", e)
			if (e.event.key == "Enter") {
				console.log("enterr")
				const findIndex = this.gridData.findIndex(k => k.ProductID == e.dataItem.ProductID)
				this.gridData[findIndex].inEdit = true
			} else if (e.event.key == "Escape") {
				console.log("escape")
				const findIndex = this.gridData.findIndex(k => k.ProductID == e.dataItem.ProductID)
				this.gridData[findIndex].inEdit = false
			}
		},
		enterFunc(e: any) {
			console.log("enter", e)
		},
		rowClick(e: any) {
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
			this.gridData = this.products.map((product: GridDataItem) => Object.assign({ inEdit: false }, product))
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
				ProductID: null || Number(),
				ProductName: "",
				UnitPrice: null || Number(),
				UnitAmount: 100,
				Discontinued: false,
				AddedDate: new Date()
			}
			const data = this.products
			data.unshift(newRecord)
			this.products = data
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
