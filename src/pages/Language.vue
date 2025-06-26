<template>
  <a-form
    ref="formRef"
    name="dynamic_form_item"
    :model="dynamicValidateForm"
    v-bind="formItemLayoutWithOutLabel"
    style="width: 100%; padding: 20px"
  >
    <a-typography-text>Language</a-typography-text>
    <br />
    <br />
    <a-form-item
      v-for="(language, index) in dynamicValidateForm.languages"
      :key="language.key"
      v-bind="formItemLayout"
    >
      <a-form-item
        style="margin-bottom: -16px"
        :name="['languages', index, 'title']"
        :rules="[
          { required: true, message: 'Title is required', trigger: 'change' },
        ]"
      >
        <a-flex>
          <MinusCircleOutlined
            style="margin-right: 12px"
            v-if="dynamicValidateForm.languages.length > 1"
            class="dynamic-delete-button"
            @click="removeDomain(language)"
          />
          <a-input
            name="language.title"
            v-model:value="language.title"
            placeholder="Title"
            style="width: 100%"
          />
        </a-flex>
      </a-form-item>

      <a-form-item
        style="margin-bottom: -16px; width: 100%; flex-direction: row"
        :name="['languages', index, 'alias']"
        :rules="[
          {
            required: true,
            message: 'Alias is required',
            trigger: 'change',
          },
        ]"
      >
        <a-input
          name="language.alias"
          v-model:value="language.alias"
          placeholder="Alias"
          style="width: 100%; margin-right: 8px"
        />
      </a-form-item>
    </a-form-item>
    <a-form-item v-bind="formItemLayoutWithOutLabel">
      <a-button type="dashed" style="width: 60%" @click="addDomain">
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
      >Submit
    </a-button>
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
import {
deleteLanguage,
getLanguages,
insertLanguages,
updateLanguage,
type ILanguage,
} from "../services/LanguageService";
import { useAuthStore } from "../stores/auth";

export interface Language {
  id?: number;
  key: number;
  title: string;
  alias: string;
}

const refreshKey = ref(0);
const auth = useAuthStore();
const isLoading = ref();
const formRef = ref<FormInstance>();
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

const showConfirm = (item: Language) => {
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
        deleteLanguage(item.id)
          .then(() => {
            const index = dynamicValidateForm.languages.indexOf(item);
            if (index !== -1) {
              dynamicValidateForm.languages.splice(index, 1);
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

const dynamicValidateForm = reactive<{ languages: Language[] }>({
  languages: [],
});

const update = () => {
  message.success("Updated successfully", 5);
};

const deleted = () => {
  message.success("Deleted successfully", 5);
};

const errors = (msg: string) => {
  message.error(msg, 5);
};

const submitForm = async () => {
  if (formRef.value) {
    formRef.value
      .validate()
      .then(async () => {
        isLoading.value = true;
        const plainData = toRaw(dynamicValidateForm.languages);
        const plainDataMap = plainData.map(
          (i) =>
            ({
              id: i.id ?? undefined,
              title: i.title,
              alias: i.alias,
              user_id: auth.user?.id,
            } as ILanguage)
        );

        const insertPlainData = plainDataMap.filter((i) => !i.id);
        const updatePlainData = plainDataMap.filter((i) => i.id);
        if (insertPlainData.length > 0) {
          try {
            insertLanguages(
              insertPlainData.map(({ id, ...rest }) => ({ ...rest }))
            )
              .then()
              .catch((e) => errors(e))
              .finally();
          } catch (error) {
            console.log("error", error);
          }
        }

        if (updatePlainData.length > 0) {
          try {
            updatePlainData.forEach((u) => {
              updateLanguage(u)
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

const removeDomain = (item: Language) => {
  if (item.id) {
    showConfirm(item);
  } else {
    const index = dynamicValidateForm.languages.indexOf(item);
    if (index !== -1) {
      dynamicValidateForm.languages.splice(index, 1);
    }
  }
};
const addDomain = () => {
  dynamicValidateForm.languages.push({
    key: Date.now(),
    title: "",
    alias: "",
  });
};

const fetchAllData = async () => {
  if (auth.user) {
    const contacts = await getLanguages(auth.user.id);
    contacts.map((i) => {
      const pre = {
        id: i.id,
        title: i.title,
        key: new Date(`${i.created_at}`).getTime(),
        alias: i.alias,
      } as Language;
      dynamicValidateForm.languages.push(pre);
    });
  }
};

watch(refreshKey, () => {
  dynamicValidateForm.languages = [];
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
