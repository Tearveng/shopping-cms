<template>
  <a-layout-footer class="custom-footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3>Customer Service</h3>
        <a-flex vertical align="flex-start">
          <a-button type="link">Contact Us</a-button>
          <a-button type="link">Shipping</a-button>
          <a-button type="link">Returns</a-button>
          <a-button type="link">FAQ</a-button>
          <a-button type="link">Give us feedback</a-button>
        </a-flex>
      </div>

      <div class="footer-section">
        <h3>Shop With Us</h3>
        <a-flex vertical align="flex-start">
          <a-button type="link">Certified</a-button>
          <a-button type="link">Personal Shopping</a-button>
          <a-button type="link">Gift Cards</a-button>
        </a-flex>
      </div>
      <div class="footer-section">
        <h3>About Us</h3>
        <a-flex vertical align="flex-start">
          <a-button type="link">About</a-button>
          <a-button type="link">Locations</a-button>
          <a-button type="link">Influencer Program</a-button>
        </a-flex>
      </div>

      <div class="footer-section">
        <h3>Legal</h3>
        <a-flex vertical align="flex-start">
          <a-button type="link">Privacy Policy</a-button>
          <a-button type="link">Terms of use</a-button>
          <a-button type="link">Cookie Policy</a-button>
        </a-flex>
      </div>

      <div class="footer-section">
        <h3>Connect With Us</h3>
        <div class="social-icons">
          <FacebookFilled />
          <InstagramFilled />
          <TwitterCircleFilled />
        </div>
        <!-- <a-input-search
          placeholder="Subscribe to newsletter"
          enter-button="Subscribe"
          size="large"
          @search="onSubscribe"
        /> -->
      </div>
    </div>

    <div class="footer-bottom">©2023 My Company. All rights reserved.</div>
  </a-layout-footer>
</template>

<script setup lang="ts">
import { FacebookFilled, InstagramFilled, TwitterCircleFilled } from "@ant-design/icons-vue";
const onSubscribe = (value: string) => {
  console.log("Subscribed:", value);
  // Add your subscription logic here
};
</script>

<style scoped>
.custom-footer {
  padding: 2rem 2rem;
  background-color: transparent;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  max-width: 1280px;
  flex-wrap: wrap;
}

.footer-section {
  flex: 1;
  min-width: 244px;
  margin-bottom: 24px;
}

.footer-section h3 {
  color: #fff;
  margin-bottom: 16px;
}

.footer-bottom {
  text-align: center;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #e8e8e8;
  color: #fff;
}

.social-icons {
  display: flex;
  gap: 1.5rem;
  font-size: 1.2rem;
  margin-bottom: 16px;
  color: #fff;
}

:deep(.ant-btn) {
  padding: 0;
  color: #fff;
  border-radius: 0;
}

:deep(.ant-btn:not(:hover)) {
  text-decoration: underline;
}

:deep(.ant-btn:hover) {
  color: #fff;
  border-bottom: 0.1rem solid #fff;
  text-decoration: underline !important;
}

@media (max-width: 768px) {
  .custom-footer {
    padding: 2rem 1rem;
    width: 100%;
  }
  .footer-section {
    margin-bottom: 32px;
  }
}
</style>