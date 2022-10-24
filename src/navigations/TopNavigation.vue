<template>
	<v-app-bar color="blue-grey-darken-4" :elevation="0">
		<v-app-bar-title>
			<v-col style="width: 230px" class="pa-0">
				<v-row align="center">
					<v-col cols="auto">
						<v-icon>mdi-mixed-martial-arts</v-icon>
					</v-col>
					<v-col cols="auto" class="text-h5"> INFO </v-col>
					<v-spacer></v-spacer>
					<v-col cols="auto">
						<v-app-bar-nav-icon @click="changeLeftNavMini"></v-app-bar-nav-icon>
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
</template>

<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
	name: "TopNavigation",
	emits: ["changeLeftNavMini"],
	methods: {
		changeLeftNavMini() {
			this.$emit("changeLeftNavMini")
		}
	}
})
</script>

<style></style>
