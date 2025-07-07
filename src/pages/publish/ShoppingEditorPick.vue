<template>
  <a-flex class="container" vertical >
    <a-typography class="responsive-text">Editor's picks</a-typography>
    <a-carousel
      ref="carouselRef"
      arrows
      v-model:current="currentPage"
      :afterChange="handleAfterChange"
    >
      <!-- Loop through pages -->
      <div
        v-for="(page, pageIndex) in paginatedProducts"
        :key="pageIndex"
        class="carousel-page"
      >
        <!-- Loop through products in current page -->
        <a-row :gutter="16" type="flex" justify="space-around">
          <a-col
            v-for="(product, productIndex) in page"
            :key="productIndex"
            :span="4"
          >
            <a-flex vertical>
              <a-image
                src="https://prod-images.fashionphile.com/thumb/c2477c3368a156629964a518c7458b90/ad70f75ed52b7d16807f6bdda82ab9b6.jpg"
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
                >hermes</a-typography
              >
              <a-typography
                style="font-size: 0.8rem; font-weight: 200; line-height: 1.7em"
                >Negonda Garden Party 30 TPM Bleu Zellige</a-typography
              >
              <a-typography
                style="
                  font-size: 0.8rem;
                  font-weight: 200;
                  line-height: 1.7em;
                  color: #00000080;
                "
                >Condition: Show Wear</a-typography
              >
              <a-typography
                style="font-size: 1rem; font-weight: 500; line-height: 1.7em"
                >$3,695</a-typography
              >
            </a-flex>
          </a-col>
        </a-row>
      </div>
    </a-carousel>

    <!-- Custom pagination controls -->
    <a-flex style="align-items: center">
      <a-button @click="prevPage" :disabled="currentPage === 0" type="ghost">
        <template #icon><left-outlined /></template>
      </a-button>
      <a-typography
        style="
          font-size: .8rem;
          font-weight: 500;
          line-height: 1.7em;
        "
        >Showing 1-5 of 15 items</a-typography
      >
      <a-button @click="nextPage" :disabled="currentPage === 2" type="ghost">
        <template #icon><right-outlined /></template>
      </a-button>
    </a-flex>
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
  padding-bottom: 2rem;
}
.container {
  max-width: 1280px;
  padding: 2rem;
  align-items: center;
}
:deep(.slick-slide) {
  text-align: center;
  height: 340px;
  line-height: 160px;
  overflow: hidden;
}
/* Hide dots */
:deep(.ant-carousel .slick-dots) {
  display: none !important;
}

.ant-carousel {
  width: 100%;
  height: 340px; /* Set explicit height */
}
.slick-slide {
  display: none;
  text-align: center;
  overflow: hidden;
}
</style>

<script setup lang="ts">
import { ref, computed } from "vue";
import { LeftOutlined, RightOutlined } from "@ant-design/icons-vue";

// Sample product data (replace with your actual data)
const products = ref(
  Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    price: (19.99 + i).toFixed(2),
    image: `https://picsum.photos/300/200?random=${i}`,
    description: `Description for product ${i + 1}`,
  }))
);

const carouselRef = ref(null);
const currentPage = ref(0);
const itemsPerPage = 5;

// Split products into pages of 5 items each
const paginatedProducts = computed(() => {
  const pages = [];
  for (let i = 0; i < products.value.length; i += itemsPerPage) {
    pages.push(products.value.slice(i, i + itemsPerPage));
  }
  // Ensure we have exactly 3 pages (pad with empty items if needed)
  while (pages.length < 3) {
    pages.push([]);
  }
  return pages.slice(0, 3); // Only take first 3 pages
});

const handleAfterChange = (current) => {
  currentPage.value = current;
};

const goToPage = (pageNumber: number) => {
  if (pageNumber >= 0 && pageNumber < 3) {
    currentPage.value = pageNumber;
    carouselRef.value.goTo(pageNumber);
  }
};

const nextPage = () => {
  if (currentPage.value < 2) {
    currentPage.value++;
    carouselRef.value.next();
  }
};

const prevPage = () => {
  if (currentPage.value > 0) {
    currentPage.value--;
    carouselRef.value.prev();
  }
};
</script>
