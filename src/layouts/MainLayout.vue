<template>
  <a-flex style="justify-content: center">
    <a-layout style="width: 100%; max-width: 1024px">
      <a-layout-sider
        v-model:collapsed="collapsed"
        collapsible
        theme="light"
        width="250"
      >
        <a-menu
          mode="inline"
          :selectedKeys="[activeMenu]"
          :openKeys="openKeys"
          @openChange="onOpenChange"
          style="height: 100%; border-right: 0; text-align: start"
        >
          <div
            style="
              display: flex;
              justify-content: center;
              align-items: center;
              margin-top: 10px;
            "
          >
            <img
              src="/lemon-logo.svg?url"
              @click="$router.push('/admin')"
              alt="logo-app"
              width="30"
              height="30"
              style="text-align: center; cursor: pointer"
            />
          </div>

          <a-menu-item key="profile" @click="$router.push('/admin/profile')">
            <template #icon>
              <UserOutlined />
            </template>
            Profile
          </a-menu-item>

          <a-menu-item key="banner" @click="$router.push('/admin/banner')">
            <template #icon>
              <FundProjectionScreenOutlined />
            </template>
            Banner
          </a-menu-item>

           <a-menu-item key="top_design" @click="$router.push('/admin/top_design')">
            <template #icon>
              <HighlightOutlined />
            </template>
            Top design
          </a-menu-item>

          <a-menu-item key="work" @click="$router.push('/admin/work')">
            <template #icon>
              <MediumWorkmarkOutlined />
            </template>
            Work
          </a-menu-item>

          <a-menu-item
            key="education"
            @click="$router.push('/admin/education')"
          >
            <template #icon>
              <CompressOutlined />
            </template>
            Education
          </a-menu-item>

          <a-menu-item key="project" @click="$router.push('/admin/project')">
            <template #icon>
              <FundProjectionScreenOutlined />
            </template>
            Project
          </a-menu-item>

          <a-menu-item key="language" @click="$router.push('/admin/language')">
            <template #icon>
              <TranslationOutlined />
            </template>
            Language
          </a-menu-item>

          <a-menu-item key="contact" @click="$router.push('/admin/contact')">
            <template #icon>
              <LaptopOutlined />
            </template>
            Contact
          </a-menu-item>

          <a-menu-item key="about" @click="$router.push('/admin/about')">
            <template #icon>
              <AliwangwangOutlined />
            </template>
            About
          </a-menu-item>

          <a-menu-item key="settings" @click="$router.push('/admin/settings')">
            <template #icon>
              <SettingOutlined />
            </template>
            Settings
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header :style="headerStyle">
          <a-breadcrumb style="margin: 12px 0px">
            <a-breadcrumb-item v-for="item in breadcrumbs" :key="item.path">
              <router-link v-if="item.path" :to="item.path"
                >{{ item.name }}
              </router-link>
              <span v-else>{{ item.name }}</span>
            </a-breadcrumb-item>
          </a-breadcrumb>
        </a-layout-header>
        <a-layout-content
          style="
            overflow-y: hidden;
            overflow: auto;
            max-height: calc(100vh - 60px);
          "
        >
          <router-view />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-flex>
</template>

<script setup lang="ts">
import {
  AliwangwangOutlined,
  CompressOutlined,
  FundProjectionScreenOutlined,
  HighlightOutlined,
  LaptopOutlined,
  MediumWorkmarkOutlined,
  SettingOutlined,
  TranslationOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
import { computed, type CSSProperties, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const collapsed = ref(false);
const openKeys = ref(["users", "products"]);

// Active menu based on current route
const activeMenu = computed(() => {
  const path = route.path;
  if (path === "/admin/dashboard") return "dashboard";
  if (path === "/admin/profile") return "profile";
  if (path === "/admin/work") return "work";
  if (path === "/admin/education") return "education";
  if (path === "/admin/project") return "project";
  if (path === "/admin/language") return "language";
  if (path === "/admin/contact") return "contact";
  if (path === "/admin/about") return "about";
  if (path === "/admin/settings") return "settings";
  if (path === "/admin/users") return "user-list";
  if (path === "/admin/users/roles") return "user-roles";
  if (path === "/admin/products") return "product-list";
  if (path === "/admin/products/categories") return "categories";
  if (path === "/admin/reports") return "reports";
  if (path === "/admin/settings") return "settings";
  if (path === '/admin/banner') return 'banner';
  if (path === '/admin/top_design') return 'top_design'
  return "admin/home";
});

// Breadcrumbs based on current route
const breadcrumbs = computed(() => {
  const path = route.path;
  const crumbs: { name: string; path?: string }[] = [
    { name: "Home", path: "/" },
  ];

  if (path === "/admin/about") {
    crumbs.push({ name: "/adminAbout" });
  } else if (path === "/admin/dashboard") {
    crumbs.push({ name: "Dashboard" });
  } else if (path === "/admin/profile") {
    crumbs.push({ name: "Profile" });
  } else if (path === "/admin/work") {
    crumbs.push({ name: "Work" });
  } else if (path === "/admin/education") {
    crumbs.push({ name: "Education" });
  } else if (path === "/admin/project") {
    crumbs.push({ name: "Project" });
  } else if (path === "/admin/contact") {
    crumbs.push({ name: "Contact" });
  } else if (path === "/admin/settings") {
    crumbs.push({ name: "Settings" });
  } else if (path === '/admin/banner') {
    crumbs.push({name: '/Banner'})
  } else if (path === '/admin/top_design') {
    crumbs.push({name: "/Top design"})
  }

  return crumbs;
});

const onOpenChange = (keys: any) => {
  openKeys.value = keys;
};

const headerStyle: CSSProperties = {
  textAlign: "center",
  color: "#fff",
  maxHeight: "48px",
  backgroundColor: "#fff",
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  padding: 0 24px;
}

.logo {
  min-width: 200px;
}

.header-menu {
  flex: 1;
  justify-content: flex-start;
}

.header-right {
  margin-left: auto;
}

.ant-layout-sider-children {
  overflow-y: auto;
}

:deep(.ant-menu-horizontal) {
  border-bottom: none;
}

:deep(.ant-menu-horizontal > .ant-menu-item),
:deep(.ant-menu-horizontal > .ant-menu-submenu) {
  border-bottom: 2px solid transparent;
}

:deep(.ant-menu-horizontal > .ant-menu-item:hover),
:deep(.ant-menu-horizontal > .ant-menu-submenu:hover),
:deep(.ant-menu-horizontal > .ant-menu-item-selected),
:deep(.ant-menu-horizontal > .ant-menu-submenu-selected) {
  border-bottom-color: #1890ff;
}
</style>
