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
          <a-typography
            style="text-align: center; padding: 15px"
            @click="$router.push('/admin')"
            >CMS</a-typography
          >

          <a-menu-item
            key="dashboard"
            @click="$router.push('/admin/dashboard')"
          >
            <template #icon>
              <DashboardOutlined />
            </template>
            Dashboard
          </a-menu-item>

          <a-menu-item key="profile" @click="$router.push('/admin/profile')">
            <template #icon>
              <UserOutlined />
            </template>
            Profile
          </a-menu-item>

          <a-menu-item key="work" @click="$router.push('/admin/work')">
            <template #icon>
              <LaptopOutlined />
            </template>
            Work
          </a-menu-item>

          <!-- <a-sub-menu key="users">
            <template #icon>
              <TeamOutlined/>
            </template>
            <template #title>Users</template>
            <a-menu-item key="user-list" @click="$router.push('/users')">
              User List
            </a-menu-item>
            <a-menu-item key="user-roles" @click="$router.push('/users/roles')">
              User Roles
            </a-menu-item>
          </a-sub-menu> -->

          <!-- <a-sub-menu key="products">
            <template #icon>
              <ShoppingOutlined/>
            </template>
            <template #title>Products</template>
            <a-menu-item key="product-list" @click="$router.push('/products')">
              Product List
            </a-menu-item>
            <a-menu-item key="categories" @click="$router.push('/products/categories')">
              Categories
            </a-menu-item>
          </a-sub-menu> -->

          <a-menu-item key="about" @click="$router.push('/admin/about')">
            <template #icon>
              <AliwangwangOutlined />
            </template>
            About
          </a-menu-item>

          <a-menu-item key="contact" @click="$router.push('/admin/contact')">
            <template #icon>
              <LaptopOutlined />
            </template>
            Contact
          </a-menu-item>

          <!-- <a-menu-item key="reports" @click="$router.push('/reports')">
            <template #icon>
              <BarChartOutlined />
            </template>
            Reports
          </a-menu-item> -->

          <a-menu-item key="settings" @click="$router.push('/admin/settings')">
            <template #icon>
              <SettingOutlined />
            </template>
            Settings
          </a-menu-item>

          <!-- <a-menu-item key="settings" @click="$router.push('/settings')">
            <a-button @click="handleLogout">Logout</a-button>
          </a-menu-item> -->
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <!--          <a-typography style="padding: 15px">CMS</a-typography>-->
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
        <a-layout-content>
          <router-view />
        </a-layout-content>
        <!--        <a-layout-footer :style="footerStyle">Footer</a-layout-footer>-->
      </a-layout>
    </a-layout>
  </a-flex>

  <!--    <a-layout style="width: 100%; max-width: 1024px">-->
  <!--      &lt;!&ndash; Sidebar &ndash;&gt;-->
  <!--      <a-layout-sider-->
  <!--          v-model:collapsed="collapsed"-->
  <!--          collapsible-->
  <!--          theme="light"-->
  <!--          width="250"-->
  <!--      >-->
  <!--        <a-menu-->
  <!--            mode="inline"-->
  <!--            :selectedKeys="[activeMenu]"-->
  <!--            :openKeys="openKeys"-->
  <!--            @openChange="onOpenChange"-->
  <!--            style="height: 100%; border-right: 0;"-->
  <!--        >-->
  <!--          <a-menu-item key="dashboard" @click="$router.push('/dashboard')">-->
  <!--            <template #icon>-->
  <!--              <DashboardOutlined/>-->
  <!--            </template>-->
  <!--            Dashboard-->
  <!--          </a-menu-item>-->

  <!--          <a-sub-menu key="users">-->
  <!--            <template #icon>-->
  <!--              <TeamOutlined/>-->
  <!--            </template>-->
  <!--            <template #title>Users</template>-->
  <!--            <a-menu-item key="user-list" @click="$router.push('/users')">-->
  <!--              User List-->
  <!--            </a-menu-item>-->
  <!--            <a-menu-item key="user-roles" @click="$router.push('/users/roles')">-->
  <!--              User Roles-->
  <!--            </a-menu-item>-->
  <!--          </a-sub-menu>-->

  <!--          <a-sub-menu key="products">-->
  <!--            <template #icon>-->
  <!--              <ShoppingOutlined/>-->
  <!--            </template>-->
  <!--            <template #title>Products</template>-->
  <!--            <a-menu-item key="product-list" @click="$router.push('/products')">-->
  <!--              Product List-->
  <!--            </a-menu-item>-->
  <!--            <a-menu-item key="categories" @click="$router.push('/products/categories')">-->
  <!--              Categories-->
  <!--            </a-menu-item>-->
  <!--          </a-sub-menu>-->

  <!--          <a-menu-item key="reports" @click="$router.push('/reports')">-->
  <!--            <template #icon>-->
  <!--              <BarChartOutlined/>-->
  <!--            </template>-->
  <!--            Reports-->
  <!--          </a-menu-item>-->

  <!--          <a-menu-item key="settings" @click="$router.push('/settings')">-->
  <!--            <template #icon>-->
  <!--              <SettingOutlined/>-->
  <!--            </template>-->
  <!--            Settings-->
  <!--          </a-menu-item>-->
  <!--        </a-menu>-->
  <!--      </a-layout-sider>-->

  <!--      &lt;!&ndash; Main Content &ndash;&gt;-->
  <!--&lt;!&ndash;      <a-layout style="padding: 0;">&ndash;&gt;-->
  <!--&lt;!&ndash;        &lt;!&ndash; Breadcrumb &ndash;&gt;&ndash;&gt;-->
  <!--&lt;!&ndash;        <a-breadcrumb style="margin: 16px 24px;">&ndash;&gt;-->
  <!--&lt;!&ndash;          <a-breadcrumb-item v-for="item in breadcrumbs" :key="item.path">&ndash;&gt;-->
  <!--&lt;!&ndash;            <router-link v-if="item.path" :to="item.path">&ndash;&gt;-->
  <!--&lt;!&ndash;              {{ item.name }}&ndash;&gt;-->
  <!--&lt;!&ndash;            </router-link>&ndash;&gt;-->
  <!--&lt;!&ndash;            <span v-else>{{ item.name }}</span>&ndash;&gt;-->
  <!--&lt;!&ndash;          </a-breadcrumb-item>&ndash;&gt;-->
  <!--&lt;!&ndash;        </a-breadcrumb>&ndash;&gt;-->

  <!--&lt;!&ndash;        &lt;!&ndash; Page Content &ndash;&gt;&ndash;&gt;-->
  <!--&lt;!&ndash;        <a-layout-content&ndash;&gt;-->
  <!--&lt;!&ndash;            style="&ndash;&gt;-->
  <!--&lt;!&ndash;            margin: 0 24px 24px;&ndash;&gt;-->
  <!--&lt;!&ndash;            padding: 24px;&ndash;&gt;-->
  <!--&lt;!&ndash;            background: #fff;&ndash;&gt;-->
  <!--&lt;!&ndash;            min-height: 280px;&ndash;&gt;-->
  <!--&lt;!&ndash;            border-radius: 8px;&ndash;&gt;-->
  <!--&lt;!&ndash;          "&ndash;&gt;-->
  <!--&lt;!&ndash;        >&ndash;&gt;-->
  <!--&lt;!&ndash;          <router-view/>&ndash;&gt;-->
  <!--&lt;!&ndash;        </a-layout-content>&ndash;&gt;-->
  <!--&lt;!&ndash;      </a-layout>&ndash;&gt;-->
  <!--    </a-layout>-->

  <!-- Footer -->
  <!--    <a-layout-footer style="text-align: center; background: #f0f2f5;">-->
  <!--      My Vue App ©2024 Created with Vue 3 + Ant Design-->
  <!--    </a-layout-footer>-->
  <!--  </a-layout>-->
</template>

<script setup lang="ts">
import {
  AliwangwangOutlined,
  DashboardOutlined,
  LaptopOutlined,
  SettingOutlined,
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
  if (path === "/admin/about") return "about";
  if (path === "/admin/contact") return "contact";
  if (path === "/admin/settings") return "settings";
  if (path === "/admin/users") return "user-list";
  if (path === "/admin/users/roles") return "user-roles";
  if (path === "/admin/products") return "product-list";
  if (path === "/admin/products/categories") return "categories";
  if (path === "/admin/reports") return "reports";
  if (path === "/admin/settings") return "settings";
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
  } else if (path === "/admin/contact") {
    crumbs.push({ name: "Contact" });
  } else if (path === "/admin/settings") {
    crumbs.push({ name: "Settings" });
  }

  return crumbs;
});

const onOpenChange = (keys: any) => {
  openKeys.value = keys;
};

// const handleLogout = async () => {
//   authStore.signOut().then(() => {
//     router.push('/login')
//   }).catch(err => console.log("err", err));
// }

const headerStyle: CSSProperties = {
  textAlign: "center",
  color: "#fff",
  maxHeight: "48px",
  backgroundColor: "#fff",
};

// const siderStyle: CSSProperties = {
//   textAlign: "center",
//   lineHeight: "120px",
//   color: "#fff",
//   backgroundColor: "#3ba0e9",
// };

// const footerStyle: CSSProperties = {
//   textAlign: "center",
//   color: "#fff",
//   backgroundColor: "#7dbcea",
// };
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
