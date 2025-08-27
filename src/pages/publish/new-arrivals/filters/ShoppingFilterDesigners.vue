<template>
  <div v-for="(value, key) in parentCategories" :key="key">
    <a-collapse
      v-model:activeKey="activeCategories[key.toString().toLowerCase()]"
      ghost
      style="max-width: 250px"
      class="custom-collapse"
    >
      <a-collapse-panel key="1" :header="key" style="padding: 0; margin: 0">
        <a-flex
          class="container"
          vertical
          v-for="category in value"
          :key="category.key"
          style="margin-right: 10px"
        >
          <a-flex class="content-designers">
            <a-flex style="gap: 12px">
              <a-checkbox
                :checked="category.check"
                @click="
                  () =>
                    toggleChecked(key.toString(), category.check, category.id)
                "
              ></a-checkbox>
              <a-typography style="font-size: 0.9rem">{{
                category["title"]
              }}</a-typography>
            </a-flex>
            <a-typography>({{ category.amount }})</a-typography>
          </a-flex>
        </a-flex>
      </a-collapse-panel>
    </a-collapse>
    <a-divider
      style="
        height: 0.05rem;
        margin-top: 10px;
        margin-bottom: 5px;
        background-color: #00000020;
      "
    />
  </div>
</template>

<style scoped>
.content-designers {
  justify-content: space-between;
}

.custom-collapse :deep(.ant-collapse-content-box) {
  padding: 0;
}

/* Targets the header area of each panel */
.custom-collapse :deep(.ant-collapse-header) {
  padding: 0;
  display: flex;
  flex-direction: row-reverse; /* This reverses the order of children */
  justify-content: space-between;
}

/* Targets the text in the header, pushing it to the left after the icon is reversed */
.custom-collapse :deep(.ant-collapse-header-text) {
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.7em;
  flex: 1; /* Takes up available space, pushing itself to the left */
}

/* Targets the expand icon container */
.custom-collapse :deep(.ant-collapse-expand-icon) {
  padding-top: 14px;
  padding-inline-end: 0; /* Resets the default right padding */
}
</style>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { getCountsCategory } from "../../../../services/CategoryService";

const activeCategories = reactive({
  designers: ["1"],
  bags: ["0"],
  accessories: ["0"],
  shoes: ["0"],
  jewelry: ["0"],
  watches: ["0"],
}) as any;

interface ShoppingCategory {
  id: number;
  key: string;
  title: string;
  amount: number;
  check: boolean;
  parent_category: string;
  images: [];
  user_id: string;
  created_at: string;
}

interface ShoppingParentKey {
  [k: string]: ShoppingCategory[];
}

const emit = defineEmits(["option-change"]);
const parentCategories = reactive<ShoppingParentKey>({});
const parentActive = reactive<{ [k: string]: string }>({});

const toggleChecked = (key: string, checked: boolean, id: number) => {
  // Find the category index
  const categoryIndex = parentCategories[key]?.findIndex((i) => i.id === id);
  if (categoryIndex === -1 || !parentCategories[key]) {
    console.warn("Category not found");
    return;
  }
  // Update the property directly - Vue will handle reactivity
  parentCategories[key][categoryIndex].check = !checked;
  const filteredData = Object.keys(parentCategories).reduce(
    (acc: any, category) => {
      acc[category] = parentCategories[category].filter(
        (item) => item.check === true
      );
      return acc;
    },
    {}
  );
  emit("option-change", filteredData);
};

onMounted(async () => {
  const categories = await getCountsCategory();
  for (const [index, i] of categories.entries()) {
    const pre = {
      id: i.id,
      key: `${i.id}`,
      title: i.title,
      check: false,
      amount: i.shopping_all_items.filter((s) => s.parent_key === i.parent_category)
        .length,
    } as ShoppingCategory;
    let key = parentCategories[i.parent_category];
    if (key) {
      key.push(pre);
    } else {
      parentCategories[i.parent_category] = [pre];
      parentActive[i.parent_category] = index === 0 ? "1" : "0";
    }
  }
});
</script>