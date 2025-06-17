<template>
  <a-form
    ref="formRef"
    name="dynamic_form_item"
    :model="dynamicValidateForm"
    v-bind="formItemLayoutWithOutLabel"
    style="width: 100%; padding: 20px"
  >
    <a-typography-text>Contact</a-typography-text>
    <br />
    <br />
    <a-form-item
      v-for="(contact, index) in dynamicValidateForm.contacts"
      :key="contact.key"
      v-bind="formItemLayout"
    >
      <a-form-item
        style="margin-bottom: -16px"
        :name="['contacts', index, 'title']"
        :rules="[
          { required: true, message: 'Title is required', trigger: 'change' },
        ]"
      >
        <a-flex>
          <MinusCircleOutlined
            style="margin-right: 12px"
            v-if="dynamicValidateForm.contacts.length > 1"
            class="dynamic-delete-button"
            @click="removeDomain(contact)"
          />
          <a-input
            name="contact.title"
            v-model:value="contact.title"
            placeholder="Title"
            style="width: 100%"
          />
        </a-flex>
      </a-form-item>

      <a-form-item
        style="margin-bottom: -16px; width: 100%; flex-direction: row"
        :name="['contacts', index, 'alias']"
        :rules="[
          {
            required: true,
            message: 'Alias is required',
            trigger: 'change',
          },
        ]"
      >
        <a-input
          name="contact.alias"
          v-model:value="contact.alias"
          placeholder="Alias"
          style="width: 100%; margin-right: 8px"
        />
      </a-form-item>
      <a-form-item
        style="margin-bottom: -16px"
        :name="['contacts', index, 'url']"
        :rules="[
          {
            required: true,
            message: 'Url is required',
            trigger: 'change',
          },
        ]"
      >
        <a-input
          addon-before="https://"
          name="contact.url"
          v-model:value="contact.url"
          placeholder="Url"
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
      @click="submitForm"
      >Submit
    </a-button>
  </a-form>
  <contextHolder />
</template>

<script setup lang="ts">
import { ExclamationCircleOutlined, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons-vue";
import { message, Modal, type FormInstance } from "ant-design-vue";
import { h, onMounted, reactive, ref, toRaw } from "vue";
import {
deleteContact,
getContacts,
insertContacts,
updateContacts,
type IContact,
} from "../services/ContactService";
import { useAuthStore } from "../stores/auth";

interface Contact {
  id: number | null;
  key: number;
  title: string;
  alias: string;
  url: string;
}

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

const showConfirm = (item: Contact) => {
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
        deleteContact(item.id)
          .then(() => {
            const index = dynamicValidateForm.contacts.indexOf(item);
            if (index !== -1) {
              dynamicValidateForm.contacts.splice(index, 1);
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

const dynamicValidateForm = reactive<{ contacts: Contact[] }>({
  contacts: [],
});

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

const submitForm = () => {
  if (formRef.value) {
    formRef.value
      .validate()
      .then(() => {
        isLoading.value = true;
        const plainData = toRaw(dynamicValidateForm.contacts);
        const plainDataMap = plainData.map(
          (i) =>
            ({
              id: i.id ?? null,
              title: i.title,
              alias: i.alias,
              url: i.url,
              user_id: auth.user?.id,
            } as IContact)
        );

        const insertPlainData = plainDataMap.filter((i) => !i.id);
        const updatePlainData = plainDataMap.filter((i) => i.id);
        if (insertPlainData.length > 0) {
          try {
            insertContacts(
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
              updateContacts(u)
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

const removeDomain = (item: Contact) => {
  if (item.id) {
    showConfirm(item);
  } else {
    const index = dynamicValidateForm.contacts.indexOf(item);
    if (index !== -1) {
      dynamicValidateForm.contacts.splice(index, 1);
    }
  }
};
const addDomain = () => {
  dynamicValidateForm.contacts.push({
    id: null,
    key: Date.now(),
    title: "",
    alias: "",
    url: "",
  });
};

onMounted(async () => {
  if (auth.user) {
    const contacts = await getContacts(auth.user.id);
    contacts.map((i) => {
      const pre = {
        id: i.id,
        title: i.title,
        key: new Date(`${i.created_at}`).getTime(),
        alias: i.alias,
        url: i.url,
      } as Contact;
      dynamicValidateForm.contacts.push(pre);
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
