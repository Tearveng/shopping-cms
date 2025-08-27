<template>
  <a-form
    ref="formRef"
    name="dynamic_form_item"
    :model="dynamicValidateForm"
    v-bind="formItemLayoutWithOutLabel"
    style="width: 100%; padding: 20px"
  >
    <a-typography-text>Shopping categories</a-typography-text>
    <br />
    <br />
    <a-form-item
      v-for="(designer, index) in dynamicValidateForm.designers"
      :key="designer.key"
      v-bind="formItemLayout"
    >
      <a-form-item
        style="margin-bottom: -12px"
        :name="['designers', index, 'title']"
        :rules="[
          { required: true, message: 'Title is required', trigger: 'change' },
        ]"
      >
        <a-flex>
          <MinusCircleOutlined
            style="margin-right: 12px"
            v-if="dynamicValidateForm.designers.length > 1"
            class="dynamic-delete-button"
            @click="removeBanner(designer)"
          />
          <a-input
            name="designer.alias"
            v-model:value="designer.title"
            placeholder="Title"
            style="width: 100%; margin-right: 8px"
          />
        </a-flex>
      </a-form-item>
      <a-form-item
        style="margin-bottom: -32px"
        :name="['designers', index, 'category']"
        :rules="[
          {
            required: true,
            message: 'Category is required',
            trigger: 'change',
          },
        ]"
      >
        <a-flex>
          <a-input
            name="designer.alias"
            v-model:value="designer.category"
            placeholder="Category"
            style="width: 100%; margin-right: 8px"
          />
        </a-flex>
      </a-form-item>
    </a-form-item>
    <a-form-item v-bind="formItemLayoutWithOutLabel">
      <a-button type="dashed" style="width: 60%" @click="addBanner">
        <PlusOutlined />
        Add field
      </a-button>
    </a-form-item>

    <a-button @click="resetForm">Reset</a-button>
    <a-button
      type="primary"
      style="margin-left: 10px"
      html-type="submit"
      :loading="isLoading"
      @click="submitForm"
      >Submit</a-button
    >
  </a-form>
  <contextHolder />
</template>

<script setup lang="ts">
import {
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons-vue";
import { message, Modal, type FormInstance } from "ant-design-vue";
import { h, onMounted, reactive, ref, toRaw, watch } from "vue";
import { getImageUrl } from "../services/BannerService";
import { useAuthStore } from "../stores/auth";
import {
  deleteShoppingCategory,
  getShoppingCategory,
  insertShoppingCategory,
  storageCategory,
  updateShoppingCategory,
  type IShoppingCategory,
} from "../services/CategoryService";

export interface ShoppingTopDesigners {
  id: number | null;
  key: number;
  title: string;
  category: string;
  fileList: any[];
}

const auth = useAuthStore();
const refreshKey = ref(0);
const formRef = ref<FormInstance>();
// const fileList = ref<UploadProps['fileList']>([])
const isLoading = ref(false);
const [modal, contextHolder] = Modal.useModal();
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

const dynamicValidateForm = reactive<{ designers: ShoppingTopDesigners[] }>({
  designers: [],
});

const removeBanner = (item: ShoppingTopDesigners) => {
  if (item.id) {
    showConfirm(item);
  } else {
    const index = dynamicValidateForm.designers.indexOf(item);
    if (index !== -1) {
      dynamicValidateForm.designers.splice(index, 1);
    }
  }
};

const showConfirm = (item: ShoppingTopDesigners) => {
  modal.confirm({
    title: "Delete",
    icon: h(ExclamationCircleOutlined),
    content: h(
      "div",
      { style: "color:red;" },
      "Are you sure to delete this item."
    ),
    onOk() {
      if (item.id) {
        deleteShoppingCategory(item.id)
          .then(() => {
            const index = dynamicValidateForm.designers.indexOf(item);
            if (index !== -1) {
              dynamicValidateForm.designers.splice(index, 1);
            }
            deleted();
          })
          .catch()
          .finally();
      }
    },
    onCancel() {
      console.log("Cancel");
    },
    class: "test",
  });
};

// submit form
const submitForm = () => {
  if (formRef.value) {
    formRef.value
      .validate()
      .then(() => {
        isLoading.value = true;
        const plainData = toRaw(dynamicValidateForm.designers);
        const plainDataMap = plainData.map(
          (i) =>
            ({
              id: i.id,
              title: i.title,
              parent_category: i.category,
              images: [],
              user_id: auth.user?.id,
            } as IShoppingCategory)
        );
        const insertPlainData = plainDataMap.filter((i) => !i.id);
        const updatePlainData = plainDataMap.filter((i) => i.id);
        if (insertPlainData.length > 0) {
          try {
            insertShoppingCategory(
              insertPlainData.map(({ id, ...rest }) => ({ ...rest }))
            )
              .then(() => success())
              .catch((e) => errors(e))
              .finally();
          } catch (error) {
            console.log("error", error);
          }
        }

        if (updatePlainData.length > 0) {
          try {
            updatePlainData.forEach(({ images, ...u }) => {
              updateShoppingCategory(u)
                .then()
                .catch((e) => errors(e))
                .finally();
            });
          } catch (error) {
            console.log("error", error);
          }
        }

        setTimeout(() => {
          update();
          refreshKey.value += 1;
          isLoading.value = false;
        }, 3000);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }
};

const resetForm = () => {
  if (formRef.value) {
    formRef.value.resetFields();
  }
};

const addBanner = () => {
  dynamicValidateForm.designers.push({
    id: null,
    title: "",
    category: "",
    key: Date.now(),
    fileList: [],
  });
};

const success = () => {
  message.success("Created successfully", 5);
};

const update = () => {
  message.success("Updated successfully", 5);
};

const deleted = () => {
  message.success("Deleted successfully", 5);
};

const errors = (msg: string) => {
  message.error(msg, 5);
};

const fetchAllData = async () => {
  if (auth.user) {
    const shoppingBanners = await getShoppingCategory(auth.user.id);
    for (const i of shoppingBanners) {
      const imagesList = [];
      if (i.images && i.images.length > 0) {
        for (const img of i.images) {
          const tempImg = await getImageUrl(img.fileName, storageCategory);
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
        title: i.title,
        category: i.parent_category,
        fileList: imagesList,
      } as ShoppingTopDesigners;
      dynamicValidateForm.designers.push(pre);
    }
  }
};

watch(refreshKey, () => {
  dynamicValidateForm.designers = [];
  fetchAllData();
});

onMounted(async () => {
  await fetchAllData();
});
</script>
<style scoped>
.dynamic-delete-button {
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #999;
  transition: all 0.3s;
}

.dynamic-delete-button:hover {
  color: #777;
}

.dynamic-delete-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
