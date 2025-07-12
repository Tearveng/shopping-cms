<template>
  <a-flex class="container" vertical>
    <a-row style="width: 100%;">
      <a-col :span="1" style="width: 158px;">
      </a-col>
      <a-col :span="22" >
        <a-flex vertical align="center" class="container-child">
          <a-typography class="title-text"
            >Live Shopping with FASHIONPHILE</a-typography
          >
          <a-typography style="padding-top: 1rem; text-align: center; font-size: 1rem;"
            >Tune in Tuesdays on Instagram from 4:30 to 6:30PM ET. Shop
            ultra-luxury finds, catch live deals, and ask us anything in real
            time.</a-typography
          >
          <a
            style="
              padding-top: 1rem;
              font-size: 1rem;
              text-decoration: underline;
              color: #000;
            "
            >Follow Us</a
          >
        </a-flex>
      </a-col>
      <a-col :span="1"  style="width: 158px;">
      </a-col>
    </a-row>
  </a-flex>
</template>

<style scoped>
/* In your global CSS or scoped <style> */
.responsive-text {
  font-size: clamp(
    1.35rem,
    2vw,
    1.6rem
  ); /* Min: 1rem, Preferred: 2vw, Max: 1.5rem */
  font-weight: 500;
  padding-bottom: 2rem;
}
.title-text {
  font-size: clamp(
    1.35rem,
    2vw,
    1.6rem
  );
  line-height: 1.4;
  font-weight: 500;
  text-align: center;
}
.container {
  width: 100%;
  margin: 0 auto;
  max-width: 1280px;
  align-items: center;
  background-color: rgb(239, 235, 234);
}
.container-child {
  padding: 3rem 0;
  width: 100%;
}
@media (max-width: 575px) {
  .container {
    padding: 0 1rem;
  }
}
</style>

<script setup lang="ts"></script>
