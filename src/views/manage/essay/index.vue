<template>
  <div class="px-5">
    <ReTable
      :fetchDataApi="getEssayList"
      :columns="columns"
      :enablePagination="true"
      :tableHeight="700"
      border
      :header-cell-style="{
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '16px',
        height: '80px'
      }"
      :cell-style="{ textAlign: 'center' }"
      class="my-3"
    >
      <template #pro-search>
        <div class="pro-search">
          <el-form inline>
            <el-form-item label="搜索">
              <el-input placeholder="请输入搜索内容" />
            </el-form-item>
            <el-form-item label="状态">
              <el-select>
                <el-option label="全部" value="all" />
                <el-option label="私密" value="active" />
                <el-option label="激活" value="deleted" />
              </el-select>
            </el-form-item>
            <el-form-item label="标签">
              <el-select>
                <el-option label="全部" value="all" />
                <el-option label="React" value="active" />
                <el-option label="Vue" value="deleted" />
              </el-select>
            </el-form-item>
            <el-form-item label="分类">
              <el-select>
                <el-option label="全部" value="all" />
                <el-option label="React" value="active" />
                <el-option label="Vue" value="deleted" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">搜索</el-button>
            </el-form-item>
          </el-form>
        </div>
      </template>
      <template #tags="{ row }">
        <span v-if="row?.tags?.length">
          <el-tag v-for="(tag, index) in row?.tags" :key="index" class="mr-1">{{
            tag.name
          }}</el-tag>
        </span>
        <span v-else>无标签</span>
      </template>
      <template #categories="{ row }">
        <span v-if="row?.categories?.length">
          <el-tag v-for="(category, index) in row?.categories" :key="index">{{
            category.name
          }}</el-tag>
        </span>
        <span v-else>无分类</span>
      </template>
      <template #action="{ row }">
        <el-button type="text" size="small" @click="deleteArticle(row)"
          >查看数据</el-button
        >
        <el-button type="text" size="small" @click="openDialog(row)"
          >编辑</el-button
        >
        <el-button type="text" size="small" @click="deleteArticle(row)"
          >删除</el-button
        >
        <el-button type="text" size="small" @click="deleteArticle(row)"
          >预览</el-button
        >
        <el-button type="text" size="small" @click="deleteArticle(row)"
          >置顶</el-button
        >
      </template>
    </ReTable>
  </div>
  <Dialog />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getEssayList } from "@/api/essay";
import ReTable from "@/components/ReTable/index.vue";
import Dialog from "@/components/ReDialog/index.vue";

/**
 * @description: 定义表格列
 * */
const columns = ref([
  { prop: "id", label: "文章ID", sortable: true, width: "100px" },
  { prop: "title", label: "标题", width: "200px" },
  { prop: "author", label: "作者", width: "150px" },
  { prop: "coverImage", label: "封面图", width: "150px" },
  { prop: "tags", label: "标签", width: "150px", scopedSlot: "tags" },
  {
    prop: "categories",
    label: "分类",
    width: "150px",
    scopedSlot: "categories"
  },
  { prop: "isActive", label: "是否激活", width: "100px" },
  { prop: "isDeleted", label: "是否删除", width: "100px" },
  { prop: "createdAt", label: "创建时间", width: "150px" },
  { prop: "updatedAt", label: "更新时间", width: "150px" }
]);

/**
 * @description: 打开对话框
 * */
const openDialog = (row: any) => {};

/**
 * @description: 获取文章列表
 * */
const editArticle = (row: any) => {
  console.log("编辑文章:", row);
};

/**
 * @description: 删除文章函数
 * */
const deleteArticle = (row: any) => {
  console.log("删除文章:", row);
};
</script>

<style scoped></style>
