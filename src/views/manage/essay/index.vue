<template>
  <ReTable
    :fetchDataApi="fetchData"
    :columns="columns"
    :enablePagination="true"
    :tableHeight="700"
  >
    <template #action="{ row }">
      <el-button type="text" size="small" @click="editArticle(row)"
        >编辑</el-button
      >
      <el-button type="text" size="small" @click="deleteArticle(row)"
        >删除</el-button
      >
    </template>
  </ReTable>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ReTable from "@/components/ReTable/index.vue";

interface Article {
  id: number;
  title: string;
  content: string;
  author: string;
  coverImage?: string;
  isActive: boolean;
  isDeleted: boolean;
  categories: any[];
  tags: any[];
  comments: any[];
  createdAt: Date;
  updatedAt: Date;
}

// 模拟数据
const mockData: Article[] = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  title: `文章标题 ${index + 1}`,
  content: `这是文章内容 ${index + 1}`,
  author: `作者 ${index + 1}`,
  coverImage: `coverImage${index + 1}`,
  isActive: true,
  isDeleted: false,
  categories: [],
  tags: [],
  comments: [],
  createdAt: new Date(),
  updatedAt: new Date()
}));

// 获取数据函数
const fetchData = async (params: {
  page: number;
  pageSize: number;
  filterConditions?: Record<string, string>;
}): Promise<{ data: Article[]; total: number }> => {
  const startIndex = (params.page - 1) * params.pageSize;
  const endIndex = startIndex + params.pageSize;
  const data = mockData.slice(startIndex, endIndex);
  const total = mockData.length;
  return { data, total };
};

// 定义表格列
const columns = ref([
  { prop: "id", label: "ID", sortable: true, width: "100px" },
  { prop: "title", label: "标题", width: "200px" },
  { prop: "author", label: "作者", width: "150px" },
  { prop: "coverImage", label: "封面图", width: "150px" },
  { prop: "tags", label: "标签", width: "150px" },
  { prop: "categories", label: "分类", width: "150px" },
  { prop: "isActive", label: "是否激活", width: "100px" },
  { prop: "isDeleted", label: "是否删除", width: "100px" },
  { prop: "createdAt", label: "创建时间", width: "150px" },
  { prop: "updatedAt", label: "更新时间", width: "150px" }
]);

// 编辑文章函数
const editArticle = (article: Article) => {
  console.log("编辑文章:", article);
};

// 删除文章函数
const deleteArticle = (article: Article) => {
  console.log("删除文章:", article);
};
</script>

<style scoped></style>
