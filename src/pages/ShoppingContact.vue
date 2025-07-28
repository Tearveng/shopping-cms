<template>
  <a-form
    ref="formRef"
    name="dynamic_form_item"
    :model="dynamicValidateForm"
    v-bind="formItemLayoutWithOutLabel"
    style="width: 100%; padding: 20px"
  >
    <a-typography-text>Shopping Contact</a-typography-text>
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
        :name="['contacts', index, 'subtitle']"
        :rules="[
          {
            required: true,
            message: 'Subtitle is required',
            trigger: 'change',
          },
        ]"
      >
        <a-input
          name="contact.alias"
          v-model:value="contact.subtitle"
          placeholder="Alias"
          style="width: 100%; margin-right: 8px"
        />
      </a-form-item>

      <a-form-item
        style="margin-bottom: -16px"
        :name="['contacts', index, 'link']"
        :rules="[
          {
            required: true,
            message: 'Link is required',
            trigger: 'change',
          },
        ]"
      >
        <a-input
          addon-before="https://"
          name="contact.link"
          v-model:value="contact.link"
          placeholder="Link"
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
import { useAuthStore } from "../stores/auth";
import { deleteShoppingContact, getShoppingContacts, insertShoppingContacts, updateShoppingContacts, type IShoppingContact } from "../services/ContactService";

export interface ShoppingContact {
  id?: number;
  key: number;
  title: string;
  subtitle: string;
  link: string;
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

const showConfirm = (item: ShoppingContact) => {
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
        deleteShoppingContact(item.id)
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

const dynamicValidateForm = reactive<{ contacts: ShoppingContact[] }>({
  contacts: [],
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
        const plainData = toRaw(dynamicValidateForm.contacts);
        const plainDataMap = plainData.map(
          (i) =>
            ({
              id: i.id ?? undefined,
              title: i.title,
              subtitle: i.subtitle,
              link: i.link,
              user_id: auth.user?.id,
            } as IShoppingContact)
        );

        const insertPlainData = plainDataMap.filter((i) => !i.id);
        const updatePlainData = plainDataMap.filter((i) => i.id);
        if (insertPlainData.length > 0) {
          try {
            insertShoppingContacts(
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
              updateShoppingContacts(u)
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

const removeDomain = (item: ShoppingContact) => {
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
    key: Date.now(),
    title: "",
    subtitle: "",
    link: "",
  });
};

const fetchAllData = async () => {
  if (auth.user) {
    const contacts = await getShoppingContacts(auth.user.id);
    contacts.map((i) => {
      const pre = {
        id: i.id,
        title: i.title,
        key: new Date(`${i.created_at}`).getTime(),
        subtitle: i.subtitle,
        link: i.link,
      } as ShoppingContact;
      dynamicValidateForm.contacts.push(pre);
    });
  }
};

watch(refreshKey, () => {
  dynamicValidateForm.contacts = [];
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
