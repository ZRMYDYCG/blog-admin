<template>
  <div>
    <ReTable
      :fetchDataApi="fetchArticlesMock"
      :columns="columns"
      :enablePagination="true"
      :customPageSize="10"
    />
  </div>
</template>

<script setup lang="ts">
import ReTable from "@/components/ReTable/index.vue";

interface Column {
  prop: string;
  label: string;
  sortable?: boolean;
  width?: string;
  filters?: { text: string; value: string }[];
  filterMethod?: (value: string, row: any) => boolean;
}

const columns: Column[] = [
  { prop: "title", label: "标题", sortable: false, width: "200px" },
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
    updatedAt: "2023-10-01T12:00:00.000Z"
  },
  {
    id: 2,
    title: "文章标题2",
    content: "文章内容2",
    author: "作者2",
    createdAt: "2023-10-02T12:00:00.000Z",
    updatedAt: "2023-10-02T12:00:00.000Z"
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
</script>

<style scoped></style>
