<template>
  <div class="responsive-menu-container">
    <!-- Desktop Horizontal Menu (shown on larger screens) -->
    <a-flex v-if="!isMobile" vertical>
      <a-flex
        align="center"
        gap="10"
        style="padding-top: 1rem; justify-content: space-between"
      >
        <a class="logo-link">
          <img
            src="/app-logo.png"
            alt="Logo"
            class="logo"
            @click="$router.push(`/${route.params.locale}`)"
          />
        </a>
        <LanguageSwitching />
      </a-flex>
      <a-menu
        mode="horizontal"
        :overflowedIndicator="null"
        class="desktop-menu"
        :selectedKeys="[current]"
        @click="handleMenuClick"
      >
        <a-menu-item
          key="new-arrivals"
          @click="$router.push('/collections/new-arrivals')"
        >
          {{ $t("app-menu-navigation.new-arrivals") }}
        </a-menu-item>
        <a-menu-item
          key="designers"
          @click="$router.push('/collections/designers')"
        >
          {{ $t("app-menu-navigation.designers") }}
        </a-menu-item>
        <a-menu-item key="bags" @click="$router.push('/collections/bags')">
          {{ $t("app-menu-navigation.bags") }}
        </a-menu-item>
        <a-menu-item
          key="accessories"
          @click="$router.push('/collections/accessories')"
        >
          {{ $t("app-menu-navigation.accessories") }}
        </a-menu-item>
        <a-menu-item key="shoes" @click="$router.push('/collections/shoes')">
          {{ $t("app-menu-navigation.shoes") }}
        </a-menu-item>
        <a-menu-item
          key="jewelry"
          @click="$router.push('/collections/jewelry')"
        >
          {{ $t("app-menu-navigation.jewelry") }}
        </a-menu-item>
        <a-menu-item
          key="watches"
          @click="$router.push('/collections/watches')"
        >
          {{ $t("app-menu-navigation.watches") }}
        </a-menu-item>
      </a-menu>
    </a-flex>

    <!-- Mobile Hamburger Menu (shown on smaller screens) -->
    <div v-else class="mobile-menu">
      <a-flex gap="10">
        <a-button type="text" @click="showDrawer" justify="flex-end" >
          <MenuOutlined />
        </a-button>
        <a class="logo-link">
          <img
            src="/app-logo.png"
            alt="Logo"
            class="logo"
            @click="$router.push('/')"
          />
        </a>
        <LanguageSwitching />
      </a-flex>
      <a-drawer
        :title="$t('app-menu-navigation.menu')"
        placement="left"
        :closable="true"
        :visible="visible"
        @close="onClose"
      >
        <a-menu
          style="background: transparent !important"
          mode="vertical"
          :selectedKeys="[current]"
          @click="handleMenuClick"
        >
          <a-menu-item
            key="home"
            @click="$router.push('/collections/new-arrivals')"
          >
            <template #icon>
              <img
                src="/shopping-arrival.svg"
                alt="shopping-icon"
                width="14"
                height="14"
              />
            </template>
            {{ $t("app-menu-navigation.new-arrivals") }}
          </a-menu-item>
          <a-menu-item
            key="products"
            @click="$router.push('/collections/designers')"
          >
            <template #icon>
              <img
                src="/shopping-design.svg"
                alt="shopping-icon"
                width="14"
                height="14"
              />
            </template>
            {{ $t("app-menu-navigation.designers") }}
          </a-menu-item>
          <a-menu-item key="bags" @click="$router.push('/collections/bags')">
            <template #icon>
              <img
                src="/shopping-bag.svg"
                alt="shopping-icon"
                width="14"
                height="14"
              />
            </template>
            {{ $t("app-menu-navigation.bags") }}
          </a-menu-item>
          <a-menu-item
            key="accessories"
            @click="$router.push('/collections/accessories')"
          >
            <template #icon>
              <img
                src="/shopping-accessories.svg"
                alt="shopping-icon"
                width="14"
                height="14"
              />
            </template>
            {{ $t("app-menu-navigation.accessories") }}
          </a-menu-item>
          <a-menu-item key="shoes" @click="$router.push('/collections/shoes')">
            <template #icon>
              <img
                src="/shopping-shoes.svg"
                alt="shopping-icon"
                width="14"
                height="14"
              />
            </template>
            {{ $t("app-menu-navigation.shoes") }}
          </a-menu-item>
          <a-menu-item
            key="jewelry"
            @click="$router.push('/collections/jewelry')"
          >
            <template #icon>
              <img
                src="/shopping-jewelry.svg"
                alt="shopping-icon"
                width="14"
                height="14"
              />
            </template>
            {{ $t("app-menu-navigation.jewelry") }}
          </a-menu-item>
          <a-menu-item
            key="watches"
            @click="$router.push('/collections/watches')"
          >
            <template #icon>
              <img
                src="/shopping-watches.svg"
                alt="shopping-icon"
                width="14"
                height="14"
              />
            </template>
            {{ $t("app-menu-navigation.watches") }}
          </a-menu-item>
        </a-menu>
      </a-drawer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MenuOutlined } from "@ant-design/icons-vue";
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import LanguageSwitching from "../../lib/components/language-switching.vue";

const route = useRoute();
const current = ref("home");
const isMobile = ref(false);
const visible = ref(false);

const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 768;
};

const handleMenuClick = (e: any) => {
  current.value = e.key;
  if (isMobile.value) {
    visible.value = false;
  }
};

const showDrawer = () => {
  visible.value = true;
};

const onClose = () => {
  visible.value = false;
};

watch(
  () => route.params.parent_key,
  (newVal) => {
    if (!newVal) {
      current.value = "";
    }
  },
  { immediate: true },
);

// Set up event listeners for window resize
onMounted(() => {
  current.value = route.params.parent_key as string;
  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkScreenSize);
});
</script>

<style scoped>
.logo {
  width: 400px;
  margin-left: -6rem;
  height: auto;
  /* maintain aspect ratio */
  display: block;
}

.responsive-menu-container {
  width: 100%;
}

.logo-link {
  width: 250px;
}

.logo-image {
  max-width: 280px;
  font-size: 2rem;
  line-height: 2em;
  margin-top: -0.3rem;
  font-weight: 400;
}

.desktop-menu {
  min-width: 768px;
  line-height: 64px;
  border-bottom: none;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  flex-wrap: nowrap;
  background: transparent;
}

.mobile-menu {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 1rem 0;
}

:deep(.ant-drawer-content),
:deep(.ant-drawer-body) {
  background: "#fff" !important;
}

:deep(.ant-menu),
:deep(.ant-menu-vertical) {
  background: "#fff" !important;
}

:deep(.desktop-menu .ant-menu-item-selected) {
  font-weight: 400 !important;
  background-color: inherit !important;
}

:deep(.ant-menu-item-selected) {
  color: #000 !important;
  background-color: #e8dcd2 !important;
}

/* Custom styles for menu items */
:deep(.desktop-menu .ant-menu-item),
:deep(.mobile-menu .ant-menu-item) {
  display: flex;
  align-items: center;
  padding: 0 20px 0 0;
}

/* Underline effect on hover */
:deep(.desktop-menu .ant-menu-item) {
  position: relative;
  font-size: 1rem;
  font-weight: 200;
}

:deep(.desktop-menu .ant-menu-item::after) {
  content: "";
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 20px;
  height: 0.1rem;
  background-color: #000 !important;
  border-bottom-color: #000 !important;
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

:deep(.desktop-menu .ant-menu-item:hover::after) {
  transform: scaleX(1);
  border-bottom-color: #000 !important;
}

/* Mobile menu adjustments */
:deep(.mobile-menu .ant-menu) {
  border-right: none;
}

:deep(.mobile-menu .ant-menu-item) {
  margin: 8px 0;
  padding-left: 24px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .desktop-menu {
    display: none;
  }

  .logo-link {
    width: 14.7rem;
  }

  .logo-image {
    max-width: calc(100% - 2rem);
    height: 50%;
    object-fit: cover;
  }
}

@media (max-width: 768px) {
  .logo-link {
    width: 12rem;
  }

  .logo {
    width: 200px;
    margin-top: -0.8rem;
    margin-left: -3rem;
    height: auto;
    /* maintain aspect ratio */
    display: block;
  }

  .logo-image {
    max-width: calc(100% - 2rem);
    font-size: 1.2rem;
    line-height: 2em;
    margin-top: -0.3rem;
    font-weight: 400;
  }
}
</style>
