<template>
  <a-flex vertical gap="24">
    <a-typography-text>Contact</a-typography-text>
    <a-flex vertical gap="24">
      <a-flex
        gap="24"
        vertical
        v-for="(contact) in dynamicValidateForm.contacts"
        :key="contact.key"
      >
        <a-flex>
          <a-typography-text style="min-width: 150px; color: dimgrey"
            >{{ contact.title }}
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
            <a :href="`https://${contact.url}`" target="_blank"
              ><a-typography-text>{{ contact.alias }}</a-typography-text></a
            >
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
import { getContacts } from "../../services/ContactService";
import type { Contact } from "../Contact.vue";
const props = defineProps({
  user_id: String,
})

const dynamicValidateForm = reactive<{ contacts: Contact[] }>({
  contacts: [],
});

onMounted(async () => {
  const contacts = await getContacts(`${props.user_id}`);
  contacts.map((i) => {
    const pre = {
      id: i.id,
      title: i.title,
      key: new Date(`${i.created_at}`).getTime(),
      alias: i.alias,
      url: i.url,
    } as Contact;
    dynamicValidateForm.contacts.push(pre);
  });
});
</script>
