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
          action="/upload.do"
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
    <!-- <a-form-item v-bind="formItemLayoutWithOutLabel"> -->
    <a-button @click="resetForm">Reset</a-button>
    <a-button
      type="primary"
      style="margin-left: 10px"
      html-type="submit"
      :loading="isLoading"
      @click="submitForm"
      >Submit</a-button
    >
    <!-- </a-form-item> -->
  </a-form>
</template>

<script setup lang="ts">
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons-vue";
import { message, type FormInstance } from "ant-design-vue";
import dayjs from "dayjs";
import { onMounted, reactive, ref, toRaw } from "vue";
import {
  getWorkExperiences,
  insertWorkExperiences,
  updateWorkExperiences,
  type IWorkExperiences,
} from "../services/WorkService";
import { useAuthStore } from "../stores/auth";

interface WorkExperience {
  id: number | null;
  key: number;
  dateRange: any;
  link: string;
  description: string;
  fileList: [];
}

const auth = useAuthStore();

const formRef = ref<FormInstance>();
// const fileList = ref<UploadProps['fileList']>([])
const isLoading = ref(false);
const previewVisible = ref(false);
const previewImage = ref("");
const previewTitle = ref("");
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

const submitForm = () => {
  console.log("values", dynamicValidateForm.experiences);
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
              description: i.description,
              images: {},
              user_id: auth.user?.id,
            } as IWorkExperiences)
        );
        const insertPlainData = plainDataMap.filter((i) => !i.id);
        const updatePlainData = plainDataMap.filter((i) => i.id);
        if (insertPlainData.length > 0) {
          try {
            insertWorkExperiences(insertPlainData)
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
  const index = dynamicValidateForm.experiences.indexOf(item);
  if (index !== -1) {
    dynamicValidateForm.experiences.splice(index, 1);
  }
};

const addExperience = () => {
  dynamicValidateForm.experiences.push({
    id: null,
    dateRange: "",
    link: "",
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

const success = () => {
  message.success("Created successfully", 5);
};

const update = () => {
  message.success("Updated successfully", 5);
};

const errors = (msg: string) => {
  message.error(msg, 5);
};

onMounted(async () => {
  if (auth.user) {
    const workExperiences = await getWorkExperiences(auth.user.id);
    workExperiences.map((i) => {
      const pre = {
        id: i.id,
        key: new Date(`${i.created_at}`).getTime(),
        dateRange: [dayjs(i.start_date), dayjs(i.end_date)],
        link: i.link,
        description: i.description,
        fileList: [],
      } as WorkExperience;
      dynamicValidateForm.experiences.push(pre);
    });
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
