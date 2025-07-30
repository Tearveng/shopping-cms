<template>
  <div style="padding: 20px">
    <a-typography-text>Shopping categories</a-typography-text>
    <br />
    <br />
    <a-table :columns="columns" :data-source="dataSource" size="small" bordered>
      <template #bodyCell="{ column, text, record }">
        <template v-if="['title', 'subtitle', 'condition', 'price', 'fileList'].includes(column.dataIndex)">
          <div>
            <a-input
              v-if="editableData[record.key]"
              v-model:value="editableData[record.key][column.dataIndex]"
              style="margin: -5px 0"
            />
            <template v-else>
              {{ text }}
            </template>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'operation'">
          <div class="editable-row-operations">
            <span v-if="editableData[record.key]">
              <a-typography-link @click="save(record.key)"
                >Save</a-typography-link
              >
              <a-popconfirm
                title="Sure to cancel?"
                @confirm="cancel(record.key)"
              >
                <a>Cancel</a>
              </a-popconfirm>
            </span>
            <span v-else>
              <a-flex>
                <a @click="edit(record.key)">Edit</a>
                <a @click="edit(record.key)">Delete</a>
              </a-flex>
            </span>
          </div>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts" setup>
import { cloneDeep } from "lodash-es";
import { reactive, ref } from "vue";
import type { UnwrapRef } from "vue";

const columns = [
  {
    title: "Title",
    dataIndex: "title",
    width: "30%",
  },
  {
    title: "Subtitle",
    dataIndex: "subtitle",
    width: "15%",
  },
  {
    title: "Images",
    dataIndex: "fileList",
    width: "15%",
  },
  {
    title: "Condition",
    dataIndex: "condition",
    width: "15%",
  },
  {
    title: "Price",
    dataIndex: "price",
    width: "15%",
  },
  {
    title: "operation",
    dataIndex: "operation",
    width: "20%",
  },
];
interface DataItem {
  key: string;
  title: string;
  subtitle: string;
  fileList: any[];
  condition: string;
  price: number;
}
const data: DataItem[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    title: `Edrward ${i}`,
    subtitle: "",
    fileList: ['asdasd', 'asdasd'],
    condition: "London Park no.",
    price: 32,
  });
}

const dataSource = ref(data);
const editableData: UnwrapRef<Record<string, DataItem>> = reactive({});

const edit = (key: string) => {
  editableData[key] = cloneDeep(
    dataSource.value.filter((item) => key === item.key)[0]
  );
};
const save = (key: string) => {
  Object.assign(
    dataSource.value.filter((item) => key === item.key)[0],
    editableData[key]
  );
  delete editableData[key];
};
const cancel = (key: string) => {
  delete editableData[key];
};
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
