<template>
  <a-flex vertical gap="24">
    <a-typography-text>Project Experience</a-typography-text>
    <a-flex vertical gap="24">
      <a-flex
        gap="24"
        vertical
        v-for="experience in dynamicValidateForm.experiences"
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
              {{ experience.dateRange[1].split("-")[0] }}</a-typography-text
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
            <a-typography-text>{{ experience.description }} </a-typography-text>
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
import { getProjectExperiences } from "../../services/ProjectService";
import { getImageUrl } from "../../services/WorkService";
import { type ProjectExperience } from "../Project.vue";
const props = defineProps({
  user_id: String,
});

const dynamicValidateForm = reactive<{ experiences: ProjectExperience[] }>({
  experiences: [],
});

console.log("dynamicValidateForm.experiences", dynamicValidateForm.experiences);

onMounted(async () => {
  const workExperiences = await getProjectExperiences(`${props.user_id}`);
  for (const i of workExperiences) {
    const imagesList = [];
    if (i.images && i.images.length > 0) {
      for (const img of i.images) {
        const tempImg = await getImageUrl(img.fileName, `${props.user_id}`);
        console.log("tempImg", tempImg);
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
    } as ProjectExperience;
    dynamicValidateForm.experiences.push(pre);
  }
});
</script>
