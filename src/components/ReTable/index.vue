<template>
  <div>
    <!-- 过滤表格 -->
    <slot name="pro-search" />
    <!-- 表格组件 -->
    <el-table
      v-loading="loading"
      :data="tableData"
      style="width: 100%"
      :filter-change="handleFilterChange"
      :height="tableHeight"
      :max-height="tableMaxHeight"
      v-bind="$attrs"
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
      >
        <template #default="{ row, $index }">
          <slot :name="column.prop" :row="row" :index="$index">
            <template v-if="column.scopedSlot">
              <slot :name="column.scopedSlot" :row="row" :index="$index" />
            </template>
            <template v-else>
              {{ row[column.prop] }}
            </template>
          </slot>
        </template>
      </el-table-column>
      <!-- 自定义操作列 -->
      <el-table-column v-if="$slots.action" label="操作">
        <template #default="{ row, $index }">
          <slot name="action" :row="row" :index="$index" />
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      v-if="enablePagination"
      background
      layout="total, prev, pager, next, sizes"
      :total="total"
      :page-size="pageSize"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      style="margin-top: 10px; display: flex; justify-content: flex-end"
      @current-change="handlePageChange"
      @size-change="handlePageSizeChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, toRefs } from "vue";
import {
  ElTable,
  ElTableColumn,
  ElInput,
  ElPagination,
  ElButton
} from "element-plus";

// 定义 props
interface Column {
  prop: string;
  label: string;
  sortable?: boolean;
  width?: string;
  filters?: { text: string; value: string }[];
  filterMethod?: (value: string, row: any) => boolean;
  scopedSlot?: string;
}

interface Props {
  fetchDataApi?: (params: {
    page: number;
    size: number;
    filterConditions?: Record<string, string>;
  }) => Promise<{ data: any[]; total: number }>;
  columns: Column[];
  enablePagination?: boolean;
  tableHeight?: string | number;
  tableMaxHeight?: string | number;
  proSearchConditions?: Record<string, string>;
  isLoading?: boolean;
}

const props = defineProps<Props>();
const loading = props.isLoading ? ref(true) : ref(false);

// 将 props 转换为响应式引用
const {
  fetchDataApi,
  columns,
  enablePagination,
  tableHeight,
  tableMaxHeight,
  proSearchConditions,
  isLoading
} = toRefs(props);

// 定义过滤条件对象，直接使用传入的条件
const filterConditions = ref<Record<string, string>>(
  proSearchConditions.value || {}
);

// 定义分页相关参数
const pageSize = ref(10);
const currentPage = ref(1);
const total = ref(0);
const tableData = ref([]);

// 获取数据函数
const fetchData = async () => {
  if (props.isLoading) {
    loading.value = true;
  }
  const params = {
    page: currentPage.value,
    size: pageSize.value,
    ...proSearchConditions.value
  };

  const result: any = await fetchDataApi.value(params);
  tableData.value = result.data.data;
  total.value = result.data.meta.total;
  loading.value = false; // 关闭 loading
};

// 处理过滤变化
const handleFilterChange = (filters: any) => {
  fetchData();
};

// 处理分页变化
const handlePageChange = (val: number) => {
  currentPage.value = val;
  fetchData();
};

// 处理分页大小变化
const handlePageSizeChange = (val: number) => {
  pageSize.value = val;
  currentPage.value = 1; // 重置为第一页
  fetchData();
};

// 组件挂载时初始化数据
fetchData();
</script>

<style scoped></style>
