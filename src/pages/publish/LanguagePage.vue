<template>
  <a-flex vertical gap="24">
    <a-typography-text>Language</a-typography-text>
    <a-flex vertical gap="24">
      <a-flex
        gap="24"
        vertical
        v-for="language in dynamicValidateForm.languages"
        :key="language.key"
      >
        <a-flex>
          <a-typography-text style="min-width: 150px; color: dimgrey"
            >{{ language.title }}
          </a-typography-text>
          <a-badge :offset="[10, -4]">
            <template #count>
              <ArrowRightOutlined
                style="
                  margin-top: 0;
                  font-size: 11px;
                  transform: rotate(-45deg);
                "
              />
            </template>
            <a-typography-text>{{ language.alias }}</a-typography-text>
          </a-badge>
        </a-flex>
      </a-flex>
    </a-flex>
  </a-flex>
</template>

<style scoped>
a:hover {
  text-decoration: underline;
  text-decoration-color: #333; /* Ant Design primary blue */
  text-underline-offset: 6px; /* Space between icon/text and underline */
}
</style>

<script setup lang="ts">
import { ArrowRightOutlined } from "@ant-design/icons-vue";
import { onMounted, reactive } from "vue";
import { getLanguages } from "../../services/LanguageService";
import { type Language } from "../Language.vue";
const props = defineProps({
  user_id: String,
});

const dynamicValidateForm = reactive<{ languages: Language[] }>({
  languages: [],
});

onMounted(async () => {
  const contacts = await getLanguages(`${props.user_id}`);
  contacts.map((i) => {
    const pre = {
      id: i.id,
      title: i.title,
      key: new Date(`${i.created_at}`).getTime(),
      alias: i.alias,
    } as Language;
    dynamicValidateForm.languages.push(pre);
  });
});
</script>
