<template>
  <a-flex vertical gap="24">
    <a-typography-text>Education</a-typography-text>
    <a-flex vertical gap="24">
      <a-flex
        gap="24"
        vertical
        v-for="experience in dynamicValidateForm.educations"
        :key="experience.key"
      >
        <a-flex>
          <a-flex style="min-width: 130px" gap="12">
            <a-typography-text style="color: dimgrey">{{
              experience.dateRange[0].split("-")[0]
            }}</a-typography-text>
            <div
              style="
                width: 12px;
                height: 1.5px;
                margin-top: 11px;
                background-color: dimgrey;
              "
            ></div>
            <a-typography-text style="color: dimgrey">
              {{
                Number(experience.dateRange[1].split("-")[0]) ===
                new Date(Date.now()).getFullYear()
                  ? "Now"
                  : experience.dateRange[1].split("-")[0]
              }}</a-typography-text
            >
          </a-flex>
          <a-flex vertical>
            <a-badge style="margin-bottom: 5px" :offset="[10, -4]">
              <template #count>
                <ArrowRightOutlined
                  style="
                    margin-top: 0;
                    font-size: 11px;
                    transform: rotate(-45deg);
                  "
                />
              </template>
              <a :href="experience.link" target="_blank">
                <a-typography-text>{{ experience.alias }}</a-typography-text></a
              >
            </a-badge>
            <a-typography-text style="color: dimgrey">{{ experience.description }} </a-typography-text>
          </a-flex>
        </a-flex>
        <a-flex class="image-responsive" style="overflow-x: auto" gap="12">
          <a-flex v-for="file in experience.fileList" :key="file.uid">
            <a-image
              style="border-radius: 8px; object-fit: cover"
              :width="150"
              :height="90"
              :src="file.thumbUrl"
            />
          </a-flex>
        </a-flex>
      </a-flex>
    </a-flex>
  </a-flex>
</template>

<style scoped>
.image-responsive {
  margin-left: 130px;
}

a:hover {
  text-decoration: underline;
  text-decoration-color: #333; /* Ant Design primary blue */
  text-underline-offset: 6px; /* Space between icon/text and underline */
}

@media (max-width: 575px) {
  .image-responsive {
    margin: 0;
    scrollbar-width: none;
  }
}
</style>

<script setup lang="ts">
import { ArrowRightOutlined } from "@ant-design/icons-vue";
import { onMounted, reactive } from "vue";
import { getEducations } from "../../services/EducationService";
import { getImageUrl } from "../../services/WorkService";
import { type Education } from "../Education.vue";
const props = defineProps({
  user_id: String,
});

const dynamicValidateForm = reactive<{ educations: Education[] }>({
  educations: [],
});

onMounted(async () => {
  const educations = await getEducations(`${props.user_id}`);
  for (const i of educations) {
    const imagesList = [];
    if (i.images && i.images.length > 0) {
      for (const img of i.images) {
        const tempImg = await getImageUrl(img.fileName, `${props.user_id}`);
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
      dateRange: [i.start_date, i.end_date],
      link: i.link,
      alias: i.alias,
      description: i.description,
      fileList: imagesList,
    } as Education;
    dynamicValidateForm.educations.push(pre);
  }
});
</script>
