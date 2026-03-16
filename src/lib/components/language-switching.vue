<template>
  <a-select
    ref="select"
    v-model:value="language"
    :options="options"
    class="transparent-select"
    @focus="focus"
    @change="handleChange"
  >
  </a-select>
</template>

<style scoped>
.transparent-select :deep(.ant-select-selector) {
  background: transparent;
  border: none;
  box-shadow: none;
}

.transparent-select :deep(.ant-select-focused .ant-select-selector) {
  box-shadow: none;
}
</style>

<script lang="ts" setup>
import type { SelectProps } from "ant-design-vue";
import { h, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import { i18n } from "../../main";
import { LOCALES, LOCALES_REVERSE } from "../../router";

const { locale } = useI18n()
const router = useRouter();
const route = useRoute();
const language = ref(LOCALES[localStorage.getItem("i18next-lang") as string]);
const options = ref<SelectProps["options"]>([
  {
    value: "en",
    label: h("span", ["🇬🇧   ", "English" ]),
  },
  {
    value: "kh",
    label: h("span", ["🇰🇭   ", "Khmer" ]),
  },
]);

const focus = () => {
  console.log("focus");
};

const handleChange = (value: string) => {
  localStorage.setItem("i18next-lang", LOCALES_REVERSE[value]);
  i18n.global.locale.value = value as any;

  // 2️⃣ update route locale
  router.push({
    name: route.name as string,
    params: {
      ...route.params,
      locale: value,
    },
    query: route.query,
  });
};

onMounted(() => {
  language.value = (locale as any).value
  localStorage.setItem("i18next-lang", LOCALES_REVERSE[(locale as any).value]);
})
</script>
