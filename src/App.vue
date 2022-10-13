<template>
	<v-app>
		<v-main class="bg-grey-lighter-2">
			<v-app-bar color="blue-grey-darken-4" :elevation="0">
				<v-app-bar-title>
					<v-col style="width: 256px" class="pa-0">
						<v-row align="center">
							<v-col class="text-h5"> Başlık </v-col>
							<v-spacer></v-spacer>
							<v-col>
								<v-app-bar-nav-icon></v-app-bar-nav-icon>
							</v-col>
						</v-row>
					</v-col>
				</v-app-bar-title>
				<template v-slot:prepend> </template>

				<v-btn icon>
					<v-icon>mdi-magnify</v-icon>
				</v-btn>

				<v-btn icon>
					<v-icon>mdi-heart</v-icon>
				</v-btn>

				<v-btn icon>
					<v-icon>mdi-dots-vertical</v-icon>
				</v-btn>
			</v-app-bar>

			<v-navigation-drawer color="blue-grey-darken-4" permanent elevation="0">
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
			<router-view />
		</v-main>
	</v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
	name: "App",

	data() {
		return {
			myMenu: [
				{ text: "PANELLER", icon: "mdi-view-dashboard", to: "/" },
				{ text: "TAKVİM", icon: "mdi-calendar", to: "/calendar" },
				{ text: "MESAJLAR", icon: "mdi-email", to: "/messages" }
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
<style>
body {
	font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
	font-size: 0.8vw !important;
}
</style>
