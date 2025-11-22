<template>
  <a-flex class="container" vertical>
    <a-typography class="responsive-text">Shop Top Designers</a-typography>

    <a-row :gutter="[24, 24]">
      <a-col
        style="cursor: pointer;"
        :span="6"
        :xs="12"
        :sm="6"
        v-for="topDesign in dynamicValidateForm.topDesign"
        :key="topDesign.key"
        @click="console.log('asdasd')"
      >
        <a-image
          :src="topDesign.fileList[0].thumbUrl"
          :width="'100%'"
          :height="'auto'"
          :preview="false"
        />
        <a-typography
          style="
            line-height: 1.7em;
            padding-top: 0.5rem;
            font-size: 1rem;
            font-weight: 200;
          "
          >{{ topDesign.title }}</a-typography
        >
      </a-col>
    </a-row>
  </a-flex>
</template>

<style scoped>
/* In your global CSS or scoped <style> */
.responsive-text {
  font-size: clamp(1.35rem, 2vw, 1.6rem); /* Min: 1rem, Preferred: 2vw, Max: 1.5rem */
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
import {
  getShoppingTopDesignersPublic,
  storageTopDesign,
} from "../../services/TopDesignersService";
import type { ShoppingTopDesigners } from "../ShoppingTopDesigners.vue";

const dynamicValidateForm = reactive<{ topDesign: ShoppingTopDesigners[] }>({
  topDesign: [],
});

onMounted(async () => {
  const educations = await getShoppingTopDesignersPublic();
  for (const i of educations) {
    const imagesList = [];
    if (i.images && i.images.length > 0) {
      for (const img of i.images) {
        const tempImg = await getImageUrl(img.fileName, `${storageTopDesign}`);
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
      fileList: imagesList,
    } as ShoppingTopDesigners;
    dynamicValidateForm.topDesign.push(pre);
  }
});
</script>
