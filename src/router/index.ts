import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "dashboardview",
		component: () => import(/* webpackChunkName: "dashboardview" */ "../views/DashboardView.vue")
	},
	{
		path: "/calendar",
		name: "calendarview",
		component: () => import(/* webpackChunkName: "calendarview" */ "../views/CalendarView.vue")
	},
	{
		path: "/messages",
		name: "messagesview",
		component: () => import(/* webpackChunkName: "messagesview" */ "../views/MessagesView.vue")
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
