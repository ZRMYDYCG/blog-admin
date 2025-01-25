<script setup lang="ts">
import BaseSearch from "./base-search.vue";
defineExpose({
  // 暴露过滤条件
});
</script>

<template>
  <div class="filter-container flex justify-between items-center">
    <div>
      <el-button type="text">我的订阅</el-button>
      <el-button type="text">订阅我的</el-button>
    </div>
    <div>
      <base-search />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
