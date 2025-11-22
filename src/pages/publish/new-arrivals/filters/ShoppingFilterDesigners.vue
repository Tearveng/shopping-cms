<template>
  <div v-for="(value, key) in getCategoriesEntries()" :key="key">
    <a-collapse
      v-model:activeKey="activeCategories[key.toString().toLowerCase()]"
      ghost
      style="width: 100%"
      class="custom-collapse"
    >
      <a-collapse-panel
        key="1"
        :header="headerLabel(key)"
        style="padding: 0; margin: 0"
      >
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
import { onMounted, reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { getCountsCategory } from "../../../../services/CategoryService";
import type {
  ShoppingCategory,
  ShoppingParentKey,
} from "../../../../types/ShoppingCategory";

const getActiveCategory = () => {
  const key = route.params.parent_key;
  if (key === "new-arrivals") {
    return {
      designers: ["1"],
      bags: ["0"],
      accessories: ["0"],
      shoes: ["0"],
      jewelry: ["0"],
      watches: ["0"],
    };
  }

  return { [`${route.params.parent_key}`]: ["1"] };
};

const activeCategories = ref({}) as any;

const route = useRoute();

const emit = defineEmits(["option-change"]);
const categoriesRef = ref<Array<string>>([]);
const parentCategories = reactive<ShoppingParentKey>({});

const props = defineProps({
  parent_key: {
    type: String,
    require: true,
    default: [],
  }
 
});

const headerLabel = (key: any) => {
  return key[0].toUpperCase() + key.slice(1);
};

const getCategoriesEntries = () => {
  const key = route.params.parent_key;
  if (key === "new-arrivals") {
    return parentCategories;
  }

  return {
    [`${route.params.parent_key}`]:
      parentCategories[`${route.params.parent_key}`],
  };
};

const toggleChecked = (key: string, checked: boolean, id: number) => {
  // Find the category index
  const categoryIndex = parentCategories[key]?.findIndex((i) => i.id === id);
  if (categoryIndex === -1 || !parentCategories[key]) {
    console.warn("Category not found");
    return;
  }
  // Update the property directly - Vue will handle reactivity
  Object.keys(parentCategories).map((k) => {
    if (k === key) {
      parentCategories[key][categoryIndex].check = !checked;
    } else {
      parentCategories[k].map((_, index) => {
        parentCategories[k][index].check = false;
      });
    }
  });

  omitFilterData()
};

const omitFilterData = () => {
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

const resetAllChecks = (obj: ShoppingParentKey) => {
  const categories = [
    "watches",
    "bags",
    "designers",
    "accessories",
    "shoes",
    "jewelry",
  ];
  categories.forEach((category) => {
    if (obj[category] && Array.isArray(obj[category])) {
      obj[category].forEach((item) => {
        item.check = false;
      });
    }
  });
};

watch(
  () => props.parent_key,
  () => {
    resetAllChecks(parentCategories)
  }
);

const handleOnMount = async () => {
  const categories = await getCountsCategory();
  for (const [_, i] of categories.entries()) {
    const pre = {
      id: i.id,
      key: `${i.id}`,
      title: i.title,
      check: false,
      amount: i.shopping_all_items.filter(
        (s) => s.parent_key === i.parent_category
      ).length,
    } as ShoppingCategory;
    let key = parentCategories[i.parent_category];
    if (key) {
      key.push(pre);
    } else {
      categoriesRef.value.push(i.parent_category);
      parentCategories[i.parent_category] = [pre];
    }
  }

  activeCategories.value = getActiveCategory();
};

onMounted(async () => handleOnMount());
</script>
