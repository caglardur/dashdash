<template>
	<v-container fluid>
		<Grid ref="grid" :data-items="gridData" :columns="columns" :edit-field="'inEdit'" :skip="skip" :sortable="true" :sort="sort" :filter="filter" @datastatechange="dataStateChange" :column-menu="columnMenu" :resizable="true" @itemchange="itemChange" :navigatable="true" @filterchange="createAppState">
			<template v-slot:myTemplate="{ props }">
				<td class="k-command-cell" v-bind="props">
					<kbutton class="k-grid-cancel-command" :type="'button'" @click="removeHandler(props.dataItem)"> Sil </kbutton>
				</td>
			</template>
			<grid-toolbar>
				<v-col cols="auto">
					<v-row>
						<v-col cols="auto">
							<KInput v-model="addProductID" editor="numeric" placeholder="Product ID" :style="{ width: '230px' }" @keydown.enter="addRecord"></KInput>
						</v-col>
						<v-col cols="auto" class="ps-0">
							<kbutton title="Add new" :theme-color="'primary'" @click="addRecord"> Ekle </kbutton>
						</v-col>
					</v-row>
				</v-col>
				<div>
					<kbutton title="Add new" :theme-color="'primary'" @click="toggleDialog"> Add new (popup) </kbutton>
				</div>
			</grid-toolbar>
		</Grid>
		<k-dialog v-if="visibleDialog" :title="'Please confirm'" @close="toggleDialog" width="650px">
			<v-col>
				<Grid :data-items="productsFiltered" :columns="productsCol" :filterable="true" :filter="filterDialog" @filterchange="onFilterDialogChange"></Grid>
			</v-col>
			<dialog-actions-bar>
				<kbutton @click="toggleDialog">Kapat</kbutton>
			</dialog-actions-bar>
		</k-dialog>
		<k-dialog v-if="noItemDialog" :title="'Hata'" @close="toggleDialog">
			<p :style="{ margin: '5px', textAlign: 'center' }">Ürün bulunamadı.</p>
			<dialog-actions-bar>
				<kbutton @click="toggleItemDialog">Ok</kbutton>
			</dialog-actions-bar>
		</k-dialog>
	</v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { State, process, CompositeFilterDescriptor } from "@progress/kendo-data-query"
import { Button } from "@progress/kendo-vue-buttons"
import { Grid, GridColumnProps, GridToolbar } from "@progress/kendo-vue-grid"
import { Dialog, DialogActionsBar } from "@progress/kendo-vue-dialogs"
import { Input } from "@progress/kendo-vue-inputs"
import { filterBy } from "@progress/kendo-data-query"

interface GridDataItem {
	ProductID: number
	ProductName: string
	UnitPrice: number
	UnitAmount: number
	Discontinued: boolean
	AddedDate: Date
	inEdit?: boolean
}

interface ProductItem {
	ProductID: number
	ProductName: string
	UnitPrice: number
}

export default defineComponent({
	name: "GridTemplate",
	components: {
		Grid: Grid,
		kbutton: Button,
		"grid-toolbar": GridToolbar,
		"dialog-actions-bar": DialogActionsBar,
		"k-dialog": Dialog,
		KInput: Input
	},

	data: function () {
		return {
			defaultGroupFilter: {
				logic: "and",
				filters: []
			} as CompositeFilterDescriptor,
			filterDialog: {
				logic: "and",
				filters: []
			} as CompositeFilterDescriptor,
			searchTerm: "",
			addProductID: Number(),
			visibleDialog: false,
			noItemDialog: false,
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
			columns: [
				{ field: "ProductID", filter: "numeric", editor: "text" },
				{ field: "ProductName", filter: "text", editable: false },
				{ field: "UnitPrice", filter: "numeric", editor: "numeric" },
				{ field: "UnitAmount", filter: "numeric", editor: "numeric" },
				{ field: "Discontinued", filter: "boolean", editor: "boolean" },
				{ field: "AddedDate", filter: "date", editor: "date" },
				{ cell: "myTemplate", filterable: false, width: "62px", sortable: false, columnMenu: false }
			] as GridColumnProps[],
			productsCol: [
				{ field: "ProductID", filter: "numeric", editable: false },
				{ field: "ProductName", filter: "text", editable: false },
				{ field: "UnitPrice", filter: "numeric", editable: false }
			] as GridColumnProps[],
			products: [
				{
					ProductID: 1,
					ProductName: "Chai",
					UnitPrice: 50
				},
				{
					ProductID: 2,
					ProductName: "Chang",
					UnitPrice: 70
				},
				{
					ProductID: 3,
					ProductName: "Aniseed Syrup",
					UnitPrice: 60
				},
				{
					ProductID: 4,
					ProductName: "Chef Anton's Cajun Seasoning",
					UnitPrice: 50
				},
				{
					ProductID: 5,
					ProductName: " Seasoning",
					UnitPrice: 100
				},
				{
					ProductID: 6,
					ProductName: "Cajun Seasoning",
					UnitPrice: 50
				}
			] as ProductItem[],

			gridData: Array<GridDataItem>(),
			dataState: Object as State
		}
	},
	computed: {
		productsFiltered(): ProductItem[] {
			return filterBy<ProductItem>(this.products, this.filterDialog)
		}
	},
	created() {
		this.getData()
	},
	methods: {
		onFilterDialogChange(event: any) {
			if (event.filter !== null) {
				this.filterDialog = event.filter
			} else {
				this.filterDialog = this.defaultGroupFilter
			}
		},
		searchData() {
			console.log("searchData")
		},
		toggleDialog() {
			this.visibleDialog = !this.visibleDialog
		},
		toggleItemDialog() {
			this.noItemDialog = !this.noItemDialog
		},
		insert() {
			this.productInEdit = {
				ProductName: "",
				UnitsInStock: 0,
				Discontinued: false
			}
		},
		getData() {
			this.dataState = {
				take: this.take,
				skip: this.skip,
				filter: this.filter ?? undefined,
				sort: this.sort
			}
			this.gridData = [...this.gridData.map((product: GridDataItem) => Object.assign({ inEdit: true, Discontinued: false, AddedDate: new Date(), UnitAmount: 100 }, product))]
			this.gridData = process(this.gridData, this.dataState).data
		},
		shortData() {
			console.log("shortData")
			this.dataState = {
				take: this.take,
				skip: this.skip,
				filter: this.filter ?? undefined,
				sort: this.sort
			}
			console.log("gridData", this.gridData)
			this.gridData = [...this.gridData.map((product: GridDataItem) => Object.assign({ inEdit: true, Discontinued: false, UnitAmount: 100, AddedDate: new Date() }, product))]
			this.gridData = process(this.gridData, this.dataState).data
		},
		createAppState(dataState: any) {
			console.log("createAppState", dataState)
			this.take = dataState.take
			this.skip = dataState.skip
			this.sort = dataState.sort
			this.filter = dataState.filter
			this.shortData()
		},
		dataStateChange(event: any) {
			console.log("dataStateChange", event)
			this.createAppState(event.data)
		},
		addRecord() {
			console.log("addRecord", this.addProductID)
			const findItem = this.products.find((item: ProductItem) => item.ProductID == this.addProductID)
			console.log("findItem", findItem)

			if (findItem) {
				const data = this.gridData
				data.push(Object.assign({ inEdit: true, Discontinued: false, UnitAmount: 100, AddedDate: new Date() }, findItem))
				this.gridData = data
				this.shortData()
				this.addProductID = Number()
			} else {
				this.toggleItemDialog()
			}
		},
		itemChange(e: any) {
			if (e.field == "ProductID") {
				const dataNew = this.products.slice()
				const dataOld = this.gridData.slice()
				const indexItem = dataNew.findIndex(d => d.ProductID == e.value)
				const indexOldItem = dataOld.findIndex(d => d.ProductID == e.dataItem.ProductID)

				dataOld.splice(indexOldItem, 1, Object.assign({ inEdit: true, Discontinued: false, UnitAmount: 100, AddedDate: new Date() }, dataNew[indexItem]))
				console.log("dataOld", dataOld)
				this.gridData = dataOld
				this.shortData()
			}

			const data = this.gridData.slice()
			const index = data.findIndex(d => d.ProductID === e.dataItem.ProductID)
			data[index] = { ...data[index], [e.field]: e.value }
			this.gridData = data
			console.log("itemChange", e)
		},
		editHandler(e: any) {
			console.log(e)
		},
		removeHandler(e: GridDataItem) {
			console.log("removeHandler", e)
			const data = this.gridData.slice()
			this.gridData = data.filter(d => d.ProductID != e.ProductID && d.ProductName != e.ProductName && d.UnitPrice != e.UnitPrice)
			this.shortData()
		}
	}
})
</script>
<style></style>
