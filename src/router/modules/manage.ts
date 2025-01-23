export default {
  path: "/manage",
  redirect: "/manage/essay",
  meta: {
    icon: "ri:information-line",
    title: "管理",
    rank: 1
  },
  children: [
    {
      path: "/manage/essay",
      name: "Essay",
      component: () => import("@/views/manage/essay/index.vue"),
      meta: {
        title: "文章管理"
      }
    },
    {
      path: "/manage/tag",
      name: "Tag",
      component: () => import("@/views/manage/tag/index.vue"),
      meta: {
        title: "标签管理"
      }
    },
    {
      path: "/manage/category",
      name: "Category",
      component: () => import("@/views/manage/category/index.vue"),
      meta: {
        title: "分类管理"
      }
    },
    {
      path: "/manage/comment",
      name: "Comment",
      component: () => import("@/views/manage/comment/index.vue"),
      meta: {
        title: "评论管理"
      }
    },
    {
      path: "/manage/website",
      name: "Website",
      component: () => import("@/views/manage/website/index.vue"),
      meta: {
        title: "网站管理"
      }
    }
  ]
} satisfies RouteConfigsTable;
