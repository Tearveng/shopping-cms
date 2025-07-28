<template>
  <a-flex class="container" vertical>
    <a-typography class="responsive-text">Editor's picks</a-typography>
    <div class="carousel__wrapper">
      <Carousel v-bind="config" ref="carouselRef">
        <Slide v-for="product in productCategories" :key="product.key">
          <a-flex
            vertical
            style="
              max-width: 190px;
              align-items: center;
              justify-content: center;
            "
          >
            <a-image
              :src="product.fileList[0].thumbUrl"
              style="max-width: 190px"
              :width="'100%'"
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
              "
              >{{ product.title }}</a-typography
            >
            <a-typography
              style="
                font-size: 0.8rem;
                font-weight: 200;
                line-height: 1.7em;
                text-align: center;
              "
              >{{ product.subtitle }}</a-typography
            >
            <a-typography
              style="
                font-size: 0.8rem;
                font-weight: 200;
                line-height: 1.7em;
                color: #00000080;
              "
              >Condition: {{ product.condition }}</a-typography
            >
            <a-typography
              style="font-size: 1rem; font-weight: 500; line-height: 1.7em"
              >${{ product.price }}</a-typography
            >
          </a-flex>
        </Slide>

        <template #addons>
          <CarouselNavigation>
            <a-flex justify="center" align="center" v-if="carouselRef"
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
                style="color: #000"
              >
                <template #icon><LeftOutlined /></template>
              </a-button>
              <a-typography
                style="font-size: 0.8rem; font-weight: 500; line-height: 1.7em"
                >Showing {{ carouselRef.visibleRange.min + 1 }}-{{
                  carouselRef.visibleRange.max + 1
                }}
                of {{ productCategories.length }} items</a-typography
              >
              <a-button
                @click="
                  () => {
                    if (
                      carouselRef.visibleRange.max ===
                      productCategories.length - 1
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
  </a-flex>
</template>

<style scoped>
.responsive-title {
  font-size: clamp(1.12rem, 2vw, 1.35rem);
  line-height: 1.4em;
  font-weight: 400;
}
/* In your global CSS or scoped <style> */
.responsive-text {
  font-size: clamp(
    1.35rem,
    2vw,
    1.6rem
  ); /* Min: 1rem, Preferred: 2vw, Max: 1.5rem */
  font-weight: 500;
}
.container {
  max-width: 1280px;
  padding: 2rem;
  align-items: center;
}
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
@media (max-width: 575px) {
  .container {
    padding: 3rem 1rem;
  }
}
</style>

<script setup lang="ts">
import { ref } from "vue";
import { LeftOutlined, RightOutlined } from "@ant-design/icons-vue";
import { Carousel, Slide } from "vue3-carousel";
import { onMounted } from "vue";
import { getImageUrl } from "../../services/BannerService";
import {
  getShoppingEditorPicksPublic,
  storageEditorPick,
} from "../../services/EditorPickService";
import type { ShoppingEditorPick } from "../ShoppingEditorPicks.vue";

const config = {
  height: 340,
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
      itemsToShow: 2,
      snapAlign: "start",
    },
    575: {
      itemsToShow: 3,
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
const productCategories = ref<ShoppingEditorPick[]>([
  // {
  //   id: 102,
  //   image:
  //     "https://prod-images.fashionphile.com/thumb/c251059551c6aa53ca7565fc0f935bd5/5ce55312ddd7f8e30d22b06c6236fefc.jpg",
  //   name: "CHANEL",
  //   description: "Chanel",
  //   condition: "Excellent",
  //   price: 8995,
  // },
  // {
  //   id: 101,
  //   image:
  //     "https://prod-images.fashionphile.com/thumb/1effa6b0752cae6bf63e64532ef5baa8/7d43f2f95cf2a4065bd99c68a86ffb81.jpg",
  //   name: "HERMES",
  //   description: "Epsom Birkin 30 Flamingo",
  //   condition: "Shows Wear",
  //   price: 599.99,
  // },
  // {
  //   id: 102,
  //   image:
  //     "https://prod-images.fashionphile.com/thumb/c251059551c6aa53ca7565fc0f935bd5/5ce55312ddd7f8e30d22b06c6236fefc.jpg",
  //   name: "CHANEL",
  //   description: "Chanel",
  //   condition: "Excellent",
  //   price: 8995,
  // },
  // {
  //   id: 101,
  //   image:
  //     "https://prod-images.fashionphile.com/thumb/1effa6b0752cae6bf63e64532ef5baa8/7d43f2f95cf2a4065bd99c68a86ffb81.jpg",
  //   name: "HERMES",
  //   description: "Epsom Birkin 30 Flamingo",
  //   condition: "Shows Wear",
  //   price: 599.99,
  // },
  // {
  //   id: 102,
  //   image:
  //     "https://prod-images.fashionphile.com/thumb/c251059551c6aa53ca7565fc0f935bd5/5ce55312ddd7f8e30d22b06c6236fefc.jpg",
  //   name: "CHANEL",
  //   description: "Chanel",
  //   condition: "Excellent",
  //   price: 8995,
  // },
  // {
  //   id: 101,
  //   image:
  //     "https://prod-images.fashionphile.com/thumb/1effa6b0752cae6bf63e64532ef5baa8/7d43f2f95cf2a4065bd99c68a86ffb81.jpg",
  //   name: "HERMES",
  //   description: "Epsom Birkin 30 Flamingo",
  //   condition: "Shows Wear",
  //   price: 599.99,
  // },
  // {
  //   id: 102,
  //   image:
  //     "https://prod-images.fashionphile.com/thumb/c251059551c6aa53ca7565fc0f935bd5/5ce55312ddd7f8e30d22b06c6236fefc.jpg",
  //   name: "CHANEL",
  //   description: "Chanel",
  //   condition: "Excellent",
  //   price: 8995,
  // },
  // {
  //   id: 101,
  //   image:
  //     "https://prod-images.fashionphile.com/thumb/1effa6b0752cae6bf63e64532ef5baa8/7d43f2f95cf2a4065bd99c68a86ffb81.jpg",
  //   name: "HERMES",
  //   description: "Epsom Birkin 30 Flamingo",
  //   condition: "Shows Wear",
  //   price: 599.99,
  // },
  // {
  //   id: 102,
  //   image:
  //     "https://prod-images.fashionphile.com/thumb/c251059551c6aa53ca7565fc0f935bd5/5ce55312ddd7f8e30d22b06c6236fefc.jpg",
  //   name: "CHANEL",
  //   description: "Chanel",
  //   condition: "Excellent",
  //   price: 8995,
  // },
  // {
  //   id: 101,
  //   image:
  //     "https://prod-images.fashionphile.com/thumb/1effa6b0752cae6bf63e64532ef5baa8/7d43f2f95cf2a4065bd99c68a86ffb81.jpg",
  //   name: "HERMES",
  //   description: "Epsom Birkin 30 Flamingo",
  //   condition: "Shows Wear",
  //   price: 599.99,
  // },
  // {
  //   id: 102,
  //   image:
  //     "https://prod-images.fashionphile.com/thumb/c251059551c6aa53ca7565fc0f935bd5/5ce55312ddd7f8e30d22b06c6236fefc.jpg",
  //   name: "CHANEL",
  //   description: "Chanel",
  //   condition: "Excellent",
  //   price: 8995,
  // },
  // {
  //   id: 101,
  //   image:
  //     "https://prod-images.fashionphile.com/thumb/1effa6b0752cae6bf63e64532ef5baa8/7d43f2f95cf2a4065bd99c68a86ffb81.jpg",
  //   name: "HERMES",
  //   description: "Epsom Birkin 30 Flamingo",
  //   condition: "Shows Wear",
  //   price: 599.99,
  // },
  // {
  //   id: 102,
  //   image:
  //     "https://prod-images.fashionphile.com/thumb/c251059551c6aa53ca7565fc0f935bd5/5ce55312ddd7f8e30d22b06c6236fefc.jpg",
  //   name: "CHANEL",
  //   description: "Chanel",
  //   condition: "Excellent",
  //   price: 8995,
  // },
  // {
  //   id: 101,
  //   image:
  //     "https://prod-images.fashionphile.com/thumb/1effa6b0752cae6bf63e64532ef5baa8/7d43f2f95cf2a4065bd99c68a86ffb81.jpg",
  //   name: "HERMES",
  //   description: "Epsom Birkin 30 Flamingo",
  //   condition: "Shows Wear",
  //   price: 599.99,
  // },
]);

// const handleAfterChange = (current) => {
//   currentPage.value = current;
// };

// const goToPage = (pageNumber: number) => {
//   if (pageNumber >= 0 && pageNumber < 3) {
//     currentPage.value = pageNumber;
//     carouselRef.value.goTo(pageNumber);
//   }
// };

// const nextPage = () => carouselRef.next();

// const prevPage = () => {
//   if (currentPage.value > 0) {
//     currentPage.value--;
//     carouselRef.value.prev();
//   }
// };
onMounted(async () => {
  const editorPicks = await getShoppingEditorPicksPublic();
  for (const i of editorPicks) {
    const imagesList = [];
    if (i.images && i.images.length > 0) {
      for (const img of i.images) {
        const tempImg = await getImageUrl(img.fileName, `${storageEditorPick}`);
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
    } as ShoppingEditorPick;
    productCategories.value.push(pre);
  }
});
</script>
