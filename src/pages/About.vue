<template>
  <form @submit="handleSubmit" @reset="handleReset" style="padding: 20px">
    <a-space direction="vertical" size="middle" style="width: 100%">
     <a-space direction="vertical" style="width: 100%">
       <a-typography-text>About me</a-typography-text>
       <a-textarea
           v-model:value="about"
           v-bind="aboutFieldAttrs"
           placeholder="Autosize height with minimum and maximum number of lines"
           :auto-size="{ minRows: 5, maxRows: 10 }"
       />
     </a-space>
     <a-space>
       <a-button>Reset</a-button>
       <a-button type="primary">Submit</a-button>
     </a-space>
    </a-space>

  </form>
</template>

<style scope>
</style>

<script setup lang="ts">
import { useForm } from '@vorms/core';
const sugarOptions = ['no', 'light', 'half', 'standard']

const { register, handleSubmit, handleReset } = useForm({
  initialValues: {
    about: '',
  },
  onSubmit(data) {
    console.log(data)
  }
})

const { value: about, attrs: aboutFieldAttrs } = register('about')
</script>