<script setup lang="ts">
import { ref } from "vue";
import ReTable from "@/components/ReTable/index.vue";

/**
 * @description: 定义表格列
 * */
const columns = ref([
  { prop: "name", label: "类别", width: "200px" },
  { prop: "description", label: "操作" },
  { prop: "", label: "是否付费" },
  { prop: "", label: "前台是否显示" },
  { prop: "", label: "文章数" },
  { prop: "", label: "订阅数" }
]);
</script>

<template>
  <ReTable
    :header-cell-style="{
      textAlign: 'center',
      height: '40px'
    }"
    :cell-style="{ textAlign: 'center' }"
    :columns="columns"
    :is-loading="false"
  />
</template>

<style scoped lang="scss"></style>
