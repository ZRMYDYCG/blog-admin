export default {
  path: "/create",
  redirect: "/create/index",
  meta: {
    icon: "ri:information-line",
    title: "创作",
    rank: 2
  },
  children: [
    {
      path: "/create/index",
      name: "Create",
      component: () => import("@/views/create/index.vue"),
      meta: {
        title: "创作"
      }
    }
  ]
} satisfies RouteConfigsTable;
