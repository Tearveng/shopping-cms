<template>
  <a-layout
    style="
      width: 100%;
      max-width: 1280px;
      padding: 0 2rem;
      background-color: #fff;
    "
  >
    <a-breadcrumb style="justify-content: flex-start; font-size: smaller">
      <a-breadcrumb-item
        ><a href="" style="text-decoration: underline">{{
          `${itemDetail?.parent_key
            .charAt(0)
            .toUpperCase()}${itemDetail?.parent_key.substring(1)}`
        }}</a></a-breadcrumb-item
      >
      <a-breadcrumb-item>{{ itemDetail?.title }}</a-breadcrumb-item>
      <a-breadcrumb-item>{{ itemDetail?.subtitle }}</a-breadcrumb-item>
    </a-breadcrumb>
    <br />
    <div v-if="itemDetail" class="container-detail">
      <ShoppingCarousel :itemDetail="itemDetail" />
      <br />

      <div class="detail-left">
        <a-typography class="detail-title">{{
          itemDetail?.category.title
        }}</a-typography>
        <a-typography
          style="
            font-size: 1.125rem;
            font-weight: 200;
            line-height: 1.7em;
            text-align: start;
          "
          >{{ itemDetail?.subtitle }}</a-typography
        >

        <a-flex vertical gap="6" style="padding: 16px 0">
          <a-button
            type="primary"
            style="
              min-width: 13.4rem;
              min-height: 2.8rem;
              border-radius: 0;
              border: 1px solid #000;
              background-color: #fff;
              color: #000;
              font-weight: 400;
              font-size: 0.9rem;
              letter-spacing: 0.1rem;
            "
            >Add To Cart</a-button
          >
          <a-button
            type="primary"
            style="
              min-width: 13.4rem;
              min-height: 2.8rem;
              border-radius: 0;
              background-color: #000;
              color: #fff;
              font-weight: 400;
              font-size: 0.9rem;
              letter-spacing: 0.1rem;
            "
            >Buy Now</a-button
          >
        </a-flex>

        <div>
          <a-collapse v-model:activeKey="activeKey" ghost style="margin: 0">
            <a-collapse-panel key="1" header="Details">
              <p>{{ text }}</p>
            </a-collapse-panel>
            <a-collapse-panel key="2" header="Size">
              <p style="font-size: 0.9rem">{{ text }}</p>
            </a-collapse-panel>
            <a-collapse-panel key="3" header="Description">
              <p style="font-size: 0.9rem">{{ text }}</p>
            </a-collapse-panel>
          </a-collapse>
        </div>
      </div>
      <br />
    </div>
    <div v-else>loading...</div>
  </a-layout>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import ShoppingCarousel from "./ShoppingCarousel.vue";
import {
  getShoppingAllItemsById,
  storageAllItems,
} from "../../../../services/AllItemsService";
import { getLastNumber } from "../../../../util/util";
import { getImageUrl } from "../../../../services/BannerService";
import type { ShoppingItemDetail } from "../../../../types/ShoppingItemDetail";

const text = `A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`;
const route = useRoute();
const activeKey = ref(["1"]);

const itemDetail = ref<ShoppingItemDetail>();

onMounted(async () => {
  const id = getLastNumber(route.path);
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
        condition: item.condition,
        price: item.price,
        fileList: imagesList,
      };
    }
  }
});
</script>
<style scoped>
.carousel {
  --vc-pgn-background-color: rgba(255, 255, 255, 0.7);
  --vc-pgn-active-color: rgba(255, 255, 255, 1);
  --vc-nav-background: rgba(255, 255, 255, 0.7);
  --vc-nav-border-radius: 100%;
}
.carousel__wrapper {
  height: 370px;
  overflow: hidden;
  max-width: 1216px;
  padding: 2px;
}
:deep(.ant-collapse-item) {
  border-bottom: 1px solid #d3d3d3;
}
:deep(.ant-collapse-item .ant-collapse-header) {
  padding-left: 0;
  letter-spacing: 0.1rem;
  padding-right: 0;
}
:deep(.ant-collapse-header .ant-collapse-header-text) {
  font-weight: 600;
}
.detail-title {
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: 0.25em;
  line-height: 1.4em;
  text-transform: uppercase;
  text-align: start;
}
.container-detail {
  display: flex;
}
.detail-left {
  width: 100%;
  padding-left: 10rem;
}

@media (max-width: 768px) {
  .detail-title {
    font-size: 0.9rem;
  }
  .container-detail {
    display: flex;
    flex-direction: column;
    padding: 0;
  }
  .detail-left {
    padding-left: 0;
  }
}
</style>
