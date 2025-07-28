<template>
  <a-flex class="container" vertical>
    <a-typography class="responsive-text">Feature Collections</a-typography>

    <a-row :gutter="[24, 48]">
      <a-col
        :span="6"
        :xs="24"
        :sm="8"
        v-for="featureCollection in dynamicValidateForm.featureCollection"
        :key="featureCollection.key"
      >
        <a-image
          :src="featureCollection.fileList[0].thumbUrl"
          :width="'100%'"
          :height="'auto'"
          :preview="false"
        />
        <a-flex style="padding: 16px 24px 0 0" vertical>
          <a-typography class="responsive-title"
            >{{ featureCollection.title }}</a-typography
          >
          <a-typography
            style="
              line-height: 1.7em;
              padding-top: 0.5rem;
              font-size: 1rem;
              font-weight: 200;
            "
            >{{ featureCollection.slogan }}</a-typography
          >
          <a-typography
            style="
              line-height: 1.7em;
              padding-top: 0.5rem;
              font-size: 1rem;
              font-weight: 200;
            "
            >{{ featureCollection.subtitle }}</a-typography
          >
        </a-flex>
      </a-col>
    </a-row>
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
  padding: 3rem 2rem;
  align-items: center;
}
@media (max-width: 575px) {
  .container {
    padding: 3rem 1rem;
  }
}
</style>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { getImageUrl } from "../../services/BannerService";
import type { ShoppingFeatureCollection } from "../ShoppingFeatureCollections.vue";
import {
  getShoppingFeatureCollectionsPublic,
  storageFeatureCollection,
} from "../../services/FeatureCollectionService";

const props = defineProps({
  user_id: String,
});

const dynamicValidateForm = reactive<{
  featureCollection: ShoppingFeatureCollection[];
}>({
  featureCollection: [],
});

onMounted(async () => {
  const educations = await getShoppingFeatureCollectionsPublic();
  for (const i of educations) {
    const imagesList = [];
    if (i.images && i.images.length > 0) {
      for (const img of i.images) {
        const tempImg = await getImageUrl(
          img.fileName,
          `${storageFeatureCollection}`
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
      slogan: i.slogan,
      subtitle: i.subtitle,
      fileList: imagesList,
    } as ShoppingFeatureCollection;
    dynamicValidateForm.featureCollection.push(pre);
  }
});
</script>
