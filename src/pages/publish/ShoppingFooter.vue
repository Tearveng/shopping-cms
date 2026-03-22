<template>
  <a-layout-footer class="custom-footer">
    <div class="footer-content">
      <div class="footer-section" v-for="(group, title) in groupedContacts" :key="title">
        <h3>{{ mappingTitle(title.toLowerCase()) }}</h3>
        <a-flex vertical align="flex-start">
          <div v-for="contact in group" :key="contact.id">
            <a-button v-if="contact.link !== '#'" :href="`https://${contact.link}`" type="link">{{ contact.subtitle
              }}</a-button>
            <a-button v-else type="link">{{ contact.subtitle }}</a-button>
          </div>
        </a-flex>
      </div>

      <div class="footer-section">
        <h3>{{ $t("footer.connect-with-us") }}</h3>
        <div class="social-icons">
          <a :href="handleSocialClick('facebook')" target="_black" style="color: #fff; text-decoration: none">
            <FacebookFilled style="cursor: pointer" />
          </a>
          <a :href="handleSocialClick('instagram')" target="_black" style="color: #fff; text-decoration: none">
            <InstagramFilled style="cursor: pointer" />
          </a>
          <a :href="handleSocialClick('tiktok')" target="_black" style="color: #fff; text-decoration: none"><img
              src="/tiktok-icons.svg" alt="tiktok-icon" width="18" height="20" @click="handleSocialClick('tiktok')"
              style="cursor: pointer; margin-top: -3px" /></a>
        </div>
        <!-- <a-input-search
          placeholder="Subscribe to newsletter"
          enter-button="Subscribe"
          size="large"
          @search="onSubscribe"
        /> -->
      </div>
    </div>

    <div class="footer-bottom">
      ©2025 Everything L11. {{ $t("footer.all-right-reserved") }}
    </div>
  </a-layout-footer>
</template>

<script setup lang="ts">
import { FacebookFilled, InstagramFilled } from "@ant-design/icons-vue";
import { onMounted, reactive, ref } from "vue";
import { getShoppingContactsPublic } from "../../services/ContactService";
import type { ShoppingContact } from "../ShoppingContact.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n()
const dynamicValidateForm = reactive<{ contacts: ShoppingContact[] }>({
  contacts: [],
});
const groupedContacts = ref<Record<string, ShoppingContact[]>>({});

const handleSocialClick = (social: "facebook" | "instagram" | "tiktok") => {
  const socialMedias = {
    facebook: "https://www.facebook.com/everythingl11bygechlang",
    instagram: "https://www.instagram.com/everythingl11/",
    tiktok: "https://www.tiktok.com/@everything_l11",
  };
  return socialMedias[social] ?? "#";
};

const mappingTitle = (title: string) => {
  const titles: { [k: string]: string } = {
    ["shop with us"]: t("footer.shop-with-us"),
    ["legal"]: t("footer.legal",),
    ["customer service"]: t("footer.customer-service"),
    ["about us"]: t("footer.about-us"),
  };

  return titles[title] ?? "";
};

onMounted(async () => {
  const contacts = await getShoppingContactsPublic();
  dynamicValidateForm.contacts = contacts.map((i) => ({
    id: i.id,
    key: new Date(`${i.created_at}`).getTime(),
    title: i.title,
    subtitle: i.subtitle,
    link: i.link,
  }));
  // Manually update the grouped ref
  groupedContacts.value = dynamicValidateForm.contacts.reduce(
    (grouped, item) => {
      const { title } = item;
      if (!grouped[title]) {
        grouped[title] = [];
      }
      grouped[title].push(item);
      return grouped;
    },
    {} as Record<string, ShoppingContact[]>,
  );
});
</script>

<style scoped>
.custom-footer {
  padding: 2rem 2rem;
  background: transparent;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  max-width: 1280px;
  flex-wrap: wrap;
}

.footer-section {
  flex: 1;
  min-width: 244px;
  margin-bottom: 24px;
}

.footer-section h3 {
  color: #fff;
  margin-bottom: 16px;
}

.footer-bottom {
  text-align: center;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #e8e8e8;
  color: #fff;
}

.social-icons {
  display: flex;
  gap: 1.5rem;
  font-size: 1.2rem;
  margin-bottom: 16px;
  color: #fff;
}

:deep(.ant-btn) {
  padding: 0;
  color: #fff;
  border-radius: 0;
}

:deep(.ant-btn:not(:hover)) {
  text-decoration: underline;
}

:deep(.ant-btn:hover) {
  color: #fff;
  border-bottom: 0.1rem solid #fff;
  text-decoration: underline !important;
}

@media (max-width: 768px) {
  .custom-footer {
    padding: 2rem 1rem;
    width: 100%;
  }

  .footer-section {
    margin-bottom: 32px;
  }
}
</style>
