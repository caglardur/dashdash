<template>
	<div>
		<GridColumnMenuSort :column="column" :sortable="sortable" :sort="sort" @closemenu="closeMenu" @sortchange="sortChange" />
		<GridColumnMenuFilter :column="column" :filterable="filterable" :filter="filter" @filterfocus="handleFocus" @closemenu="closeMenu" @expandchange="expandChange" @filterchange="filterChange" />
	</div>
</template>
<script lang="ts">
import { GridColumnMenuFilter, GridColumnMenuSort, GridColumnMenuItemGroup, GridColumnMenuItemContent, GridColumnMenuItem } from "@progress/kendo-vue-grid"
import { Button } from "@progress/kendo-vue-buttons"
// import { products } from "./products"

export default {
	props: {
		column: Object,
		sortable: [Boolean, Object],
		sort: {
			type: Array
		},
		filter: Object,
		filterable: Boolean,
		columns: Array
	},
	data() {
		return {
			currentColumns: [],
			columnsExpanded: false,
			filterExpanded: false
		}
	},
	created() {
		this.$data.currentColumns = this.$props.columns
	},
	components: {
		GridColumnMenuSort: GridColumnMenuSort,
		GridColumnMenuFilter: GridColumnMenuFilter
	},
	computed: {
		oneVisibleColumn() {
			return this.currentColumns.filter(c => !c.hidden).length === 1
		}
	},
	methods: {
		handleFocus(e) {
			this.$emit("contentfocus", e)
		},

		onSubmit(event) {
			console.log("onSubmit", event)
			if (event) {
				event.preventDefault()
			}
			this.$emit("columnssubmit", this.currentColumns)
			this.$emit("closemenu")
		},
		onMenuItemClick() {
			const value = !this.columnsExpanded
			this.columnsExpanded = value
			this.filterExpanded = value ? false : this.filterExpanded
		},
		onFilterExpandChange(value) {
			this.filterExpanded = value
			this.columnsExpanded = value ? false : this.columnsExpanded
		},
		expandChange() {
			this.$emit("expandchange")
		},
		closeMenu() {
			this.$emit("closemenu")
		},
		filterChange(newDescriptor, e) {
			console.log("filterChange", newDescriptor, e)
			this.$emit("filterchange", newDescriptor, e)
		},
		sortChange(newDescriptor, e) {
			this.$emit("sortchange", newDescriptor, e)
		}
	}
}
</script>
