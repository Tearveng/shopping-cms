<template>
  <div style="padding: 20px">
    <a-typography-text>Shopping categories</a-typography-text>
    <br />
    <br />
    <a-button
      class="editable-add-btn"
      style="margin-bottom: 8px"
      @click="handleAdd"
      >Add</a-button
    >

    <a-table
      :columns="columns"
      :data-source="dataSource"
      size="small"
      bordered
      style="min-width: 1600px"
    >
      <template #bodyCell="{ column, text, record }">
        <template
          v-if="
            ['title', 'subtitle', 'condition'].includes(
              column.dataIndex
            )
          "
        >
          <div>
            <a-input
              v-if="editableData[record.key]"
              v-model:value="editableData[record.key][column.dataIndex]"
              style="margin: -5px 0"
            />
            <template v-else>
              {{ text }}
            </template>
          </div>
        </template>
        <template v-if="['size'].includes(column.dataIndex)">
          <div>
            <a-button
              type="link"
              v-if="editableData[record.key]"
              @click="
                $router.push({
                  path: `/admin/items/${record.key}`,
                  query: { type: 'Size' },
                })
              "
              >Edit size</a-button
            >
            <template v-else>
              <a-typography-text style="font-weight: 600;">>Size</a-typography-text>
            </template>
          </div>
        </template>
        <template v-if="['details'].includes(column.dataIndex)">
          <div>
            <a-button
              type="link"
              v-if="editableData[record.key]"
              @click="
                $router.push({
                  path: `/admin/items/${record.key}`,
                  query: { type: 'Details' },
                })
              "
              >Edit details</a-button
            >
            <template v-else>
              <a-typography-text style="font-weight: 600;">>Details</a-typography-text>
            </template>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'category_id'">
          <div>
            <a-select
              :disabled="!record.parent_key"
              :ref="select"
              :value="text"
              style="width: 120px"
              @change="
                handleChangeSelect({
                  key: record.key,
                  value: $event,
                  extra: { id: record.key },
                })
              "
            >
              <a-select-option
                v-for="category in options?.filter(
                  (o) => o.parent_category === record.parent_key
                )"
                :key="category.key"
                :value="category.id.toString()"
                >{{ category.title }}</a-select-option
              >
            </a-select>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'category_group'">
          <div>
            <a-select
              :ref="select"
              :value="record.parent_key"
              style="width: 120px"
              @change="
                handleChangeSelectGroup({
                  key: record.key,
                  value: $event,
                  extra: { id: record.key },
                })
              "
            >
              <a-select-option
                v-for="group in optionsGroup"
                :key="group.key"
                :value="group.parent_category"
                >{{ group.parent_category }}</a-select-option
              >
            </a-select>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'fileList'">
          <div>
            <a-upload
              ref="uploadRef"
              v-model:file-list="record.fileList"
              :before-upload="beforeUpload"
              :remove="handleRemove(record.id)"
              :custom-request="customUpload({ row: record })"
              list-type="picture-card"
              @preview="handlePreview"
            >
              <div>
                <PlusOutlined />
                <div style="margin-top: 2px">Upload</div>
              </div>
            </a-upload>
            <a-modal
              :open="previewVisible"
              :title="previewTitle"
              :footer="null"
              @cancel="handleCancel"
            >
              <img alt="example" style="width: 100%" :src="previewImage" />
            </a-modal>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'operation'">
          <div class="editable-row-operations">
            <span v-if="editableData[record.key]">
              <a-typography-link @click="save(record.key)"
                >Save</a-typography-link
              >
              <a-popconfirm
                title="Sure to cancel?"
                @confirm="cancel(record.key)"
              >
                <a>Cancel</a>
              </a-popconfirm>
            </span>
            <span v-else>
              <a-flex>
                <a @click="edit(record.key)">Edit</a>
                <a @click="deleteRecord(record.id, record.key)">Delete</a>
              </a-flex>
            </span>
          </div>
        </template>
      </template>
    </a-table>
    <contextHolder />
  </div>
</template>
<script lang="ts" setup>
import { cloneDeep } from "lodash-es";
import { onMounted, reactive, ref, watch } from "vue";
import { PlusOutlined } from "@ant-design/icons-vue";
import {
  deleteShoppingAllItems,
  getShoppingAllItems,
  getShoppingAllItemsById,
  insertShoppingAllItems,
  storageAllItems,
  updateShoppingAllItems,
  type IShoppingAllItems,
} from "../services/AllItemsService";
import { useAuthStore } from "../stores/auth";
import { getImageUrl } from "../services/BannerService";
import { message, Modal } from "ant-design-vue";
import { supabase } from "../lib/supabase";
import { getShoppingCategoryPublic } from "../services/CategoryService";
import type { SelectProps } from "ant-design-vue/es/vc-select";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";

const columns = [
  {
    title: "Title",
    dataIndex: "title",
    // sorter: (a: DataItem, b: DataItem) => a.title.length - b.title.length,
    width: "10%",
  },
  {
    title: "Subtitle",
    dataIndex: "subtitle",
    width: "15%",
  },
  {
    title: "Size",
    dataIndex: "size",
    width: "8%",
  },
  {
    title: "Details",
    dataIndex: "details",
    width: "12%",
  },
  {
    title: "Images",
    dataIndex: "fileList",
    width: "13%",
  },
  {
    title: "Category",
    dataIndex: "category_id",
    width: "10%",
  },
  {
    title: "Group",
    dataIndex: "category_group",
    width: "10%",
  },
  {
    title: "Condition",
    dataIndex: "condition",
    width: "8%",
  },
  {
    title: "Price",
    dataIndex: "price",
    width: "5%",
  },
  {
    title: "Operation",
    dataIndex: "operation",
    width: "20%",
  },
];

interface DataItem {
  id: number | null;
  key: string;
  title: string;
  subtitle: string;
  size: string;
  details: string;
  fileList: any[];
  condition: string;
  category_id: string;
  price: number;
}

const data: DataItem[] = reactive([]);
const refreshKey = ref(0);
const auth = useAuthStore();
const dataSource = ref(data);
const previewVisible = ref(false);
const previewImage = ref("");
const previewTitle = ref("");
const uploadedFiles = ref([]);
const select = ref();
const options = ref<SelectProps["options"]>([]);
const optionsGroup = ref<SelectProps["options"]>([]);
const uploadRef = ref(null);
// const editableData: UnwrapRef<Record<string, DataItem>> = reactive({});
const editableData: any = reactive({});
const [modal, contextHolder] = Modal.useModal();

function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

// Category select change
const handleChangeSelect = (param: any) => {
  saveCategory(param.value, param.extra.id);
};

//
const handleChangeSelectGroup = (param: any) => {
  saveCategoryGroup(param.value, param.extra.id);
};

// Validate file before upload
const beforeUpload = (file: any) => {
  const isImage = file.type.startsWith("image/");
  const isLt5M = file.size / 1024 / 1024 < 5; // Limit to 5MB
  if (!isImage) {
    message.error("You can only upload image files!");
    return false;
  }
  if (!isLt5M) {
    message.error("Image must be smaller than 5MB!");
  }
  return isImage && isLt5M; // Allow upload if valid
};

const handlePreview = async (file: any) => {
  if (!file.url && !file.preview) {
    file.preview = (await getBase64(file.originFileObj)) as string;
  }
  previewImage.value = file.url || file.preview;
  previewVisible.value = true;
  previewTitle.value =
    file.name || file.url.substring(file.url.lastIndexOf("/") + 1);
};

const customUpload = ({ row }: any) => {
  return async ({ file, onSuccess, onError }: any) => {
    try {
      // isLoadingAvatar.value = true;
      // Generate unique file path
      const fileName = file.name.replace(/\s+/g, "_");
      const filePath = `${storageAllItems}/${Date.now()}-${fileName}`;
      const { data, error: uploadError } = await supabase.storage
        .from("shopping-storage") // Replace with your bucket name
        .upload(filePath, file, {
          cacheControl: "3600", // Cache for 1 hour
          upsert: false, // Prevent overwriting
          contentType: file.type, // Set MIME type (e.g., image/jpeg)
        });

      if (uploadError) {
        throw uploadError;
      }
      // Store metadata in the database
      const metadata = [
        {
          id: data.id,
          fileName: filePath.split("/")[1],
          status: "default",
          uploadedAt: new Date().toISOString(),
        },
      ];

      const shoppingEditorPick = row;
      if (shoppingEditorPick.id) {
        const getByUserId = await getShoppingAllItemsById(
          shoppingEditorPick.id
        );
        const oldImages =
          getByUserId.images && getByUserId.images.length > 0
            ? [...getByUserId.images, ...metadata]
            : metadata;
        const rest = {
          id: shoppingEditorPick.id,
          title: shoppingEditorPick.title,
          subtitle: shoppingEditorPick.subtitle,
          condition: shoppingEditorPick.condition,
          price: shoppingEditorPick.price,
          category_id: shoppingEditorPick.category_id,
          parent_key: shoppingEditorPick.parent_key,
          images: oldImages,
          user_id: auth.user?.id,
        } as IShoppingAllItems;

        updateShoppingAllItems(rest)
          .then()
          .catch((e) => errors(e))
          .finally(() => {
            // isLoading.value = false;
          });

        onSuccess();
        return false;
      }
      // Notify Ant Design upload success
      // await saveAvatar({ profile_url: urlData.publicUrl });
    } catch (err: any) {
      message.error(`Upload failed: ${err.message}`);
      onError(err); // Notify Ant Design upload failure
    }
  };
};

const handleCancel = () => {
  previewVisible.value = false;
  previewTitle.value = "";
};

const deleteImage = async (bucketName: string, filePath: string) => {
  const { data, error } = await supabase.storage
    .from(bucketName)
    .remove([filePath]);

  if (error) {
    throw new Error(`Error deleting image: ${error.message}`);
  }
  return data;
};

const handleRemove = (id: number) => {
  return async (file: any) => {
    return new Promise((resolve) => {
      modal.confirm({
        title: "Are you sure you want to delete this image?",
        content: `Image: ${file.name}`,
        async onOk() {
          try {
            // Extract file path (e.g., from file.path or parse file.url)
            const fileName = file.name.replace(/\s+/g, "_");
            const filePath = `${storageAllItems}/${fileName}`;
            if (!filePath) {
              message.error("Invalid file path");
              resolve(false);
              return;
            }
            // Wait for Supabase deletion
            await deleteImage("shopping-storage", filePath);
            const { category, ...rest } = await getShoppingAllItemsById(id);
            const oldImages = rest.images?.filter(
              (i) => i.fileName !== fileName
            );
            updateShoppingAllItems({
              ...rest,
              images: oldImages,
            })
              .then()
              .catch((e) => errors(e))
              .finally();
            deleted();
            resolve(true); // Allow removal from preview
          } catch (err: any) {
            message.error(`Failed to remove image: ${err.message}`);
            resolve(false); // Prevent removal from preview
          }
        },
        onCancel() {
          console.log("Cancel");
          resolve(false); // Return false if user cancels
        },
        class: "test",
      });
    });
  };
};

const success = () => {
  message.success("Created successfully", 5);
};

const update = () => {
  message.success("Updated successfully", 5);
};

const errors = (msg: string) => {
  message.error(msg, 5);
};

const deleted = () => {
  message.success("Deleted successfully", 5);
};

const edit = (key: string) => {
  editableData[key] = cloneDeep(
    dataSource.value.filter((item) => key === item.key)[0]
  );
};

const deleteRecord = (id: number, key: string) => {
  deleteShoppingAllItems(id)
    .then(() => {
      dataSource.value = dataSource.value.filter((item) => item.key !== key);
      deleted();
    })
    .catch()
    .finally();
};

const save = (key: string) => {
  Object.assign(
    dataSource.value.filter((item) => key === item.key)[0],
    editableData[key]
  );
  const plainData = editableData[key];
  if (auth.user) {
    const newData = {
      id: plainData.id,
      title: plainData.title,
      subtitle: plainData.subtitle,
      size: plainData.size,
      details: plainData.details,
      condition: plainData.condition,
      price: plainData.price,
      user_id: auth.user.id,
    } as IShoppingAllItems;
    try {
      updateShoppingAllItems(newData)
        .then(() => {
          update();
          delete editableData[key];
        })
        .catch((e) => errors(e))
        .finally();
    } catch (error) {
      console.log("error", error);
    }
  }
};

const saveCategory = (k: string, keyId: string) => {
  const { fileList, key, ...rest } = dataSource.value.filter(
    (item) => keyId === item.key
  )[0];
  if (auth.user) {
    const newData = {
      ...rest,
      user_id: auth.user.id,
      category_id: k,
    } as IShoppingAllItems;
    try {
      updateShoppingAllItems(newData)
        .then(() => {
          update();
          Object.assign(
            dataSource.value.filter((item) => keyId === item.key)[0],
            {
              category_id: k,
            }
          );
        })
        .catch((e) => errors(e))
        .finally();
    } catch (error) {
      console.log("error", error);
    }
  }
};

const saveCategoryGroup = (k: string, keyId: string) => {
  const { fileList, key, ...rest } = dataSource.value.filter(
    (item) => keyId === item.key
  )[0];
  if (auth.user) {
    const newData = {
      ...rest,
      user_id: auth.user.id,
      parent_key: k,
    } as IShoppingAllItems;
    try {
      updateShoppingAllItems(newData)
        .then(() => {
          update();
          Object.assign(
            dataSource.value.filter((item) => keyId === item.key)[0],
            {
              parent_key: k,
            }
          );
        })
        .catch((e) => errors(e))
        .finally();
    } catch (error) {
      console.log("error", error);
    }
  }
};

const handleAdd = () => {
  if (auth.user) {
    const newData = {
      title: "",
      subtitle: "",
      condition: "",
      size: "",
      details: "",
      price: 0,
      images: [],
      user_id: auth.user.id,
      category_id: null as any,
      parent_key: null as any,
    } as IShoppingAllItems;
    try {
      insertShoppingAllItems([newData])
        .then((res) => {
          const e = res[0]; // grab the first index.
          const pre = {
            id: e.id,
            key: `${e.id}`,
            title: e.title,
            subtitle: e.subtitle,
            size: e.size,
            details: e.details,
            condition: e.condition,
            category_id: null as any,
            parent_key: null as any,
            price: e.price,
            fileList: [],
          } as DataItem;
          dataSource.value.unshift(pre);
          success();
        })
        .catch((e) => errors(e))
        .finally();
    } catch (error) {
      console.log("error", error);
    }
  }
};

const cancel = (key: string) => {
  delete editableData[key];
};

const fetchAllData = async () => {
  if (auth.user) {
    const shoppingBanners = await getShoppingAllItems(auth.user.id);
    for (const i of shoppingBanners) {
      const imagesList = [];
      if (i.images && i.images.length > 0) {
        for (const img of i.images) {
          const tempImg = await getImageUrl(img.fileName, storageAllItems);
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
        key: `${i.id}`,
        title: i.title,
        subtitle: i.subtitle,
        condition: i.condition,
        size: i.size,
        details: i.details,
        category_id: `${i.category_id ?? ""}`,
        parent_key: `${i.parent_key ?? ""}`,
        price: i.price,
        fileList: imagesList,
      } as DataItem;
      data.push(pre);
      // dynamicValidateForm.editors.push(pre);
    }
  }
};

const fetchAllCategories = async () => {
  if (auth.user) {
    const categories = await getShoppingCategoryPublic();
    for (const i of categories) {
      const pre = {
        id: `${i.id}`,
        key: `${i.id}`,
        title: i.title,
        parent_category: i.parent_category,
      };
      options.value?.push(pre);
      if (
        !optionsGroup.value?.some(
          (c) => c.parent_category === i.parent_category
        )
      ) {
        optionsGroup.value?.push(pre);
      }
      // dynamicValidateForm.editors.push(pre);
    }
  }
};

watch(refreshKey, () => {
  fetchAllData();
});

onMounted(async () => {
  await fetchAllData();
  await fetchAllCategories();
});

watch(uploadedFiles, (newVal) => {
  console.log("newVal");
  if (uploadRef.value) {
    (uploadRef.value as any).style.setProperty(
      "--item-margin",
      newVal.length >= 1 ? "-50px" : "0px"
    );
  }
});
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
:deep(.ant-upload-list-item-container) {
  max-width: 50px;
}
/* Override Ant Design's default picture card size */
:deep(.ant-upload.ant-upload-select-picture-card),
:deep(.ant-upload-list-picture-card .ant-upload-list-item) {
  width: 50px !important; /* Your custom width */
  height: 50px !important; /* Your custom height */
  font-size: 10px;
}

:deep(.ant-upload-list) {
  max-height: 50px;
}
</style>
