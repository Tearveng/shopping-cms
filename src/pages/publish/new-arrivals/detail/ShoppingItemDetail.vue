<template>
  <a-layout
    style="
      width: 100%;
      max-width: 1280px;
      padding: 0 2rem;
      background-color: #fff;
    "
  >
    <a-breadcrumb style="justify-content: flex-start">
      <a-breadcrumb-item
        ><a href="" style="text-decoration: underline">{{
          itemDetail?.parent_key
        }}</a></a-breadcrumb-item
      >
      <a-breadcrumb-item>{{ itemDetail?.title }}</a-breadcrumb-item>
    </a-breadcrumb>
    <br />
    <a-row v-if="itemDetail" :gutter="[24, 24]">
      <a-col :span="12">
        <div
          vertical
          style="
            position: relative;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            display: flex;
            flex-direction: column;
          "
        >
          <a-image
            style="width: 596px"
            :src="itemDetail?.fileList[0]?.thumbUrl"
            :height="'auto'"
            :preview="false"
          />
          <div class="carousel__wrapper">
            <Carousel v-bind="config" ref="carouselRef">
              <Slide v-for="item in itemDetail.fileList" :key="item.key">
                <a-flex
                  vertical
                  style="
                    max-width: 190px;
                    align-items: center;
                    justify-content: center;
                  "
                >
                  <a-image
                    :src="item.thumbUrl"
                    style="max-width: 105px"
                    :width="'100%'"
                    :height="'auto'"
                    :preview="false"
                  />
                </a-flex>
              </Slide>

              <template #addons>
                <CarouselNavigation>
                  <a-flex
                    justify="center"
                    align="center"
                    v-if="carouselRef"
style="background-color: red; position: absolute; top: 50px;"
                    ><a-button
                      @click="
                        () => {
                          carouselRef.slideTo(
                            carouselRef.visibleRange.min -
                              1 -
                              (carouselRef.visibleRange.max -
                                carouselRef.visibleRange.min),
                            false
                          );
                          carouselRef.updateSlideSize();
                        }
                      "
                      type="link"
                      style="color: #000; left: 0; position: absolute;"
                    >
                      <template #icon><LeftOutlined /></template>
                    </a-button>
                    <a-typography
                      style="
                        font-size: 0.8rem;
                        font-weight: 500;
                        line-height: 1.7em;
                      "
                      >Showing {{ carouselRef.visibleRange.min + 1 }}-{{
                        carouselRef.visibleRange.max + 1
                      }}
                      of {{ itemDetail.fileList.length }} items</a-typography
                    >
                    <a-button
                      @click="
                        () => {
                          if (
                            carouselRef.visibleRange.max ===
                            (itemDetail?.fileList.length ?? 0) - 1
                          )
                            return;
                          carouselRef.slideTo(
                            carouselRef.visibleRange.min +
                              1 +
                              (carouselRef.visibleRange.max -
                                carouselRef.visibleRange.min),
                            false
                          );
                          carouselRef.updateSlideSize();
                        }
                      "
                      type="link"
                      style="color: #000"
                    >
                      <template #icon><RightOutlined /></template> </a-button
                  ></a-flex>
                </CarouselNavigation>
              </template>
            </Carousel>
          </div>
        </div>
      </a-col>
      <a-col :span="6">
        <div
          vertical
          style="
            align-items: center;
            justify-content: center;
            cursor: pointer;
            display: flex;
            flex-direction: column;
          "
        >
          <a-image
            style="max-width: 271px"
            :src="itemDetail?.fileList[0]?.thumbUrl"
            :height="'auto'"
            :preview="false"
          />
        </div>
      </a-col>
    </a-row>
    <div v-else>loading ...</div>
  </a-layout>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { LeftOutlined, RightOutlined } from "@ant-design/icons-vue";
import { Carousel, Slide } from "vue3-carousel";
import {
  getShoppingAllItemsById,
  storageAllItems,
} from "../../../../services/AllItemsService";
import { getLastNumber } from "../../../../util/util";
import type { ShoppingAllItems } from "../items/ShoppingAllItems.vue";
import { getImageUrl } from "../../../../services/BannerService";

const route = useRoute();

export interface ShoppingItemDetail extends ShoppingAllItems {
  category: {
    id: number;
    created_at: string;
    images: Object[];
    parent_category: string;
    title: string;
    user_id: string;
  };
}

const config = {
  height: 130,
  itemsToShow: 5,
  gap: 5,
  snapAlign: "center",

  // 'breakpointMode' determines how the carousel breakpoints are calculated
  // Acceptable values: 'viewport' (default) | 'carousel'
  // 'viewport' - breakpoints are based on the viewport width
  // 'carousel' - breakpoints are based on the carousel width
  breakpointMode: "carousel",

  // Breakpoints are mobile-first
  // Any settings not specified will fall back to the carousel's default settings
  breakpoints: {
    300: {
      itemsToShow: 5,
      snapAlign: "start",
    },
    575: {
      itemsToShow: 5,
      snapAlign: "start",
    },
    768: {
      itemsToShow: 4,
      snapAlign: "start",
    },
    992: {
      itemsToShow: 5,
      snapAlign: "start",
    },
  },
} as any;

const carouselRef = ref<any>(null);
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
        category: item.category,
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
</style>

