<template>
  <div>
    <ReTable
      :fetchDataApi="fetchArticlesMock"
      :columns="columns"
      :enablePagination="true"
      :customPageSize="10"
      tableHeight="400px"
      tableMaxHeight="600px"
      :enableBaseSearch="false"
    >
      <!-- 自定义操作列 -->
      <template #action="{ row }">
        <el-button type="primary" size="small" @click="handleEdit(row?.id)"
          >编辑</el-button
        >
        <el-button type="danger" size="small" @click="handleDelete(row?.id)"
          >删除</el-button
        >
      </template>

      <!-- 自定义标题列 -->
      <template #customTitle="{ row }">
        <span :style="getTitleStyle(row)">
          {{ row?.title }}
        </span>
        <img :src="row?.cover" style="width: 100px; height: 100px" alt="#" />
      </template>

      <!-- 自定义 pro-search 插槽 -->
      <template #pro-search="{ filterText, updateFilterText, fetchData }">
        <el-input
          v-model="localFilterText"
          :modelValue="filterText"
          placeholder="高级搜索"
          style="margin-right: 10px"
          @update:modelValue="updateFilterText"
        />
        <el-button @click="fetchData">高级搜索</el-button>
      </template>
    </ReTable>
  </div>
</template>

<script setup lang="ts">
import ReTable from "@/components/ReTable/index.vue";
import { ElButton } from "element-plus";
import { ref, watch } from "vue";

interface Column {
  prop: string;
  label: string;
  sortable?: boolean;
  width?: string;
  filters?: { text: string; value: string }[];
  filterMethod?: (value: string, row: any) => boolean;
  scopedSlot?: string; // 用于指定自定义插槽名称
}

const columns: Column[] = [
  {
    prop: "title",
    label: "标题",
    sortable: false,
    width: "200px",
    scopedSlot: "customTitle"
  },
  { prop: "tag", label: "标签", sortable: false, width: "300px" },
  { prop: "category", label: "分类", sortable: false, width: "300px" },
  { prop: "author", label: "作者", sortable: false, width: "150px" },
  { prop: "content", label: "内容", sortable: false, width: "300px" },
  { prop: "createdAt", label: "创建时间", sortable: true, width: "200px" },
  { prop: "updatedAt", label: "更新时间", sortable: true, width: "200px" }
];

const mockArticles = [
  {
    id: 1,
    title: "文章标题1",
    content: "文章内容1",
    author: "作者1",
    createdAt: "2023-10-01T12:00:00.000Z",
    updatedAt: "2023-10-01T12:00:00.000Z",
    cover: "https://example.com/cover1.jpg"
  },
  {
    id: 2,
    title: "文章标题2",
    content: "文章内容2",
    author: "作者2",
    createdAt: "2023-10-02T12:00:00.000Z",
    updatedAt: "2023-10-02T12:00:00.000Z",
    cover: "https://example.com/cover2.jpg"
  }
];

const fetchArticlesMock = async (params: {
  page: number;
  pageSize: number;
  filterText: string;
}) => {
  const { page, pageSize, filterText } = params;

  const filteredArticles = mockArticles.filter(
    article =>
      article.title.includes(filterText) ||
      article.author.includes(filterText) ||
      article.content.includes(filterText)
  );

  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedArticles = filteredArticles.slice(start, end);

  return {
    data: paginatedArticles,
    total: filteredArticles.length
  };
};

// 定义按钮点击事件
const handleEdit = (id: number) => {
  console.log("编辑文章 ID:", id);
};

const handleDelete = (id: number) => {
  console.log("删除文章 ID:", id);
};

// 定义自定义文字颜色的样式
const getTitleStyle = (row: any) => {
  if (row.id === 1) {
    return { color: "red" };
  } else if (row.id === 2) {
    return { color: "blue" };
  }
  return {};
};

// 父组件中使用的中间变量
const localFilterText = ref("");

// 更新 filterText 的方法
const updateFilterText = (value: string) => {
  localFilterText.value = value;
  filterText.value = value; // 确保 filterText 也被更新
};

// 将 filterText 从 ReTable 组件传递到父组件
const filterText = ref("");

// 监听 localFilterText 的变化
watch(localFilterText, newValue => {
  updateFilterText(newValue);
});
</script>

<style scoped></style>
