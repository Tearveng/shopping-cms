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
    <a-table :columns="columns" :data-source="dataSource" size="small" bordered>
      <template #bodyCell="{ column, text, record }">
        <template
          v-if="
            ['title', 'subtitle', 'condition', 'price'].includes(
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
        <template v-else-if="column.dataIndex === 'fileList'">
          <div
            :style="{
              '--margin-left': -record.fileList.length * 50 + 'px',
            }"
          >
            <a-upload
              ref="uploadRef"
              v-model:file-list="record.fileList"
              :before-upload="beforeUpload"
              :remove="handleRemove(Number(1), index)"
              :custom-request="customUpload({ indexRow: index })"
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
                <a @click="edit(record.key)">Delete</a>
              </a-flex>
            </span>
          </div>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts" setup>
import { cloneDeep } from "lodash-es";
import { onMounted, reactive, ref, watch } from "vue";
import type { UnwrapRef } from "vue";
import { PlusOutlined } from "@ant-design/icons-vue";
import {
  getShoppingAllItems,
  getShoppingAllItemsById,
  insertShoppingAllItems,
  storageAllItems,
  updateShoppingAllItems,
  type IShoppingAllItems,
} from "../services/AllItemsService";
import { useAuthStore } from "../stores/auth";
import { getImageUrl, storageBanner } from "../services/BannerService";
import { message } from "ant-design-vue";
import { supabase } from "../lib/supabase";

const columns = [
  {
    title: "Title",
    dataIndex: "title",
    // sorter: (a: DataItem, b: DataItem) => a.title.length - b.title.length,
    width: "25%",
  },
  {
    title: "Subtitle",
    dataIndex: "subtitle",
    width: "25%",
  },
  {
    title: "Images",
    dataIndex: "fileList",
    width: "20%",
  },
  {
    title: "Condition",
    dataIndex: "condition",
    width: "15%",
  },
  {
    title: "Price",
    dataIndex: "price",
    width: "10%",
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
  fileList: any[];
  condition: string;
  category: string;
  price: number;
}

const data: DataItem[] = reactive([]);
const refreshKey = ref(0);
// for (let i = 0; i < 100; i++) {
//   data.push({
//     id:i,
//     key: i.toString(),
//     title: `Edrward ${i}`,
//     subtitle: "",
//     fileList: ['asdasd', 'asdasd'],
//     condition: "London Park no.",
//     price: 32,
//   });
// }

const auth = useAuthStore();
const dataSource = ref(data);
const previewVisible = ref(false);
const previewImage = ref("");
const previewTitle = ref("");
const uploadedFiles = ref([]);
const uploadRef = ref(null);
const editableData: UnwrapRef<Record<string, DataItem>> = reactive({});

function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

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

const customUpload = ({ indexRow }: any) => {
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

      const shoppingEditorPick = dataSource.value[indexRow];
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
          category: shoppingEditorPick.category,
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

const handleRemove = (id: number, _: number) => {
  return async (file: any) => {};
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

const edit = (key: string) => {
  editableData[key] = cloneDeep(
    dataSource.value.filter((item) => key === item.key)[0]
  );
};
const save = (key: string) => {
  Object.assign(
    dataSource.value.filter((item) => key === item.key)[0],
    editableData[key]
  );
  console.log("editableData[key]", editableData[key].price);
  const plainData = editableData[key];
  if (auth.user) {
    const newData = {
      id: plainData.id,
      title: plainData.title,
      subtitle: plainData.subtitle,
      condition: plainData.condition,
      price: plainData.price,
      user_id: auth.user.id,
      category: "shopping_channel",
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

const handleAdd = () => {
  if (auth.user) {
    const newData = {
      title: "",
      subtitle: "",
      condition: "",
      price: 0,
      images: [],
      user_id: auth.user.id,
      category: "shopping_channel",
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
            condition: e.condition,
            price: e.price,
            fileList: [],
          } as DataItem;
          console.log(e);
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
          const tempImg = await getImageUrl(img.fileName, storageBanner);
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
        price: i.price,
        fileList: imagesList,
      } as DataItem;
      data.push(pre);
      // dynamicValidateForm.editors.push(pre);
    }
  }
};

watch(refreshKey, () => {
  fetchAllData();
});

onMounted(async () => {
  await fetchAllData();
});

watch(uploadedFiles, (newVal) => {
  console.log("newVal");
  if (uploadRef.value) {
    uploadRef.value.$el.style.setProperty(
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
/* Override Ant Design's default picture card size */
:deep(.ant-upload.ant-upload-select-picture-card),
:deep(.ant-upload-list-picture-card .ant-upload-list-item) {
  margin-left: var(--margin-left);
  width: 50px !important; /* Your custom width */
  height: 50px !important; /* Your custom height */
  font-size: 10px;
}
:deep(.ant-upload-list) {
  max-height: 50px;
}
</style>
