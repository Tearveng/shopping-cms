<template>
  <a-flex v-if="loading" class="loading" style="justify-content: center; align-items: center;"><a-spin /></a-flex >

  <div v-else-if="error" class="error">{{ error }}</div>

  <a-row v-else :gutter="[24, 24]">
    <a-col
      :span="6"
      :xs="12"
      :sm="12"
      :md="12"
      :lg="8"
      :xl="6"
      v-for="item in allItems.items"
      :key="item.key"
    >
      <a-flex vertical style="align-items: center; justify-content: center">
        <a-image
          style="max-width: 271px"
          :src="item.fileList[0]?.thumbUrl"
          :height="'auto'"
          :preview="false"
        />
        <a-typography
          style="
            font-size: 1rem;
            font-weight: 600;
            letter-spacing: 0.25em;
            line-height: 1.4em;
            text-transform: uppercase;
            text-align: center;
          "
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
      </a-flex>
    </a-col>
  </a-row>
</template>

<style scoped>
.image-thumbnail {
  width: 200px;
  max-width: 271px;
  height: 100%;
  object-fit: cover;
}
</style>

<script setup lang="ts">
import { onMounted, reactive, ref, watch, type PropType } from "vue";
import {
  getShoppingAllItemsPublic,
  storageAllItems,
} from "../../../../services/AllItemsService";
import { getImageUrl } from "../../../../services/BannerService";

export interface ShoppingAllItems {
  id: number | null;
  key: number;
  title: string;
  subtitle: string;
  condition: string;
  price: number;
  fileList: any[];
}

const emit = defineEmits(["filter-count"]);
const category_ids_ref = ref<any[]>([]);
const parent_key_ref = ref<any[]>([]);

const loading = ref(false);
const error = ref<string | null>(null);

const props = defineProps({
  filter: {
    type: Object as PropType<{ [k: string]: string }>,
    require: true,
    default: () => ({}),
  },
});

// Watch for filter changes to trigger re-render
watch(
  () => props.filter,
  () => {
    category_ids_ref.value = [];
    processNestedArray(Object.values(props.filter).filter((i) => i.length > 0));
    parent_key_ref.value = Object.keys(props.filter).filter(
      (i) => props.filter[i].length > 0
    );
    // The computed property will automatically update
  }
);

watch(
  [category_ids_ref, parent_key_ref],
  async () => {
    return await fetchData();
  },
  { deep: true }
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

const allItems = reactive<{ items: ShoppingAllItems[] }>({ items: [] });

const fetchData = async () => {
  loading.value = true;
  error.value = null;
  allItems.items = [];
  await getShoppingAllItemsPublic({
    category_ids: [...new Set(category_ids_ref.value)],
    parent_key: parent_key_ref.value,
    limit: 10,
  })
    .then(async (editorPicks) => {
      for (const i of editorPicks) {
        const imagesList = [];
        if (i.images && i.images.length > 0) {
          for (const img of i.images) {
            const tempImg = await getImageUrl(
              img.fileName,
              `${storageAllItems}`
            );
            imagesList.push({
              uid: img.id,
              name: img.fileName,
              status: "done",
              url: tempImg,
              thumbUrl: tempImg,
            });
          }
        }
        const pre = {
          id: i.id,
          key: new Date(`${i.created_at}`).getTime(),
          title: i.title,
          subtitle: i.subtitle,
          condition: i.condition,
          price: i.price,
          fileList: imagesList,
        } as ShoppingAllItems;
        allItems.items.push(pre);
      }
    })
    .catch(
      (err) =>
        (error.value = err instanceof Error ? err.message : "An error occurred")
    )
    .finally(() => (loading.value = false));
};

onMounted(async () => {
  await fetchData();
  emit('filter-count', allItems.items.length)
});
</script>
