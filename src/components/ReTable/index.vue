<template>
  <div>
    <!-- 过滤筛选功能 -->
    <el-input
      v-model="filterText"
      placeholder="输入关键字进行过滤"
      style="margin-bottom: 10px"
      @input="fetchData"
    />

    <!-- 表格组件 -->
    <el-table
      :data="tableData"
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
      v-if="enablePagination"
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      :current-page="currentPage"
      @current-change="handlePageChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, toRefs } from "vue";
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
  fetchDataApi: (params: {
    page: number;
    pageSize: number;
    filterText: string;
  }) => Promise<{ data: any[]; total: number }>;
  columns: Column[];
  enablePagination?: boolean;
  customPageSize?: number;
}

const props = defineProps<Props>();

// 将 props 转换为响应式引用
const { fetchDataApi, columns, enablePagination, customPageSize } =
  toRefs(props);

// 定义过滤文本
const filterText = ref("");

// 定义分页相关参数
const pageSize = ref(customPageSize?.value || 10); // 如果 customPageSize 存在则使用它，否则使用默认值 10
const currentPage = ref(1);
const total = ref(0);
const tableData = ref([]);

// 获取数据函数
const fetchData = async () => {
  const result = await fetchDataApi.value({
    page: currentPage.value,
    pageSize: pageSize.value,
    filterText: filterText.value
  });
  tableData.value = result.data;
  total.value = result.total;
};

// 处理过滤变化
const handleFilterChange = (filters: any) => {
  // 根据需要处理过滤逻辑，这里调用 fetchData 更新数据
  fetchData();
};

// 处理分页变化
const handlePageChange = (val: number) => {
  currentPage.value = val;
  fetchData(); // 当页码变化时，更新数据
};

// 监听 customPageSize 的变化
watch(customPageSize, newPageSize => {
  pageSize.value = newPageSize || 10;
  fetchData(); // 当页码大小变化时，更新数据
});

// 组件挂载时初始化数据
fetchData();
</script>

<style scoped></style>
