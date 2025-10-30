<template>
  <div style="max-width: 450px; padding: 20px">
    <a-typography class="detail-title">{{ route.query.type }}:</a-typography>

    <br />

    <QuillEditor
      v-model:content="content"
      theme="snow"
      content-type="html"
      :options="editorOptions"
      @ready="onEditorReady"
    />

    <br />

    <a-button> Cancel </a-button>
    <a-button
      type="primary"
      style="margin-left: 10px"
      html-type="submit"
      :loading="isLoading"
      @click="save"
      >Submit</a-button
    >
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import {
  getShoppingAllItemsById,
  storageAllItems,
  updateShoppingAllItems,
  type IShoppingAllItems,
} from "../../services/AllItemsService";
import { getLastNumber } from "../../util/util";
import { getImageUrl } from "../../services/BannerService";
import type { ShoppingItemDetail } from "../../types/ShoppingItemDetail";
import { message } from "ant-design-vue";
import { useAuthStore } from "../../stores/auth";

const route = useRoute();
const auth = useAuthStore();

const itemDetail = ref<ShoppingItemDetail>();
const content = ref(""); // Initial content
const isLoading = ref(false);

const editorOptions = ref({ readOnly: false });

const onEditorReady = (quill: any) => {
  console.log("Editor is ready!", quill);
};

const update = () => {
  message.success("Updated successfully", 5);
};

const errors = (msg: string) => {
  message.error(msg, 5);
};

const save = () => {
  isLoading.value = true;
  if (itemDetail.value && auth.user) {
    const newData = {
      id: itemDetail.value.id,
      title: itemDetail.value.title,
      subtitle: itemDetail.value.subtitle,
      condition: itemDetail.value.condition,
      price: itemDetail.value.price,
      user_id: auth.user.id,
    } as IShoppingAllItems;
    try {
      updateShoppingAllItems({
        ...newData,
        [`${route.query.type}`.toLowerCase()]: content.value,
      })
        .then(() => {
          update();
        })
        .catch((e) => errors(e))
        .finally();
    } catch (error) {
      console.log("error", error);
    } finally {
      isLoading.value = false;
    }
  }
};

onMounted(async () => {
  const id = getLastNumber(route.path);
  const { type } = route.query;
  if (id) {
    const item = await getShoppingAllItemsById(id);
    if (item) {
      const imagesList = [];
      if (item.images && item.images.length > 0) {
        for (const img of item.images) {
          const tempImg = await getImageUrl(img.fileName, `${storageAllItems}`);
          imagesList.push({
            uid: img.id,
            name: img.fileName,
            status: "done",
            url: tempImg,
            thumbUrl: tempImg,
          });
        }
      }
      itemDetail.value = {
        category: item.category!,
        id: item.id!,
        parent_key: item.parent_key,
        key: new Date(`${item.created_at}`).getTime(),
        title: item.title,
        subtitle: item.subtitle,
        size: item.size,
        details: item.details,
        condition: item.condition,
        price: item.price,
        fileList: imagesList,
      };
      if (type === "Size") {
        content.value = item.size;
      } else {
        content.value = item.details;
      }
    }
  }
});
</script>
<style scoped>
@media (max-width: 1200px) {
  .detail-right {
    padding-left: 2rem;
  }
}

@media (max-width: 820px) {
  .detail-title {
    font-size: 0.9rem;
  }

  .container-detail {
    display: flex;
    flex-direction: column;
    padding: 0;
  }

  .detail-right {
    padding-left: 0;
  }
}
</style>
