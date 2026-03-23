<script setup lang="ts">
import { onMounted, ref } from "vue";
import { supabase } from "../../lib/supabase";

const password = ref("");
const loading = ref(false);
const message = ref("");

onMounted(async () => {
  const hash = window.location.hash;
  const params = new URLSearchParams(hash.replace("#", ""));

  const access_token = params.get("access_token");
  const refresh_token = params.get("refresh_token");

  if (access_token && refresh_token) {
    const { error } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });

    if (error) {
      message.value = "Invalid or expired reset link";
    }
  } else {
    message.value = "Missing reset token";
  }
});

const handleReset = async () => {
  if (password.value.length < 6) {
    message.value = "Password must be at least 6 characters";
    return;
  }

  loading.value = true;

  const { error } = await supabase.auth.updateUser({
    password: password.value,
  });

  loading.value = false;

  if (error) {
    message.value = error.message;
  } else {
    message.value = "Password updated successfully!";
    // redirect after success
    setTimeout(() => {
      window.location.href = "/login";
    }, 1500);
  }
};
</script>

<template>
  <div
    style="
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 50px;
    "
  >
    <h2>Reset Password</h2>

    <div style="min-width: 350px">
      <a-typography>Password</a-typography>
      <a-input type="password" v-model="password" placeholder="Email" />

      <br />
      <br />

      <a-button type="primary" @click="handleReset" :loading="loading">
        {{ loading ? "Updating..." : "Update Password" }}</a-button
      >

      <p v-if="message" style="margin-top: 10px; color: red">
        {{ message }}
      </p>
    </div>
  </div>
</template>
