<template>
  <div>
    <ReTable :data="tableData" :columns="columns" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import ReTable from "@/components/ReTable/index.vue";

// 定义数据
const tableData = ref([]);

// 定义列配置
const columns = ref([
  { prop: "date", label: "日期", sortable: true, width: "180" },
  {
    prop: "name",
    label: "姓名",
    sortable: true,
    width: "180",
    filters: [
      { text: "张三", value: "张三" },
      { text: "李四", value: "李四" }
    ],
    filterMethod: (value: string, row: any) => row.name === value
  },
  { prop: "address", label: "地址" }
]);

// 模拟异步数据加载
onMounted(async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  tableData.value = [
    {
      date: "2016-05-02",
      name: "张三",
      address: "上海市普陀区金沙江路 1518 弄"
    },
    {
      date: "2016-05-04",
      name: "李四",
      address: "上海市普陀区金沙江路 1517 弄"
    },
    {
      date: "2016-05-01",
      name: "王五",
      address: "上海市普陀区金沙江路 1519 弄"
    },
    {
      date: "2016-05-03",
      name: "赵六",
      address: "上海市普陀区金沙江路 1516 弄"
    }
    // 更多数据...
  ];
});
</script>

<style scoped>
/* 自定义样式 */
</style>
