<template>
  <el-tabs v-model="activeName" class="tabs" @tab-click="handleClick">
    <el-tab-pane label="分类管理" name="category">
      <div class="flex justify-between items-center">
        <div>
          <p>个人分类与专栏管理合并啦!</p>
          <p>
            双击分类名称，即可编辑，输入“#”+“空格”+“分类名称”可将一级分类改成二级分类。
          </p>
        </div>
        <div>
          <el-button>新建</el-button>
        </div>
      </div>
      <div>
        <el-button type="text">全部(3)</el-button>
        <el-button type="text">审核未通过(0)</el-button>
        <el-button type="text">回收站(5)</el-button>
      </div>
      <CategoryTable />
    </el-tab-pane>
    <el-tab-pane label="订阅分类" name="subscribe">
      <SubscriptionList />
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { TabsPaneContext } from "element-plus";
import SubscriptionList from "./components/subscription-list.vue";
import CategoryTable from "./components/category-table.vue";

const activeName = ref("category");

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
</script>

<style lang="scss" scoped>
.tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
  height: 100vh;
}
</style>
