<template>
  <a-flex
    v-if="isLoading"
    class="loading"
    style="justify-content: center; align-items: center"
    ><a-spin
  /></a-flex>

  <div v-if="error" class="error">{{ error.message }}</div>

  <div v-else-if="items.length < 1" class="empty-data">{{ $t("utils.no-data") }}</div>

  <a-row v-else :gutter="[24, 24]">
    <a-col
      :span="6"
      :xs="12"
      :sm="12"
      :md="12"
      :lg="8"
      :xl="6"
      v-for="item in items"
      :key="item.key"
    >
      <div
        vertical
        style="
          align-items: center;
          justify-content: center;
          cursor: pointer;
          display: flex;
          flex-direction: column;
        "
        @click="$router.push(`/p/${item.title.replace(' ', '-')}-${item.id}`)"
      >
        <a-image
          style="max-width: 271px; padding: 12px 0"
          :src="item.fileList[0]?.thumbUrl"
          :height="'auto'"
          :preview="false"
        />
        <a-typography
          class="item-title"
          :lang="detectLang(item.title)"
          >{{ item.title }}</a-typography
        >
        <a-typography
          style="
            font-size: 0.8rem;
            font-weight: 200;
            line-height: 1.7em;
            text-align: center;
          "
          >{{ item.subtitle }}</a-typography
        >
        <a-typography
          style="
            font-size: 0.8rem;
            font-weight: 200;
            line-height: 1.7em;
            color: #00000080;
          "
          >Condition: {{ item.condition }}</a-typography
        >
        <a-typography
          style="font-size: 1rem; font-weight: 500; line-height: 1.7em"
          >${{ item.price }}</a-typography
        >
      </div>
    </a-col>
  </a-row>
  <br />
  <a-flex justify="center">
    <a-button
      type="text"
      style="max-width: 10rem"
      @click="fetchNextPage"
      :disabled="!hasNextPage || isFetchingNextPage"
    >
      <span v-if="isFetchingNextPage">Loading...</span>
      <span v-else-if="hasNextPage">{{ $t("utils.load-more") }}</span>
      <span v-else>{{ $t("utils.no-more-items") }}</span>
    </a-button>
  </a-flex>
  <br />
  <br />
  <br />
</template>

<style scoped>
.image-thumbnail {
  width: 200px;
  max-width: 271px;
  height: 100%;
  object-fit: cover;
}

.empty-data {
  display: flex;
  justify-content: center;
  min-height: 750px;
}


/* English */
.item-title:lang(en) {
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 0.25em;
  line-height: 1.4em;
  text-transform: uppercase;
  text-align: center;
}

/* Khmer */
.item-title:lang(kh) {
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  line-height: 1.4em;
  text-transform: uppercase;
  text-align: center;
}
</style>

<script setup lang="ts">
import { useInfiniteQuery } from "@tanstack/vue-query";
import { computed, ref, watch, type PropType } from "vue";
import { detectLang } from "../../../helpers/detect-lang";
import { userfetchData } from "../../../hook/shopping-allitems-api";

const emit = defineEmits(["filter-count"]);
const category_ids_ref = ref<any[]>([]);
const parent_key_ref = ref<any[]>([]);
const categoryIdsValue = computed(() => categoryIds());
const parentKeyValue = computed(() => checkParentKey());

const props = defineProps({
  filter: {
    type: Object as PropType<{ [k: string]: string }>,
    required: true,
    default: () => ({}),
  },
  parent_key: {
    type: String,
    required: true,
    default: [],
  },
});

// Watch for filter changes to trigger re-render
watch(
  () => props.filter,
  () => {
    category_ids_ref.value = [];
    processNestedArray(Object.values(props.filter).filter((i) => i.length > 0));
    parent_key_ref.value = Object.keys(props.filter).filter(
      (i) => props.filter[i].length > 0,
    );
    // The computed property will automatically update
  },
);

watch(
  () => props.parent_key,
  () => {
    parent_key_ref.value = [props.parent_key];
    category_ids_ref.value = [];
  },
);

function processNestedArray(array: any[]): void {
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    if (Array.isArray(element)) {
      processNestedArray(element); // Recursive call for nested arrays
    } else {
      category_ids_ref.value.push(element.id);
    }
  }
}

function categoryIds() {
  if (parent_key_ref.value.includes("new-arrivals")) {
    return [];
  }
  return [...new Set(category_ids_ref.value)];
}

function checkParentKey() {
  if (
    parent_key_ref.value.includes("new-arrivals") ||
    (parent_key_ref.value.length < 1 && props.parent_key === "new-arrivals")
  ) {
    return [];
  } else if (parent_key_ref.value.length < 1) {
    return [props.parent_key];
  }
  return parent_key_ref.value;
}

// const allItems = reactive<{ items: ShoppingAllItems[] }>({ items: [] });
const {
  data: allItems,
  isLoading,
  error,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
} = useInfiniteQuery({
  queryKey: ["user-shopping-items", categoryIdsValue, parentKeyValue],
  queryFn: ({ pageParam = 1 }) =>
    userfetchData(
      categoryIdsValue.value,
      parentKeyValue.value,
      pageParam,
      10,
    ).then((res) => {
      emit("filter-count", res.data.length);
      return res;
    }),
  initialPageParam: 1,
  getNextPageParam: (lastPage) => lastPage.nextPage,
});

const items = computed(
  () => allItems.value?.pages.flatMap((page) => page.data) ?? [],
);
</script>
