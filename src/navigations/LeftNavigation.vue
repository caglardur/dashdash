<template>
	<v-navigation-drawer color="blue-grey-darken-4" permanent elevation="0" :model-value="leftNavigationMini">
		<v-list>
			<v-list-subheader class="text-white">Kişisel</v-list-subheader>
			<v-list-item v-for="(item, i) in myMenu" :key="i" :value="item" variant="plain" link :to="item.to">
				<template v-slot:prepend>
					<v-icon :icon="item.icon"></v-icon>
				</template>

				<v-list-item-title v-text="item.text"></v-list-item-title>
			</v-list-item>
		</v-list>

		<v-list>
			<v-list-subheader class="text-white">Genel</v-list-subheader>

			<v-list-item v-for="(item, i) in generalMenu" :key="i" :value="item" variant="plain">
				<template v-slot:prepend>
					<v-icon :icon="item.icon"></v-icon>
				</template>

				<v-list-item-title v-text="item.text"></v-list-item-title>
			</v-list-item>
		</v-list>
	</v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
	name: "LeftNavigation",
	props: {
		leftNavigationMini: Boolean
	},
	data() {
		return {
			myMenu: [
				{ text: "PANELLER", icon: "mdi-view-dashboard", to: "/" },
				{ text: "TAKVİM", icon: "mdi-calendar", to: "/calendar" },
				{ text: "MESAJLAR", icon: "mdi-email", to: "/messages" },
				{ text: "DATA", icon: "mdi-table-large", to: "/data" }
			],
			generalMenu: [
				{ text: "DUYURULAR", icon: "mdi-bullhorn", to: "dashboardview" },
				{ text: "ŞİRKET BİLGİLERİ", icon: "mdi-office-building", to: "dashboardview" },
				{ text: "ÇALIŞANLAR", icon: "mdi-account-group", to: "dashboardview" },
				{ text: "STOK DURUMU", icon: "mdi-shape-outline", to: "dashboardview" },
				{ text: "MÜŞTERİLER", icon: "mdi-briefcase-account", to: "dashboardview" },
				{ text: "İŞ AKIŞI", icon: "mdi-clipboard-flow", to: "dashboardview" },
				{ text: "DOSYALAR", icon: "mdi-file", to: "dashboardview" },
				{ text: "GÖREVLER", icon: "mdi-target", to: "dashboardview" },
				{ text: "BAĞLANTILAR", icon: "mdi-contacts", to: "dashboardview" }
			]
		}
	}
})
</script>

<style></style>
