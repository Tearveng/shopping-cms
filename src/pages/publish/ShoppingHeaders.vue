<template>
  <div class="responsive-menu-container">
    <!-- Desktop Horizontal Menu (shown on larger screens) -->
    <a-flex v-if="!isMobile" vertical>
      <a-flex align="center" gap="10" style="padding-top: 1rem">
        <a class="logo-link">
          <a-typography class="logo-image">Everything L11</a-typography>
        </a>
      </a-flex>
      <a-menu
        mode="horizontal"
        :overflowedIndicator="null"
        class="desktop-menu"
        :selectedKeys="[current]"
        @click="handleMenuClick"
      >
        <a-menu-item key="home"> New arrivals </a-menu-item>
        <a-menu-item key="products"> Designers </a-menu-item>
        <a-menu-item key="about"> Bags </a-menu-item>
        <a-menu-item key="contact"> Accessories </a-menu-item>
        <a-menu-item key="shoes"> Shoes </a-menu-item>
        <a-menu-item key="jewelry"> Jewelry </a-menu-item>
        <a-menu-item key="watch"> Watches </a-menu-item>
      </a-menu>
    </a-flex>

    <!-- Mobile Hamburger Menu (shown on smaller screens) -->
    <div v-else class="mobile-menu">
      <a-flex align="center" gap="10">
        <a-button type="text" @click="showDrawer" style="padding: 0">
          <menu-outlined style="font-size: 18px" />
        </a-button>
        <a class="logo-link">
          <a-typography class="logo-image">Everything L11</a-typography>
        </a>
      </a-flex>
      <a-drawer
        title="Menu"
        placement="left"
        :closable="true"
        :visible="visible"
        @close="onClose"
      >
        <a-menu
          mode="vertical"
          :selectedKeys="[current]"
          @click="handleMenuClick"
        >
          <a-menu-item key="home">
            <template #icon><home-outlined /></template>
            Home
          </a-menu-item>
          <a-menu-item key="products">
            <template #icon><appstore-outlined /></template>
            Products
          </a-menu-item>
          <a-menu-item key="about">
            <template #icon><info-circle-outlined /></template>
            About
          </a-menu-item>
          <a-menu-item key="contact">
            <template #icon><contacts-outlined /></template>
            Contact
          </a-menu-item>
        </a-menu>
      </a-drawer>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  AppstoreOutlined,
  ContactsOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  MenuOutlined,
} from "@ant-design/icons-vue";
import { onBeforeUnmount, onMounted, ref } from "vue";

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

// Set up event listeners for window resize
onMounted(() => {
  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkScreenSize);
});
</script>

<style scoped>
.responsive-menu-container {
  width: 100%;
}

.logo-link {
  width: calc(100% - 3rem);
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
}

.mobile-menu {
  display: flex;
  justify-content: flex-end;
  padding: 1rem 0;
}

:deep(.desktop-menu .ant-menu-item-selected) {
  color: #000 !important;
  font-weight: 400 !important;
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

@media (max-width: 575px) {
  .logo-link {
    width: 11.7rem;
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
