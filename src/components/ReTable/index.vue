<template>
  <div>
    <!-- 过滤筛选功能 -->
    <el-input
      v-model="filterText"
      placeholder="输入关键字进行过滤"
      style="margin-bottom: 10px"
    />

    <!-- 表格组件 -->
    <el-table
      :data="filteredData"
      style="width: 100%"
      :filter-change="handleFilterChange"
    >
      <el-table-column
        v-for="column in columns"
        :key="column.prop"
        :prop="column.prop"
        :label="column.label"
        :sortable="column.sortable"
        :width="column.width"
        :filters="column.filters"
        :filter-method="column.filterMethod"
      />
    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="data.length"
      :page-size="pageSize"
      :current-page="currentPage"
      @current-change="handlePageChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { ElTable, ElTableColumn, ElInput, ElPagination } from "element-plus";

// 定义 props
interface Column {
  prop: string;
  label: string;
  sortable?: boolean;
  width?: string;
  filters?: { text: string; value: string }[];
  filterMethod?: (value: string, row: any) => boolean;
}

interface Props {
  data: any[];
  columns: Column[];
}

const props = defineProps<Props>();

// 定义过滤文本
const filterText = ref("");

// 定义分页相关参数
const pageSize = ref(10);
const currentPage = ref(1);

// 计算过滤后的数据
const filteredData = computed(() => {
  if (!props.data) return [];
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return props.data
    .filter(item => item.name.includes(filterText.value))
    .slice(start, end);
});

// 处理过滤变化
const handleFilterChange = (filters: any) => {
  // 根据需要处理过滤逻辑
};

// 处理分页变化
const handlePageChange = (val: number) => {
  currentPage.value = val;
};

// 过滤方法（默认过滤方法，可以根据需要覆盖）
const filterName = (value: string, row: any) => {
  return row.name === value;
};
</script>

<style scoped></style>
