<template>
  <a-form
    ref="formRef"
    name="dynamic_form_item"
    :model="dynamicValidateForm"
    v-bind="formItemLayoutWithOutLabel"
    style="width: 100%; padding: 20px"
  >
    <a-typography-text>Work experience</a-typography-text>
    <br />
    <br />
    <a-form-item
      v-for="(experience, index) in dynamicValidateForm.experiences"
      :key="experience.key"
      v-bind="formItemLayout"
    >
      <a-form-item
        style="margin-bottom: -16px"
        :name="['experiences', index, 'dateRange']"
        :rules="[
          { required: true, message: 'Link is required', trigger: 'change' },
        ]"
      >
        <MinusCircleOutlined
          style="margin-right: 12px"
          v-if="dynamicValidateForm.experiences.length > 1"
          class="dynamic-delete-button"
          @click="removeDomain(experience)"
        />
        <a-range-picker v-model:value="experience.dateRange" />
      </a-form-item>
      <a-form-item
        style="margin-bottom: -16px"
        :name="['experiences', index, 'alias']"
        :rules="[
          { required: true, message: 'Alias is required', trigger: 'change' },
        ]"
      >
        <a-input
          name="experience.alias"
          v-model:value="experience.alias"
          placeholder="Alias"
          style="width: 100%; margin-right: 8px"
        />
      </a-form-item>
      <a-form-item
        style="margin-bottom: -16px"
        :name="['experiences', index, 'link']"
        :rules="[
          { required: true, message: 'Link is required', trigger: 'change' },
        ]"
      >
        <a-input
          name="experience.link"
          v-model:value="experience.link"
          placeholder="Link"
          style="width: 100%; margin-right: 8px"
        />
      </a-form-item>
      <a-form-item
        style="margin-bottom: -16px"
        :name="['experiences', index, 'description']"
        :rules="[
          {
            required: true,
            message: 'Description is required',
            trigger: 'change',
          },
        ]"
      >
        <a-textarea
          v-model:value="experience.description"
          placeholder="Description"
          :auto-size="{ minRows: 3, maxRows: 5 }"
        />
      </a-form-item>
      <a-form-item :name="['experiences', index, 'fileList']">
        <a-upload
          v-model:file-list="experience.fileList"
          @preview="handlePreview"
          :before-upload="beforeUpload"
          :remove="handleRemove(Number(experience.id), index)"
          :custom-request="customUpload({ indexRow: index })"
          list-type="picture-card"
        >
          <div>
            <PlusOutlined />
            <div style="margin-top: 8px">Upload</div>
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
      </a-form-item>
    </a-form-item>
    <a-form-item v-bind="formItemLayoutWithOutLabel">
      <a-button type="dashed" style="width: 60%" @click="addExperience">
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
import dayjs from "dayjs";
import { h, onMounted, reactive, ref, toRaw } from "vue";
import { supabase } from "../lib/supabase";
import {
deleteWorkExperience,
getImageUrl,
getWorkExperiences,
getWorkExperiencesById,
insertWorkExperiences,
updateWorkExperiences,
type IWorkExperiences,
} from "../services/WorkService";
import { useAuthStore } from "../stores/auth";

export interface WorkExperience {
  id: number | null;
  key: number;
  dateRange: any;
  link: string;
  alias: string;
  description: string;
  fileList: any[];
}

const auth = useAuthStore();

const formRef = ref<FormInstance>();
// const fileList = ref<UploadProps['fileList']>([])
const isLoading = ref(false);
const previewVisible = ref(false);
const previewImage = ref("");
const previewTitle = ref("");
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
const dynamicValidateForm = reactive<{ experiences: WorkExperience[] }>({
  experiences: [],
});

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

const customUpload = ({ indexRow }: any) => {
  return async ({ file, onSuccess, onError }: any) => {
    try {
      // isLoadingAvatar.value = true;
      // Generate unique file path
      const fileName = file.name.replace(/\s+/g, "_");
      const filePath = `${auth.user?.id}/${Date.now()}-${fileName}`;
      const { data, error: uploadError } = await supabase.storage
        .from("portfolio-cms") // Replace with your bucket name
        .upload(filePath, file, {
          cacheControl: "3600", // Cache for 1 hour
          upsert: false, // Prevent overwriting
          contentType: file.type, // Set MIME type (e.g., image/jpeg)
        });
      console.log("data", data);

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
      console.log("metadata", metadata);
      const workExperience = dynamicValidateForm.experiences[indexRow];
      if (workExperience.id) {
        const getByUserId = await getWorkExperiencesById(workExperience.id);
        const oldImages =
          getByUserId.images && getByUserId.images.length > 0
            ? [...getByUserId.images, ...metadata]
            : metadata;
        const rest = {
          id: workExperience.id,
          start_date: workExperience.dateRange[0],
          end_date: workExperience.dateRange[1],
          link: workExperience.link,
          description: workExperience.description,
          images: oldImages,
          user_id: auth.user?.id,
        } as IWorkExperiences;

        updateWorkExperiences(rest)
          .then()
          .catch((e) => errors(e))
          .finally(() => {
            isLoading.value = false;
          });
        // const { data: publicUrl } = supabase.storage
        //   .from("portfolio-cms")
        //   .getPublicUrl(filePath);

        onSuccess(data);
      }
      // Notify Ant Design upload success
      // await saveAvatar({ profile_url: urlData.publicUrl });
    } catch (err: any) {
      message.error(`Upload failed: ${err.message}`);
      onError(err); // Notify Ant Design upload failure
    }
  };
};

const showConfirm = (item: WorkExperience) => {
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
        deleteWorkExperience(item.id)
          .then(() => {
            const index = dynamicValidateForm.experiences.indexOf(item);
            if (index !== -1) {
              dynamicValidateForm.experiences.splice(index, 1);
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

const submitForm = () => {
  if (formRef.value) {
    formRef.value
      .validate()
      .then(() => {
        isLoading.value = true;
        const plainData = toRaw(dynamicValidateForm.experiences).map((exp) => {
          const rawRange = toRaw(exp.dateRange);
          return {
            ...exp,
            dateRange: rawRange.map((d: any) => d?.format("YYYY-MM-DD")),
          };
        });
        const plainDataMap = plainData.map(
          (i) =>
            ({
              id: i.id,
              start_date: i.dateRange[0],
              end_date: i.dateRange[1],
              link: i.link,
              alias: i.alias,
              description: i.description,
              images: {},
              user_id: auth.user?.id,
            } as IWorkExperiences)
        );
        const insertPlainData = plainDataMap.filter((i) => !i.id);
        const updatePlainData = plainDataMap.filter((i) => i.id);
        if (insertPlainData.length > 0) {
          try {
            insertWorkExperiences(
              insertPlainData.map(({ id, ...rest }) => ({ ...rest }))
            )
              .then(() => success())
              .catch((e) => errors(e))
              .finally(() => {
                isLoading.value = false;
              });
          } catch (error) {
            console.log("error", error);
          }
        }

        if (updatePlainData.length > 0) {
          try {
            updatePlainData.forEach((u) => {
              updateWorkExperiences(u)
                .then()
                .catch((e) => errors(e))
                .finally(() => {
                  isLoading.value = false;
                });
            });
            update();
          } catch (error) {
            console.log("error", error);
          }
        }

        console.log("values", plainData);
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

const handleCancel = () => {
  previewVisible.value = false;
  previewTitle.value = "";
};

const removeDomain = (item: WorkExperience) => {
  if (item.id) {
    showConfirm(item);
  } else {
    const index = dynamicValidateForm.experiences.indexOf(item);
    if (index !== -1) {
      dynamicValidateForm.experiences.splice(index, 1);
    }
  }
};

const addExperience = () => {
  dynamicValidateForm.experiences.push({
    id: null,
    dateRange: "",
    link: "",
    alias: "",
    description: "",
    key: Date.now(),
    fileList: [],
  });
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

const deleteImage = async (bucketName: string, filePath: string) => {
  const { data, error } = await supabase.storage
    .from(bucketName)
    .remove([filePath]);

  if (error) {
    throw new Error(`Error deleting image: ${error.message}`);
  }
  return data;
};

const handleRemove = (id: number, _: number) => {
  return async (file: any) => {
    return new Promise((resolve) => {
      modal.confirm({
        title: "Are you sure you want to delete this image?",
        content: `Image: ${file.name}`,
        async onOk() {
          try {
            // Extract file path (e.g., from file.path or parse file.url)
            const fileName = file.name.replace(/\s+/g, "_");
            const filePath = `${auth.user?.id}/${fileName}`;
            if (!filePath) {
              message.error("Invalid file path");
              resolve(false);
              return;
            }
            console.log("fileName", fileName);
            // Wait for Supabase deletion
            await deleteImage("portfolio-cms", filePath);
            const getByUserId = await getWorkExperiencesById(id);
            console.log("getByUserId", getByUserId);
            const oldImages = getByUserId.images.filter(
              (i) => i.fileName !== fileName
            );
            updateWorkExperiences({ ...getByUserId, images: oldImages })
              .then()
              .catch((e) => errors(e))
              .finally(() => {
                isLoading.value = false;
              });
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

const deleted = () => {
  message.success("Deleted successfully", 5);
};

const errors = (msg: string) => {
  message.error(msg, 5);
};

onMounted(async () => {
  if (auth.user) {
    const workExperiences = await getWorkExperiences(auth.user.id);
    for (const i of workExperiences) {
      const imagesList = [];
      if (i.images && i.images.length > 0) {
        for (const img of i.images) {
          const tempImg = await getImageUrl(img.fileName, auth.user.id);
          console.log("tempImg", tempImg);
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
        dateRange: [dayjs(i.start_date), dayjs(i.end_date)],
        link: i.link,
        alias: i.alias,
        description: i.description,
        fileList: imagesList,
      } as WorkExperience;
      dynamicValidateForm.experiences.push(pre);
    }
  }
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
