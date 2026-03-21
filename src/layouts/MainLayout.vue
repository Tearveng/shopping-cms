 <template>
  <a-flex style="justify-content: center">
    <a-layout style="width: 100%; max-width: 1920px">
      <a-layout-sider v-model:collapsed="collapsed" collapsible theme="light" width="250">
        <a-menu mode="inline" :selectedKeys="[activeMenu]" :openKeys="openKeys" @openChange="onOpenChange"
          style="height: 100%; border-right: 0; text-align: start">
          <div style="
              display: flex;
              justify-content: center;
              align-items: center;
              margin-top: 10px;
            ">
            <img width="70" height="70" src="https://img.icons8.com/clouds/500/bag-front-view.png" alt="bag-front-view"
              style="cursor: pointer" @click="$router.push('/admin')" />
          </div>

          <a-menu-item key="profile" @click="$router.push('/admin/profile')">
            <template #icon>
              <UserOutlined />
            </template>
            Profile
          </a-menu-item>

          <a-menu-item key="category" @click="$router.push('/admin/category')">
            <template #icon>
              <UnorderedListOutlined />
            </template>
            Category
          </a-menu-item>

          <a-menu-item key="items" @click="$router.push('/admin/items')">
            <template #icon>
              <FallOutlined />
            </template>
            All item
          </a-menu-item>

          <a-menu-item key="banner" @click="$router.push('/admin/banner')">
            <template #icon>
              <FundProjectionScreenOutlined />
            </template>
            Banner
          </a-menu-item>

          <a-menu-item key="top_design" @click="$router.push('/admin/top_design')">
            <template #icon>
              <ClearOutlined />
            </template>
            Top design
          </a-menu-item>

          <a-menu-item key="feature_collection" @click="$router.push('/admin/feature_collection')">
            <template #icon>
              <DotChartOutlined />
            </template>
            Feature collection
          </a-menu-item>

          <a-menu-item key="more_top_design" @click="$router.push('/admin/more_top_design')">
            <template #icon>
              <ClearOutlined />
            </template>
            More top design
          </a-menu-item>

          <a-menu-item key="editor_pick" @click="$router.push('/admin/editor_pick')">
            <template #icon>
              <FireOutlined />
            </template>
            Editor pick
          </a-menu-item>

          <a-menu-item key="live_announce" @click="$router.push('/admin/live_announce')">
            <template #icon>
              <FundOutlined />
            </template>
            Live announce
          </a-menu-item>

          <a-menu-item key="shop_in_person" @click="$router.push('/admin/shop_in_person')">
            <template #icon>
              <ShopOutlined />
            </template>
            Shop in person
          </a-menu-item>

          <a-menu-item key="contact" @click="$router.push('/admin/contact')">
            <template #icon>
              <ContactsOutlined />
            </template>
            Contact
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
              <router-link v-if="item.path" :to="item.path">{{ item.name }}
              </router-link>
              <span v-else>{{ item.name }}</span>
            </a-breadcrumb-item>
          </a-breadcrumb>
        </a-layout-header>
        <a-layout-content style="
            overflow-y: hidden;
            overflow: auto;
            max-height: calc(100vh - 120px);
          ">
          <router-view />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-flex>
</template>

<script setup lang="ts">
import {
  ClearOutlined,
  ContactsOutlined,
  DotChartOutlined,
  FireOutlined,
  FundOutlined,
  FundProjectionScreenOutlined,
  ShopOutlined,
  SettingOutlined,
  UserOutlined,
  UnorderedListOutlined,
  FallOutlined,
} from "@ant-design/icons-vue";
import { computed, type CSSProperties, ref } from "vue";
import { useRoute } from "vue-router";
import { getLastNumber } from "../util/util";

const route = useRoute();
const collapsed = ref(false);
const openKeys = ref(["users", "products"]);

// Active menu based on current route
const activeMenu = computed(() => {
  const path = route.path;
  if (path.includes("/admin/dashboard")) return "dashboard";
  if (path.includes("/admin/profile")) return "profile";
  if (path.includes("/admin/work")) return "work";
  if (path.includes("/admin/education")) return "education";
  if (path.includes("/admin/project")) return "project";
  if (path.includes("/admin/language")) return "language";
  if (path.includes("/admin/contact")) return "contact";
  if (path.includes("/admin/about")) return "about";
  if (path.includes("/admin/settings")) return "settings";
  if (path.includes("/admin/users")) return "user-list";
  if (path.includes("/admin/users/roles")) return "user-roles";
  if (path.includes("/admin/products")) return "product-list";
  if (path.includes("/admin/products/categories")) return "categories";
  if (path.includes("/admin/reports")) return "reports";
  if (path.includes("/admin/settings")) return "settings";
  if (path.includes("/admin/category")) return "category";
  if (path.includes("/admin/items")) return "items";
  if (path.includes("/admin/banner")) return "banner";
  if (path.includes("/admin/top_design")) return "top_design";
  if (path.includes("/admin/feature_collection")) return "feature_collection";
  if (path.includes("/admin/more_top_design")) return "more_top_design";
  if (path.includes("/admin/editor_pick")) return "editor_pick";
  if (path.includes("/admin/live_announce")) return "live_announce";
  if (path.includes("/admin/shop_in_person")) return "shop_in_person";

  return "admin/home";
});

// Breadcrumbs based on current route
const breadcrumbs = computed(() => {
  const path = route.path;
  const crumbs: { name: string; path?: string }[] = [
    { name: "Home", path: "/admin" },
  ];

  if (path.includes("/admin/top_design")) {
    crumbs.push({ name: "Top design" });
  } else if (path.includes("/admin/dashboard")) {
    crumbs.push({ name: "Dashboard" });
  } else if (path.includes("/admin/profile")) {
    crumbs.push({ name: "Profile" });
  } else if (path.includes("/admin/banner")) {
    crumbs.push({ name: "Banner" });
  } else if (path.includes("/admin/feature_collection")) {
    crumbs.push({ name: "Feature collection" });
  } else if (path.includes("/admin/more_top_design")) {
    crumbs.push({ name: "More top design" });
  } else if (path.includes("/admin/editor_pick")) {
    crumbs.push({ name: "Editor pick" });
  }  else if (path.includes("/admin/live_announce")) {
    crumbs.push({ name: "Live announce" });
  } else if (path.includes("/admin/shop_in_person")) {
    crumbs.push({ name: "Shop in person" });
  } else if (path.includes("/admin/contact")) {
    crumbs.push({ name: "Shopping Contact" });
  } else if (path.includes("/admin/settings")) {
    crumbs.push({ name: "Settings" });
  } else if (path.includes("/admin/category")) {
    crumbs.push({ name: "Category" });
  } else if (path.includes("/admin/items")) {
    const id = getLastNumber(path);
    crumbs.push({ name: `Items` });
    if (id) {
      crumbs.push({ name: `${id}` });
    }
  } else if (path === "/admin/banner") {
    crumbs.push({ name: "Banner" });
  } else if (path === "/admin/top_design") {
    crumbs.push({ name: "Top design" });
  } else if (path === "/admin/feature_collection") {
    crumbs.push({ name: "Feature collection" });
  } else if (path === "/admin/more_top_design") {
    crumbs.push({ name: "More top design" });
  } else if (path === "/admin/editor_pick") {
    crumbs.push({ name: "Editor pick" });
  } else if (path === "/admin/live_announce") {
    crumbs.push({ name: "Live announce" });
  } else if (path === "/admin/shop_in_person") {
    crumbs.push({ name: "Shop in person" });
  }

  return crumbs;
});

const onOpenChange = (keys: any) => {
  openKeys.value = keys;
};

const headerStyle: CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: "90px",
  backgroundColor: "#fff",
  justifyContent: "center",
  display: "flex",
  flexDirection: 'column'
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
