<template>
  <a-flex class="container" vertical>
    <img
      class="banner-image"
      src="https://images.ctfassets.net/tkr0x069m1it/6WKj5TyCrXMKxBmu5IYK4n/2d83701d98576600aa08e9ab850a2066/Desktop_Hero__8_.jpg?w=1986"
      alt="banner-image"
    />

    <a-flex class="content-banner" vertical>
      <a-flex class="text-block" vertical>
        <a-typography-text
          style="font-size: 1rem; letter-spacing: 0.2em; line-height: 1.4em"
          >FASHIONPHILE X NICOLE RICHIE</a-typography-text
        >
        <a-typography-text
          style="
            font-size: 2.5rem;
            font-weight: 500;
            line-height: 1.2em;
            padding-top: 0.5rem;
            padding-bottom: 1rem;
          "
          >Shop. Sell. Repeat.</a-typography-text
        >
        <a-typography-text
          style="font-size: 1rem; font-weight: 200; line-height: 1.7em"
          >Discover a haute, cool collection curated by</a-typography-text
        >
        <a-typography-text
          style="font-size: 1rem; font-weight: 200; line-height: 1.7em"
          >Nicole Richie exclusively for FASHIONPHILE.</a-typography-text
        >
      </a-flex>
      <a-flex style="padding: 24px 0" gap="20" class="group-button">
        <a-button
          type="primary"
          style="
            min-width: 13.4rem;
            min-height: 3.3rem;
            border-radius: 0;
            background-color: #fff;
            color: #000;
            font-weight: 400;
            font-size: 1rem;
            letter-spacing: 0.1rem;
          "
          >Shop Nicole's collection</a-button
        >
        <a-button
          type="primary"
          style="
            min-width: 13.4rem;
            min-height: 3.3rem;
            border-radius: 0;
            background-color: #fff;
            color: #000;
            font-weight: 400;
            font-size: 1rem;
            letter-spacing: 0.1rem;
          "
          >Shop All</a-button
        >
      </a-flex>
    </a-flex>
  </a-flex>
</template>

<style scoped>
.container {
  position: relative;
  width: 100%;
  min-height: 31.5rem;
  max-height: 37.25rem;
  height: 100px;
  align-items: center;
  justify-content: center;
}
.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.content-banner {
  width: 100%;
  max-width: 1280px;
  padding: 0 2rem;
  margin-left: auto !important;
  margin-right: auto !important;
  position: absolute;
  z-index: 1;
}
.text-block {
  max-width: 30rem;
}

@media (max-width: 575px) {
  .content-banner {
    padding: 0 1rem;
  }
  .container {
    gap: 20px;
  }
  .group-button {
    display: flex;
    flex-direction: column;
  }
}
</style>

<script setup lang="ts"></script>
