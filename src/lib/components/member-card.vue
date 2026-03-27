<template>
  <div class="member-card-container">
    <a-flex vertical justify="center" class="member-card-content">
      <a-button
        class="rotate-btn"
        type="primary"
        style="background-color: darkgray"
        @click="() => showModal('silver')"
        >Silver</a-button
      >
      <a-button
        class="rotate-btn"
        type="primary"
        style="background-color: goldenrod"
        @click="() => showModal('gold')"
        >Gold</a-button
      >
    </a-flex>

    <a-modal
      v-model:open="open"
      :title="modelContent[cardType].cardType"
      centered
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      ok-text="Close"
      :cancel-button-props="{ style: { display: 'none' } }"
    >
      <br />
      <a-flex vertical justify="center" align="center">
        <img
          :src="modelContent[cardType].image"
          :alt="modelContent[cardType].cardType"
          width="300px"
          style="border-radius: 8px"
        />
      </a-flex>
      <br />
    </a-modal>
  </div>
</template>

<style lang="css" scoped>
.member-card-container {
  width: 100%;
  max-width: 1280px;
  position: relative;
  z-index: 1;
}

.member-card-content {
  position: absolute;
  left: 16px;
  gap: 32px;
}

.rotate-btn {
  padding: 0 10px;
  display: flex;
  align-items: flex-end;
  border-radius: 0 0 8px 8px;
  transform: rotate(270deg);
}

@media (max-width: 575px) {
  .member-card-content {
    left: -22px;
  }
}
</style>

<script setup lang="ts">
import { ref } from "vue";

interface IModelContent {
  silver: IModelCard;
  gold: IModelCard;
}

interface IModelCard {
  cardType: string;
  cardDescription: string;
  image: string;
}

type ICardType = "silver" | "gold";

const modelContent = ref<IModelContent>({
  silver: {
    cardType: "Silver",
    cardDescription: "",
    image: "/silver-card.jpg",
  },
  gold: { cardType: "Gold", cardDescription: "", image: "/gold-card.jpg" },
});

const open = ref<boolean>(false);
const cardType = ref<ICardType>("silver");
const confirmLoading = ref<boolean>(false);

const showModal = (type: ICardType) => {
  open.value = true;
  cardType.value = type;
};

const handleOk = () => {
  confirmLoading.value = true;
  setTimeout(() => {
    open.value = false;
    confirmLoading.value = false;
  }, 1000);
};
</script>
