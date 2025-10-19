<template>
  <!-- <pre> {{ JSON.stringify(props.itemDetail, null, 2) }}</pre> -->
  <!-- <a-flex direction="vertical"> -->
  <div style="max-width: 569px">
    <Carousel
      id="gallery"
      v-bind="galleryConfig"
      v-model="currentSlide"
      slideEffect="fade"
    >
      <Slide v-for="image in props.itemDetail.fileList" :key="image.id">
        <img :src="image.url" :alt="image.name" class="gallery-image" />
      </Slide>
    </Carousel>

    <Carousel id="thumbnails" v-bind="thumbnailsConfig" v-model="currentSlide">
      <Slide v-for="image in props.itemDetail.fileList" :key="image.id">
        <template #default="{ currentIndex, isActive }">
          <div
            :class="['thumbnail', { 'is-active': isActive }]"
            @click="slideTo(currentIndex)"
          >
            <img
              :src="image.thumbUrl"
              :alt="image.name"
              class="thumbnail-image"
            />
          </div>
        </template>
      </Slide>

      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </div>
  <!-- </a-flex> -->
  <br />
</template>

<script lang="ts" setup>
import "vue3-carousel/carousel.css";
import { Carousel, Slide, Navigation } from "vue3-carousel";
import { ref, type PropType } from "vue";
import type { ShoppingItemDetail } from "../../../../types/ShoppingItemDetail";

const currentSlide = ref(0);

const slideTo = (nextSlide: any) => (currentSlide.value = nextSlide);

const galleryConfig = {
  itemsToShow: 1,
  wrapAround: true,
  slideEffect: "fade",
  mouseDrag: false,
  touchDrag: false,
};

const thumbnailsConfig = {
  breakpoints: {
    300: {
      itemsToShow: 3,
      height: 110,
      snapAlign: "center",
      gap: 2,
    },
    400: {
      itemsToShow: 4,
      height: 110,
      snapAlign: "center",
      gap: 4,
    },
    500: {
      itemsToShow: 6,
      height: 110,
      snapAlign: "start",
    },
  },
} as any;

const props = defineProps({
  itemDetail: {
    type: Object as PropType<ShoppingItemDetail>,
    require: true,
    default: {},
  },
});
</script>

<style>
.carousel {
  --vc-nav-background: rgba(255, 255, 255, 0.7);
  --vc-nav-border-radius: 100%;
}

.gallery-image {
  border-radius: 8px;
  max-width: 596px;
  max-height: 596px;
  object-fit: cover;
}

.thumbnail-image {
  width: 80px;
  height: auto;
}

#thumbnails {
  margin-top: 10px;
}

.thumbnail {
  height: 100%;
  width: 100%;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.3s ease-in-out;
}

.thumbnail.is-active,
.thumbnail:hover {
  opacity: 1;
}

@media (width < 475px) {
  .thumbnail-image {
    width: 88px;
  }
}

@media (width < 376px) {
  .thumbnail-image {
    width: 100px;
  }
}

@media (max-width: 768px) {
  .gallery-image {
    border-radius: 8px;
    max-width: 382px;
    max-height: 382px;
    object-fit: cover;
  }
}
</style>
