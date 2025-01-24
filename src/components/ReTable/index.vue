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
      :height="tableHeight"
      :max-height="tableMaxHeight"
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
            <!-- 如果有 scopedSlot，则使用 scopedSlot -->
            <template v-if="column.scopedSlot">
              <slot :name="column.scopedSlot" :row="row" :index="$index" />
            </template>
            <!-- 否则，使用默认内容 -->
            <template v-else>
              {{ row[column.prop] }}
            </template>
          </slot>
        </template>
      </el-table-column>
      <!-- 自定义操作列 -->
      <el-table-column v-if="$slots.action" label="操作" width="200px">
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
      @current-change="handlePageChange"
      @size-change="handlePageSizeChange"
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
  scopedSlot?: string; // 用于指定自定义插槽名称
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
  tableHeight?: string | number;
  tableMaxHeight?: string | number;
}

const props = defineProps<Props>();

// 将 props 转换为响应式引用
const {
  fetchDataApi,
  columns,
  enablePagination,
  customPageSize,
  tableHeight,
  tableMaxHeight
} = toRefs(props);

// 定义过滤文本
const filterText = ref("");

// 定义分页相关参数
const pageSize = ref(customPageSize?.value || 10);
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

// 监听 customPageSize 的变化
watch(customPageSize, newPageSize => {
  pageSize.value = newPageSize || 10;
  fetchData();
});

// 监听 tableHeight 和 tableMaxHeight 的变化
watch([tableHeight, tableMaxHeight], ([newHeight, newMaxHeight]) => {
  console.log("表格高度变化:", newHeight);
  console.log("表格最大高度变化:", newMaxHeight);
});

// 组件挂载时初始化数据
fetchData();
</script>

<style scoped></style>
